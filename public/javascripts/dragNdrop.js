var source1, dropBox, blockPicture, images, dr = 0, prevSibling, block = false;

addEventListener('load', initiate);

function initiate() {
    images = document.querySelectorAll('#picturebox>img');
    for (let i = 0; i < images.length; i++) {
        setEventsListenersImage(images[i]);
    }
    dropBox = document.getElementById('dropbox');
    blockPicture = document.getElementById('picturebox');
    dropBox.addEventListener('dragenter', dragenter);
    dropBox.addEventListener('dragover', dragover);
    dropBox.addEventListener('drop', dropFunction);
}

function dragenter(e) {
    e.preventDefault();
}

function dragover(e) {
    e.preventDefault();
}

function dragstart(e) {
    block = false;
    e.dataTransfer.setData('text/plain', e.target.getAttribute('id'));
}

function dropFunction(e) {
    if (block) return;
    if (dr == 0) { dropBox.innerHTML = ""; dr++; }

    let dragElement = document.getElementById(e.dataTransfer.getData('text/plain')),
        parentElem = dragElement.parentElement,
        cutElement = parentElem.removeChild(dragElement);
    dropBox.appendChild(cutElement);
    e.preventDefault();
}

function dropFunctionImage(e) {
    block = true;
    chgElement(e.dataTransfer.getData('text/plain'), e.target.id);
    e.preventDefault();
}

function chgElement(elemId_1, elemId_2) {
    if(elemId_1 == elemId_2) return;
    var element1 = document.getElementById(elemId_1),
        element2 = document.getElementById(elemId_2),
        cloneElement1 = element1.cloneNode(true),
        cloneElement2 = element2.cloneNode(true);
    setEventsListenersImage(cloneElement1);
    setEventsListenersImage(cloneElement2);
    element2.parentNode.insertBefore(cloneElement1, element2);
    element1.parentNode.insertBefore(cloneElement2, element1);
    element1.parentNode.removeChild(element1);
    element2.parentNode.removeChild(element2);
}

function setEventsListenersImage(elem) {
    elem.addEventListener('dragstart', dragstart);
    elem.addEventListener('drop', dropFunctionImage);
}
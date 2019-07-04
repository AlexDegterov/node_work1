var source1, drop, blockPicture, images, dr = 0;

addEventListener('load', initiate);

function initiate() {
    images = document.querySelectorAll('#picturebox>img');
    for(let i = 0; i < images.length; i++) {
        images[i].addEventListener('dragstart', dragstart)
    }
    drop = document.getElementById('dropbox');
    blockPicture = document.getElementById('picturebox');
    drop.addEventListener('dragenter', dragenter);
    drop.addEventListener('dragover', dragover);
    drop.addEventListener('drop', dropFunction);
}

function dragenter(e) {
    e.preventDefault();
    console.log('dragEnter');
}

function dragover(e) {
    e.preventDefault();
}

function dragstart(e) {
    let elem = e.target;
    console.log(elem.getAttribute('id'));
    e.dataTransfer.setData('text/plain', elem.getAttribute('id'));
}

function dropFunction(e) {
    if(dr == 0) { drop.innerHTML = ""; dr++;}
    
    let id = e.dataTransfer.getData('text/plain');
    let elem = document.getElementById(id);
    let parentElem = elem.parentElement;
    let tmpElem = parentElem.removeChild(elem);
    drop.appendChild(tmpElem);
    
    e.preventDefault();
    // //if(dr < 3 ) oldElem.remove();
    // if(dr >= 3) {
    //     let prevSibling = e.target.previousElementSibling;
    //     drop.replaceChild(prevSibling, e.target);
    // }    
   
    // drop.innerHTML += '<img src="' + src + '" id="new_' + id + '" />';
    // let new_elem = document.getElementById('dropbox');
    // new_elem.addEventListener('dragstart', dragstart);
    
}

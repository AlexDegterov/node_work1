/* $(function(){
$('#btn-chat').click(function(){
    var message = $('#message').val();
    console.log(message);
    $.ajax({
        type: "post",
        url: "http://localhost:8002/chat",
        data: "name=vasya&room=test&message="+message,
        success: function(data) {
            console.log("Данные отправлены удачно " + data);
        },
        error: function(err) {
            console.log(err);
        },
    })
})
})

window.onload = function() {
    var iframe = document.getElementsByTagName('iframe')[0];
    var iframeDoc = iframe.contentWindow.document;

    //if (iframeDoc.readyState == 'complete') {
        // iframeDoc.body.style.backgroundColor = 'green';
        console.log(iframeDoc);
    }//
    iframe.onload = function() {
        var iframeDoc2 = iframe.contentWindow.document;
        iframeDoc2.body.style.backgroundColor = 'orange';
        console.log("222222222222222");
    }
    // let btn = document.getElementById("btn-chat");
    // let btn2 = window.frames['chatFrame'];
    // // .document.getElementById('btn-chat');
    // console.log(btn);
    // console.log(btn2);
    // console.log(document.frames);
    // btn.addEventListener("click", () => {
    // var message = document.getElementById('message');
    // console.log(message);
    // })
};

 */
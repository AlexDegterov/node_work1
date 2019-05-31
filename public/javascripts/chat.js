$(function(){
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
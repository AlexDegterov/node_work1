$(function() {
    var fx = {
        'initModal': function() {
            if($('.modal-window').length == 0) {
                $('<div>').addClass('modal-window').appendTo('body');
            } else {
                return $('.modal-window');
            }
        }
    }

    $('.links a').click(function() {
        var data = $(this).attr('data-id');
        modal = fx.initModal();
        console.log("Данные data " + data);
    })
    

});
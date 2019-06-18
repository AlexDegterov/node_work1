$(function() {
    var fx = {
        'initModal': function() {
            if($('.modal-window').length == 0) {
                $('<div>').addClass('modal-window').appendTo('body');
            }
            $('<div>').attr('id', 'overlay').appendTo('body'); 
            return $('.modal-window');
        }
    }

    $('.links a').click(function() {
        var data = $(this).attr('data-id');
        modal = fx.initModal();
        $('<a>').attr('href', '#').addClass('modal-close-btn').html('&times;').click(function(e) {
            e.preventDefault;
            modal.remove();
            $('#overlay').remove();
        }).appendTo(modal);

        $.ajax({
            url: '/ajax/modal',
            type: 'POST',
            data: 'id=' + data,
            success: (data) => { modal.append(data); /* отключить loader */ },
            error: (err) => { console.log(err); },
            beforeSend: () => { /* запустить loader */ }
        })
        console.log("Данные data " + data);
    })
});
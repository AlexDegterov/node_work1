$(function () {
    $('.newsSiteUrl').click(function (e) {
        var site = $(this).attr('data-id');
        $('.newsSiteUrl').removeClass('selected');
        $(this).addClass('selected');
        e.preventDefault;
        $.ajax({
            url: '/news',
            type: 'GET',
            data: 'site=' + site,
            success: (data) => {
                let blockNews = document.getElementById("newsBlock");
                blockNews.innerHTML = "";
                let spisoc = document.createElement('ul');
                spisoc.setAttribute("class", "links");
                for (i = 0; i < data.length; i++) {
                    if(data[i].title) spisoc.innerHTML += '<li class="links"><a href="' + data[i].url + '">' + data[i].time + '. ' + data[i].title + '</a></li>';
                }
                blockNews.appendChild(spisoc);
            },
            error: (err) => { console.log(err); },
            beforeSend: () => { }
        })
        // console.log("Обновление новостей с сайта " + site);
    })
});
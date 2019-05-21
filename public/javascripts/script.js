  /*HEADER*/
 $(document).ready(function () {
     var $menu = $(".headerMenu");
     var $logo = $(".headerMenu__centerBlock");
     var $det = $(".taskDetail").length;    // страница детального описания
     var $main = $(".freeservice").length;    // главная
     var $add = $(".taskCreate__container").length;    // добавление задания
     var $ssylka;
     var $ssylkaDop;
     $ssylkaDop = $det ? "../../" : "";
     $ssylka = ($main||$add) ? "/cources/" : "../";
     
     $(window).scroll(function () {
         if ($(this).scrollTop() > 125 && $menu.hasClass("default")) {
             $menu.hide().addClass("fixed").removeClass("default");
             $menu.show();
             $logo.css({"backgroundImage": "url("+$ssylka+$ssylkaDop+"img/logo_sm.png)"});

         } else if ($(this).scrollTop() <= 125 && $menu.hasClass("fixed")) {
             $menu.hide().addClass("default").removeClass("fixed");
             $menu.show();
             $logo.css({"backgroundImage": "url("+$ssylka+$ssylkaDop+"img/logo.png)"});
         }
     });
     
     /* Вывод различных блоков работ на главной */
     var $proj = $(".typeTask_project");
     var $mont = $(".typeTask__montage");
     var $build = $(".typeTask__building");
     $('#taskProject').hover(
        function(){
            $mont.slideUp();
            $build.slideUp();
            $proj.slideDown();            
        });
     $('#taskMontage').hover(
        function(){
            $build.slideUp();
            $proj.slideUp();
            $mont.slideDown();
        });
     $('#taskBuild').hover(
        function(){
            $mont.slideUp();
            $proj.slideUp();
            $build.slideDown();
        });
      
 });

/* Обрезание текста */
$(".spisokTasksItems__caption, .spisokTasksItems__content").ready(function () {
     $(".spisokTasksItems__caption, .spisokTasksItems__content").dotdotdot({});
 });



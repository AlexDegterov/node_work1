  var dataObject = {
      "1": "Выберите подкатегорию,Автоматизация и связь,Архитектура,Водоснабжение \ Канализация,Воздухоснабжение,Генплан,Пожарная безопасность,Сметное дело,Строительство,Теплоснабжение и газоснабжение,Технологии производств,Холодоснабжение,Электроснабжение",
      "2": "Выберите подкатегорию,Автоматизация и связь,Водоснабжение \ Канализация,Воздухоснабжение,Пожарная безопасность,Строительство,Теплоснабжение и газоснабжение,Технологии производств,Холодоснабжение,Электроснабжение",
      "3": "Выберите подкатегорию,Крупное строительство,Строительство домов,Отделочные работы,Сварочные работы,Фундаментные работы,Кровельные и фасадные работы,Установка окон,Другое"
  };
  var makeRelation = (function () {
      function change(slave, data) {
          var x, dataArray, option;
          slave.innerHTML = "";
          if (!(this.value in data)) {
              return false;
          }
          dataArray = data[this.value].split(",");
          for (x = 0; x < dataArray.length; x++) {
              option = document.createElement("option");
              option.value = String(x);
              option.innerHTML = dataArray[x];
              slave.appendChild(option);
          }
      }
      return function (master, slave, data) {
          master.onchange = function () {
              change.call(this, slave, data);
          }
          master.onchange();
      }
  })();
  makeRelation(gid("typeTask"), gid("typePodTask"), dataObject);

  function gid(txt) {
      return document.getElementById(txt);
  }


  $(document).ready(function () {
      // следим за выбором типа объявления для активации подкатегорий
      var selPodType = document.getElementById('typePodTask');
      $('#typeTask').change(function () {
          if ($("#typeTask :selected").val() != "Выберите категорию") {
              selPodType.disabled = false;
              $("#typePodTask").css("opacity", "1");
          } else {
              selPodType.disabled = true;
              $("#typePodTask").css("opacity", "0.4");
          }
      });

      // следим за выбором региона для активации города
      var selReg = document.getElementById('as_City');
      $('#sel2').change(function () {
          if ($("#sel2 :selected").val() != "no_select") {
              selReg.disabled = false;
              $("#as_City").css("opacity", "1");
          } else {
              selReg.disabled = true;
              $("#as_City").css("opacity", "0.4");
          }
      });

      var reg = d.getElementById("sel2");
      $("#as_City").autocomplete("/cources/city/function_region.php", {
          delay: 10,
          minChars: 1,
          matchSubset: 1,
          autoFill: true,
          matchContains: 1,
          cacheLength: 1,
          selectFirst: true,
          maxItemsToShow: 10,
          selectFirst: false,
          extraParams: {
              region: "" + reg.value
          }
      });
      
      var $menu = $(".headerMenu");
     var $logo = $(".headerMenu__centerBlock");
     var $main = $(".freeservice").length;    // главная
     var $add = $(".taskCreate__container").length;    // добавление задания
     var $ssylka;
     $ssylka = ($main||$add) ? "/cources/" : "../";
     
     $(window).scroll(function () {
         if ($(this).scrollTop() > 125 && $menu.hasClass("default")) {
             $menu.hide().addClass("fixed").removeClass("default");
             $menu.show();
             $logo.css({"backgroundImage": "url("+$ssylka+"img/logo_sm.png)"});

         } else if ($(this).scrollTop() <= 125 && $menu.hasClass("fixed")) {
             $menu.hide().addClass("default").removeClass("fixed");
             $menu.show();
             $logo.css({"backgroundImage": "url("+$ssylka+"img/logo.png)"});
         }
     });
  });



  /* Автозаполнение */
  var val_region = "";
  var d = document;

  function RegionChange(ff) {
      var ac = $("#as_City").data("autocompleter");
      var el_city = document.getElementById("as_City");
      var el_Region = document.getElementById("sel2");
      el_city.value = "";
      if (el_Region.value == "no_select") el_city.value = "-- сначала выберите регион --";

      ac.flushCache();
      ac.setExtraParams({
          region: "" + ff.value
      });

      if (el_Region.value !== "no_select") {
          el_city.disabled = false;
      } else {
          el_city.disabled = true;
      };
  }

var dataObject={1:"Выберите подкатегорию,Автоматизация и связь,Архитектура,Водоснабжение  Канализация,Воздухоснабжение,Генплан,Пожарная безопасность,Сметное дело,Строительство,Теплоснабжение и газоснабжение,Технологии производств,Холодоснабжение,Электроснабжение",2:"Выберите подкатегорию,Автоматизация и связь,Водоснабжение  Канализация,Воздухоснабжение,Пожарная безопасность,Строительство,Теплоснабжение и газоснабжение,Технологии производств,Холодоснабжение,Электроснабжение",3:"Выберите подкатегорию,Крупное строительство,Строительство домов,Отделочные работы,Сварочные работы,Фундаментные работы,Кровельные и фасадные работы,Установка окон,Другое"},makeRelation=function(){return function(e,a,t){e.onchange=function(){(function(e,a){var t,n,o;if(e.innerHTML="",!(this.value in a))return!1;for(n=a[this.value].split(","),t=0;t<n.length;t++)(o=document.createElement("option")).value=String(t),o.innerHTML=n[t],e.appendChild(o)}).call(this,a,t)},e.onchange()}}();function gid(e){return document.getElementById(e)}makeRelation(gid("typeTask"),gid("typePodTask"),dataObject),$(document).ready(function(){var e=document.getElementById("typePodTask");$("#typeTask").change(function(){"Выберите категорию"!=$("#typeTask :selected").val()?(e.disabled=!1,$("#typePodTask").css("opacity","1")):(e.disabled=!0,$("#typePodTask").css("opacity","0.4"))});var a=document.getElementById("as_City");$("#sel2").change(function(){"no_select"!=$("#sel2 :selected").val()?(a.disabled=!1,$("#as_City").css("opacity","1")):(a.disabled=!0,$("#as_City").css("opacity","0.4"))});var t=d.getElementById("sel2");$("#as_City").autocomplete("/cources/city/function_region.php",{delay:10,minChars:1,matchSubset:1,autoFill:!0,matchContains:1,cacheLength:1,selectFirst:!0,maxItemsToShow:10,selectFirst:!1,extraParams:{region:""+t.value}});var n,o=$(".headerMenu"),l=$(".headerMenu__centerBlock"),s=$(".freeservice").length,i=$(".taskCreate__container").length;n=s||i?"/cources/":"../",$(window).scroll(function(){$(this).scrollTop()>125&&o.hasClass("default")?(o.hide().addClass("fixed").removeClass("default"),o.show(),l.css({backgroundImage:"url("+n+"img/logo_sm.png)"})):$(this).scrollTop()<=125&&o.hasClass("fixed")&&(o.hide().addClass("default").removeClass("fixed"),o.show(),l.css({backgroundImage:"url("+n+"images/logo.png)"}))})});var val_region="",d=document;function RegionChange(e){var a=$("#as_City").data("autocompleter"),t=document.getElementById("as_City"),n=document.getElementById("sel2");t.value="","no_select"==n.value&&(t.value="-- сначала выберите регион --"),a.flushCache(),a.setExtraParams({region:""+e.value}),"no_select"!==n.value?t.disabled=!1:t.disabled=!0}$(function(){var e=function(){return 0==$(".modal-window").length&&$("<div>").addClass("modal-window").appendTo("body"),$("<div>").attr("id","overlay").appendTo("body"),$(".modal-window")};$(".links a").click(function(){var a=$(this).attr("data-id");modal=e(),$("<a>").attr("href","#").addClass("modal-close-btn").html("&times;").click(function(e){e.preventDefault,modal.remove(),$("#overlay").remove()}).appendTo(modal),$.ajax({url:"/ajax/modal",type:"POST",data:"id="+a,success:e=>{modal.append(e)},error:e=>{console.log(e)},beforeSend:()=>{}}),console.log("Данные data "+a)})});

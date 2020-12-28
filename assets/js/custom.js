//Helpers
document.addEventListener("touchstart", function () {
}, true);
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
  console.log('you use mobile');
}
//Progress
if(document.querySelectorAll('.progress__bar').length > 0){
  window.onscroll = function() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.querySelector('.progress__bar').style.width = scrolled + "%";
  }
}

//Select
var x, i, j, selElmnt, a, b, c, img;
x = document.getElementsByClassName("select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  if (selElmnt.options[selElmnt.selectedIndex].getAttribute('data-icon') !== null) {
    a.innerHTML = '<img src="' + selElmnt.options[selElmnt.selectedIndex].getAttribute('data-icon') + '" alt=""><span>' + selElmnt.options[selElmnt.selectedIndex].innerHTML + '</span>';
  } else {
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  }
  if (selElmnt.disabled) {
    x[i].classList.add('select--disabled');
  }
  x[i].appendChild(a);
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    c = document.createElement("DIV");
    if (selElmnt.options[j].getAttribute('data-icon') !== null) {
      c.innerHTML = '<img src="' + selElmnt.options[j].getAttribute('data-icon') + '" alt=""><span>' + selElmnt.options[j].innerHTML + '</span>';
      c.setAttribute('data-val',selElmnt.options[j].getAttribute('value'));
    } else {
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.setAttribute('data-val',selElmnt.options[j].getAttribute('value'));
    }
    c.addEventListener("click", function (e) {
      var y, i, k, s, h;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      h = this.parentNode.previousSibling;
      for (i = 0; i < s.length; i++) {
        if (s.options[i].innerHTML == this.textContent) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          h.setAttribute('data-val',s.options[i].getAttribute('value'));
          y = this.parentNode.getElementsByClassName("same-as-selected");
          for (k = 0; k < y.length; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  if (selElmnt.disabled) {
    console.log('disabled');
  } else {
    a.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
}
function closeAllSelect(elmnt) {
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
document.addEventListener("click", closeAllSelect);


(function($) {
// Only nambers
  $.fn.inputFilter = function(inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  };

  var language = $('html').attr('lang');
// Only numbers
  $(".js-number").inputFilter(function(value) {
    return /^\d*$/.test(value);
  });
// Timer
  if($('.js-timer').length>0){
    var countDownDate = new Date('December 31, 2020 03:24:00').getTime();
    localStorage.setItem('time', new Date('October 7, 2020 03:24:00').getTime());
    function timer() {
      var str ='';
      var now = new Date().getTime();
      var distance = (countDownDate || localStorage.getItem('time')) - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      if(language === 'en'){
        str = days + "d : " + hours + "h : " + minutes + "m";
      }else{
        str = days + "д : " + hours + "ч : " + minutes + "м";
      }
      $('.js-timer').text(str);
      if (distance < 0) {
        clearInterval(x);
        $('.js-timer').text("EXPIRED");
      }
    }
    timer();
    setInterval(timer, 1000);
  }
  //Header
  $('.header-lang__switch').click(function () {
    $(this).toggleClass('header-lang__switch_active');
    $('.header-lang__select').fadeToggle(250);
  });

  if($('.js-disabled').length>0){
    $('.js-disabled').on('keyup',function () {
      if($(this).val() !== ''){
        $(this).closest('form').find('button[type=submit]').prop('disabled',false);
      }else{
        $(this).closest('form').find('button[type=submit]').prop('disabled',true);
      }
    })
  }

  //header mobile
  if ($(window).width() < 768) {
    $('.header-mobile-menu-toggle').click(function () {
      $('body').toggleClass('ovh');
      $('.header').toggleClass('header-navigation_opened');
    });
    $('.header__link').click(function (e) {
      if (typeof $(this).attr('href') !== typeof undefined && $(this).attr('href') !== false) {
        return true;
      } else {
        e.preventDefault();
        $(this).siblings('.navigation-submenu').addClass('navigation-submenu_opened');
      }
    })
    $('.navigation-submenu-mobile-back').click(function () {
      $(this).closest('.navigation-submenu').removeClass('navigation-submenu_opened');
    });
    $('.header-submenu__top').click(function () {
      $(this).toggleClass('header-submenu__top_active');
      $(this).siblings('.header-submenu__list').slideToggle(250);
    })
  } else {
    $(window).off("scroll");
  }
  //Footer
  $('.footer-menu__arrow').click(function () {
    $(this).toggleClass('footer-menu__arrow_opened');
    $(this).parent().parent().find('.footer-menu__list').slideToggle(250);
  });
  if($('.js-agreement').length > 0){
    $('.js-agreement').on('change', function () {
      if($(this).is(":checked") || $(this).prop("checked")){
        $(this).closest('form').find('button[type=submit]').prop('disabled',false);
      }else{
        $(this).closest('form').find('button[type=submit]').prop('disabled',true);
      }
    });
  }

}(jQuery));
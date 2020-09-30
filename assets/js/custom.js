$(document).ready(function () {
  var language = $('html').attr('lang');

// Timer
  if($('.js-timer').length>0){
    var countDownDate = new Date('October 7, 2020 03:24:00').getTime();
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

});
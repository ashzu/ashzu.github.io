/*
 * Copyright Takunda Ashleigh Zuweni and Epic Zimbabwe 2015-PRESENT
 */

$(function () {
new WOW().init();

$(".dropdown-button").dropdown({ hover: true,
  belowOrigin: true,
  constrain_width: false
    });
    
    
    $('.slider').slider({full_width: true, indicators: false, height: 500});
    $('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .4, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200 // Transition out duration
    }
  );
  $('.materialboxed').materialbox(); 
   $('.parallax').parallax();
  $('.fancybox').fancybox();
  
  
});

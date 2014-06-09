/*
* Base JS file
*/

var stickyFooterHeight = function(){
  var footerHeight = $('#footer-content').height(),
    margin = parseInt($('#navbar-top').css('margin-bottom').replace('px', ''));
  
  $('#footer-content').css({
    marginTop: (footerHeight * -1)
  });
  $('#content').css({
    paddingBottom: (footerHeight + margin)
  });
};

$(function() {
  /* Multiple currencies */
  if ($('body').hasClass('currencies')) {
    $('#currency-picker-toggle a').click(function() {
      $('#currency-picker-toggle').hide();
      $('#currencies-picker').fadeIn();
      return false;
    });

    $('#currencies-picker select').change(function() {
      $('#currencies-picker').hide();
      $('#currency-picker-toggle').fadeIn();
      return true;
    }).blur(function() {
      $('#currencies-picker').hide();
      $('#currency-picker-toggle').fadeIn();
      return true;
    });
  }
  
  // resize sticky footer
  stickyFooterHeight();
});

/* Show/Hide Cart Note */
$('#cart-note').on('show.bs.collapse', function(){
  $('.cart-note-action').hide();
});
$('#cart-note').on('shown.bs.collapse', function(){
  $(this).find('#note').focus();
});

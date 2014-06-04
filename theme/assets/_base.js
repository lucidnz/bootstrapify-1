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
<<<<<<< HEAD
  
  $('.navbar .dropdown').bootstrapifyDropdown();
  
  $('.localize').tooltip();
  $('.tip').popover({
    trigger: 'click',
    placement: 'left',
    html: true
  });
  
  // resize sticky footer
  stickyFooterHeight();
=======
>>>>>>> submenus
});

/* Show/Hide Cart Note */
$('#cart-note').on('show.bs.collapse', function(){
  $('.cart-note-action').hide();
});
$('#cart-note').on('shown.bs.collapse', function(){
  $(this).find('#note').focus();
});

var preloadProductImages = function(){
  var $thumbs = $('[data-main-image]');
  if($thumbs.length > 0){
    $thumbs.each(function(){
      var image = new Image();
      image.src = $(this).attr('data-main-image');
    });
  }
};

$(window).load(function(){
  preloadProductImages();
  
  /* Isotope */
  var $container = $('.masonry-collection');
  // init
  $container.isotope({
    // options
    itemSelector: '.masonry',
    layoutMode: 'masonry'
  });
  /* End Isotope */
  
  $('.carousel').on('slid.bs.carousel', function () {
    var imgHeight = $(this).find('.item.active img').height();
    $('.carousel-control').css({maxHeight: imgHeight});
  });
});

/* Product Image Switcher */
$('[data-main-image]').click(function(event) {
  var targetImage = $(this).attr('data-main-image');
  var $mainImage = $('#main');
  if($mainImage.attr('src') !== targetImage){
    $mainImage.hide().attr('src', targetImage).fadeIn();
  }
  event.preventDefault();
});
/* Facebook gallery via https://gist.github.com/alexdunae/1239554 */

(function(){
  var title = $('#facebook-title'),
  link = $('#facebook-link'),
  viewer = $('#facebook-viewer'),
  thumbs = $('#facebook-thumbs'),
  gallery_id = thumbs.attr('data-album');
  
  if(thumbs.length > 0){
    // album info
    $.getJSON('//graph.facebook.com/' + gallery_id + '?callback=?', function(json) {
      title.html('<a href="' + json.link + '" title="View album on Facebook" target="_blank">' + json.name + '</a>');
      link.html('<i class="fa fa-fw fa-facebook-square text-muted"></i> <a href="' + json.link + '" title="View album on Facebook" target="_blank">View album on Facebook</a>');
    });

    // images
    $.getJSON('//graph.facebook.com/' + gallery_id + '/photos?callback=?', function(json) {
      var imgs = json.data;

      viewer.attr('src', imgs[0].images[0].source);

      for (var i = 0, l = imgs.length - 1; i < l; i++) {
        $('<div class="col-sm-3"><img class="thumbnail" src="' + imgs[i].images[2].source + '" data-fullsize="' + imgs[i].images[0].source + '"></div>').appendTo(thumbs);
      }

      $('img', thumbs).bind('click', function(e) {
        e.preventDefault();
        viewer.attr('src', $(this).attr('data-fullsize'));
      });
    });
  }
}());
/* Recover password form */

function getID(id){ // http://jsperf.com/getelementbyid-vs-jquery-id/44
  return jQuery(document.getElementById(id));
}

var recoverForm = getID('customer-recover-password-form'),
loginForm = getID('customer-login-form');

function showRecoverPasswordForm() {
  recoverForm.parent().show();
  loginForm.parent().hide();
}

function hideRecoverPasswordForm() {
  recoverForm.parent().hide();
  loginForm.parent().show();
}

$('.hide-recover-password-form').on('click', function(e){
  hideRecoverPasswordForm();
  e.preventDefault();
});

$('.show-recover-password-form').on('click', function(e){
  showRecoverPasswordForm();
  e.preventDefault();
});

// dont show links if we dont have both includes present
if(recoverForm === null){ getID('forgotten-password-link').style.display='none'; }
if(loginForm === null){ getID('recover-password-link').style.display='none'; }

hideRecoverPasswordForm();
if (window.location.hash === '#recover') { showRecoverPasswordForm(); }

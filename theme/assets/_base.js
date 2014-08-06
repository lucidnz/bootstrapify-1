/*
* Base JS file
*/

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
});

/* Show/Hide Cart Note */
$('#cart-note').on('show.bs.collapse', function(){
  $('.cart-note-action').hide();
});
$('#cart-note').on('shown.bs.collapse', function(){
  $(this).find('#note').focus();
});

/* Notify me form */
$(document).on('submit', '.notify-me-wrapper form', function(e){
  var $self = $(this);
  $self.find('.alert').removeClass('alert-danger alert-success').text('').hide();
  
  if($self.find('[type="email"]').val() !== ''){
    $.ajax({
      url: '/contact',
      type: 'POST',
      data: $self.serialize()
    })
    .done(function(){
      $self.find('.alert').addClass('alert-success').text('Thanks! We will notify you when this product becomes available.').show();
      $self.find('.form-group').removeClass('has-error').hide();
    })
    .fail(function(a,b,c){
      console.log(a,b,c);
      $self.find('.alert').addClass('alert-danger').text('There was an error submitting your email. Please try again later.').show();
    });
  } else {
    $self.find('.alert').addClass('alert-danger').text('Please enter an email adddress.').show();
    $self.find('.form-group').addClass('has-error');
  }
  e.preventDefault();
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

/* Carousel control heights */
var carouselControlHeight = function(){
  var imgHeight = $('.carousel').find('.item.active img').height();
  $('.carousel-control').css({maxHeight: imgHeight});
};

/* Product Image Zoom */
var productImageZoom = function($imageWrapper){
  var $productImage = $imageWrapper || $('.product-main-image');
  $productImage.each(function(){
    var $this = $(this);
    var imgSrc = $this.find('img')[0].src;
    var imgSize = Shopify.Image.imageSize(imgSrc);
    var SizedImgSrc = Shopify.Image.getSizedImageUrl(imgSrc.replace('_'+imgSize, ''), '2048x2048');
    $this.trigger('zoom.destroy');
    $this.zoom({url: SizedImgSrc});
  });
};

/* Product Image Switcher */
var switchImage = function($imageWrapper, newImageSrc){
  var $mainImage = $imageWrapper.find('img');
  if($mainImage.attr('src') !== newImageSrc){
    $mainImage.hide().attr('src', newImageSrc).fadeIn();
    productImageZoom($imageWrapper);
  }
};

$(document).on('click', '[data-main-image]', function(event) {
  var $mainImageWrapper = $(this).closest('.product-images').find('.product-main-image');
  var targetImageSrc = $(this).attr('data-main-image');
  switchImage($mainImageWrapper, targetImageSrc);
  event.preventDefault();
});

/* window events */
$(window).load(function(){
  preloadProductImages();
  
  carouselControlHeight();
  $('.carousel').on('slid.bs.carousel', function(){
    carouselControlHeight();
  });
  $('.carousel').on('slide.bs.carousel', function(e){
    var currentSlideID = e.relatedTarget.id;
    $(this).attr('data-current-slide', currentSlideID);
  });
  
  productImageZoom();
});

$(window).on('resize', function(){
  carouselControlHeight();
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
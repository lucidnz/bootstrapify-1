var preloadProductImages = function(){
  var $thumbs = $('[data-main-image]');
  if($thumbs.length > 0){
    $thumbs.each(function(){
      var image = new Image();
      image.src = $(this).attr('data-main-image');
    });
  }
};

var switchImage = function(ele, newImageSrc){
  var $mainImage = $(ele);
  if($mainImage.attr('src') !== newImageSrc){
    $mainImage.hide().attr('src', newImageSrc).fadeIn();
  }
};

/* Carousel control heights */
var carouselControlHeight = function(){
  var imgHeight = $('.carousel').find('.item.active img').height();
  $('.carousel-control').css({maxHeight: imgHeight});
};

/* Product Image Switcher */
$('[data-main-image]').click(function(event) {
  switchImage('#main', $(this).attr('data-main-image'));
  event.preventDefault();
});

/* window events */
$(window).load(function(){
  preloadProductImages();
  
  carouselControlHeight();
  $('.carousel').on('slid.bs.carousel', function(){
    carouselControlHeight();
  });
});

$(window).on('resize', function(){
  carouselControlHeight();
});
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
var productImageZoom = function(){
  var $productImage = $('.product-main-image');
  if($productImage.length > 0){
    var imgSrc = $productImage.find('img')[0].src;
    var SizedImgSrc = Shopify.Image.getSizedImageUrl(imgSrc, 'master');
    $productImage.zoom({url: SizedImgSrc});
  }
};

/* Product Image Switcher */
$('[data-main-image]').click(function(event) {
  var $mainImage = $(this).closest('.product-images').find('.product-main-image img');
  var targetImage = $(this).attr('data-main-image');
  if($mainImage.attr('src') !== targetImage){
    $mainImage.hide().attr('src', targetImage).fadeIn();
    productImageZoom();
  }
  event.preventDefault();
});

/* window events */
$(window).load(function(){
  preloadProductImages();
  
  carouselControlHeight();
  $('.carousel').on('slid.bs.carousel', function(){
    carouselControlHeight();
  });
  
  productImageZoom();
});

$(window).on('resize', function(){
  carouselControlHeight();
});
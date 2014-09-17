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
var carouselControlHeight = function () {
  var imgHeight = $('.carousel').find('.item.active img').height();
  $('.carousel-control').css({maxHeight: imgHeight});
};

/* Product image zoom and lightbox */
var productImageZoomOrLightbox = function ($imageWrapper) {
  var $productImage = $imageWrapper || $('.product-main-image');
  $productImage.each(function(){
    var $this = $(this);
    var imgSrc = $this.find('img')[0].src;
    var imgSize = Shopify.Image.imageSize(imgSrc);
    var SizedImgSrcLrg = Shopify.Image.getSizedImageUrl(imgSrc.replace('_'+imgSize, ''), '2048x2048');
    
    if(Shopify.settings.enable_image_zoom){
      $this.trigger('zoom.destroy');
      $this.zoom({
        url: SizedImgSrcLrg,
        callback: function () {
          if(Shopify.settings.enable_image_lightbox){
            $this.colorbox({ href: SizedImgSrcLrg, maxHeight: "80%" });
          }
        }
      });
    } else if (Shopify.settings.enable_image_lightbox) {
      $this.colorbox({ href: SizedImgSrcLrg, maxHeight: "80%" });
    }
    
  });
};

/* Product Image Switcher */
var switchImage = function ($imageWrapper, newImageSrc) {
  var $mainImage = $imageWrapper.find('img');
  if($mainImage.attr('src') !== newImageSrc){
    $mainImage.hide().attr('src', newImageSrc).fadeIn();
    productImageZoomOrLightbox($imageWrapper);
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
  
  productImageZoomOrLightbox();
});

$(window).on('resize', function(){
  carouselControlHeight();
});
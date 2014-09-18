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

var getSizedImage = function (imgSrc) {
  var imgSize = Shopify.Image.imageSize(imgSrc);
  return Shopify.Image.getSizedImageUrl(imgSrc.replace('_'+imgSize, ''), '2048x2048');
};

/* Product image zoom and lightbox */
var initColorbox = function () {
  // create a hidden dom object that contains the images we want in the gallery
  // initiate color box on it so as to not disturb the actual thumbs
  if(Shopify.settings.enable_image_lightbox){
    $('.product-wrap').each(function(i){ // because we might have more than 1 product
      var $productWrap = $(this);
      var $thumbs = $productWrap.find('[data-main-image]');
      if($thumbs.length === 0){
        $thumbs = $productWrap.find('.product-main-image img');
      }
      
      var $eleGroup = $('<div class="cb-group"></div>');
      
      $thumbs.each(function(){
        var $thumb = $(this);
        var imgSrc = $thumb.attr('data-main-image') || $thumb.prop('src');
        var SizedImgSrcLrg = getSizedImage(imgSrc);
        $eleGroup.append('<a class="cb-group-item" href="'+SizedImgSrcLrg+'"></a>');
      });
      
      $productWrap.append($eleGroup);
      $eleGroup.hide();
      
      var $gallery = $eleGroup.find('.cb-group-item').colorbox({
        maxHeight: "80%",
        rel: 'gallery_'+(i+1),
        previous: '<i class="fa fa-chevron-left fa-3x"></i>',
        next: '<i class="fa fa-chevron-right fa-3x"></i>',
        close: '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-times fa-stack-1x fa-inverse"></i></span>',
      });
      $productWrap.on('click', '.product-main-image', function(e){
        e.preventDefault();
        $gallery.eq(0).click();
      });
    });
  }
};

var productImageZoom = function ($imageWrapper) {
  if(Shopify.settings.enable_image_zoom){
    var $productImage = $imageWrapper || $('.product-main-image');
    $productImage.each(function(){
      var $this = $(this);
      var imgSrc = $this.find('img')[0].src;
      var SizedImgSrcLrg = getSizedImage(imgSrc);
      $this.trigger('zoom.destroy');
      $this.zoom({url: SizedImgSrcLrg});
    });
  }
};

/* Product Image Switcher */
var switchImage = function ($imageWrapper, newImageSrc) {
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
  
  initColorbox();
  productImageZoom();
});

$(window).on('resize', function(){
  carouselControlHeight();
});
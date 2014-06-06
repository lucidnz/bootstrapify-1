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
  
/*
  $('.carousel').on('slid.bs.carousel', function () {
    var imgHeight = $(this).find('.item.active img').height();
    $('.carousel-control').css({maxHeight: imgHeight});
  });
*/
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
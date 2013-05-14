$(function() {
  
  /*==========================*/
  /* Global Variables */
  /*==========================*/

  var   THE_BODY              = $('body'),
  HEADER                = $('#header'),
  FOOTER                = $('#footer'),
  IS_INDEX              = (THE_BODY.hasClass('template-index')) ? true : false,
  IS_COLLECTION         = (THE_BODY.hasClass('template-collection')) ? true : false,
  IS_COLLECTION_LISTING = ($('#collection-list').length > 0) ? true : false,
  IS_PRODUCT            = (THE_BODY.hasClass('template-product')) ? true : false,
  IS_BLOG               = (THE_BODY.hasClass('template-blog')) ? true : false,
  IS_ARTICLE            = (THE_BODY.hasClass('template-article')) ? true : false,
  IS_SEARCH             = (THE_BODY.hasClass('template-search')) ? true : false,
  IS_CART               = (THE_BODY.hasClass('template-cart')) ? true : false,
  HAS_LOGO              = (HEADER.hasClass('use-logo')) ? true : false,
  BE_WIDE               = (HEADER.hasClass('wide')) ? true : false,
  HAS_CURRENCIES        = (THE_BODY.hasClass('currencies')) ? true : false,
  HAS_TWITTER           = (FOOTER.hasClass('has-twitter')) ? true : false,
  IS_IE                 = /msie/i.test(navigator.userAgent),
  /* PRODUCT_IMAGE_W_TO_H_RATIO = product_image_w_to_h_ratio || 1,
  THREE_PER_ROW_W       = 268,
  FOUR_PER_ROW_W        = 191,
  THREE_PER_ROW_H       = parseInt(THREE_PER_ROW_W/PRODUCT_IMAGE_W_TO_H_RATIO,  10),
  FOUR_PER_ROW_H        = parseInt(FOUR_PER_ROW_W/PRODUCT_IMAGE_W_TO_H_RATIO,   10), */
  IS_MOBILE             = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
        
  /* Multiple currencies */
  /*==========================*/

  if (HAS_CURRENCIES) {
        
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
        
  $('.localize').tooltip();
  $('.tip').popover({
    trigger: 'click',
    placement: 'left',
    html: true
  });
});
/*
 * Shopify - jQuery Ajax add to cart.
 */
 
(function($) {
  
  var AjaxCart = function($ele){
    this.$form = $ele;
    console.log('AjaxCart');
  };
  
  $.fn.ajaxCart = function(){
    return this.each(function(){
      var $ele = $(this);
      $ele.data('_ajaxCart', new AjaxCart($ele));
    });
  };

}(jQuery));


$(function(){
  $('form[action="/cart/add"]').ajaxCart();
});
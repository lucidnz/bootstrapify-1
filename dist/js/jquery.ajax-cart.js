/*
 * Shopify - jQuery Ajax Cart.
 *
 * TODO: remove duplication around :
 * - AjaxCart.prototype._buildForms
 * - CartForm & ProductForm.prototype._removeMessage
 */
 
(function($) {
  
  /* Main */
  var AjaxCart = function($ele, settings){
    this.$ele = $ele;
    this.settings = settings;
    
    this.connection = new CartConnection();
    this.cartDisplay = new CartDisplay(this.settings.cartCountElement);
    this.cartPrice = new CartPrice(this.settings.cartPriceElement);
    
    this.cartFormQueue = [];
    this.cartForms = [];
    this._buildForms();
    
    this._addEventHandlers();
  };
  
  AjaxCart.prototype._buildForms = function(){
    var self = this;
    this.$ele.find('form[action="/cart/add"]').each(function(i){
      var cartForm = new ProductForm(this, self.settings.form, i);
      self.cartForms.push(cartForm);
    });
    this.$ele.find('form[action="/cart"]').each(function(i){
      var cartForm = new CartForm(this, self.settings.form, i);
      self.cartForms.push(cartForm);
    });
  };
  
  AjaxCart.prototype._addEventHandlers = function(){
    var self = this;
    this.$ele.on('cartCollected', function(e, cartData){
      self.cart = cartData;
      self.cartCount = cartData.item_count;
      self.cartDisplay.updateCartCountElement(self.cartCount);
    });
    this.$ele.on('sendToCart', function(e, formData, formID){
      var form = self.cartForms[formID];
      self.cartFormQueue.push(form);
      self.connection.postToCart(formData, form);
    });
    this.$ele.on('postToCartSuccess', function(e, result){
      if(result.item_count){
        self.cartCount = result.item_count;
        self.cartPrice.updatePriceElement(result);
      } else {
        self.cartCount++;
      }
      self.cartDisplay.updateCartCountElement(self.cartCount);
      var cartForm = self.cartFormQueue.shift();
      cartForm.sendToCartSuccess(result);
    });
    this.$ele.on('postToCartError', function(e, err, status){
      var cartForm = self.cartFormQueue.shift();
      cartForm.sendToCartError(err, status);
    });
  };
  
  /* Cart Connection */
  var CartConnection = function(){
    this.getCart();
  };

  CartConnection.prototype.getCart = function(){
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: '/cart.js'
    })
    .done(function(data){
      $.event.trigger('cartCollected', data);
    });
  };

  CartConnection.prototype.postToCart = function(formData, form){
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: form.postURL,
      data: formData
    })
    .done(function(result){
      $.event.trigger('postToCartSuccess', result);
    })
    .fail(function(err, status){
      $.event.trigger('postToCartError', [err, status]);
    });
  };
  
  /* Cart Form */
  var CartForm = function(form, settings, id){
    this.$form = $(form);
    this.settings = settings;
    this.id = id;
    this.postURL = '/cart/update.js';
    this._addEventHandlers();
  };
  
  CartForm.prototype.sendToCartSuccess = function(){
    var message = 'Cart successfully updated.';
    this._displayMessage(message, 'success');
  };
  
  CartForm.prototype.sendToCartError = function(err, status){
    console.log(err, status);
    try {
      var response = jQuery.parseJSON(err.responseText);
      this._displayMessage(response.message+': '+response.description, 'danger');
    } catch(e) {
      this._displayMessage('ERROR: There was an error adding your item to the cart.', 'danger');
    }
  };
  
  CartForm.prototype._addEventHandlers = function(){
    var self = this;
    this.$form.on('keyup', '[name^="updates"]', function(e){
      if(this === document.activeElement && self._isNumberKeyCode(e.keyCode)){
        e.preventDefault();
        $.event.trigger('sendToCart', [self.$form.serialize(), self.id]);
      }
    });
  };
  
  CartForm.prototype._displayMessage = function(message, messageType){
    var messageMarkup = this.settings.cartMessageMarkup(message, messageType);
    this.$form.prepend(messageMarkup);
    var self = this;
    window.setTimeout(function(){
      self._removeMessage();
    }, 6000);
  };
  
  CartForm.prototype._removeMessage = function(){
    this.$form.find('.ajax-cart-message').hide(186, function(){
      this.remove();
    });
  };
  
  CartForm.prototype._isNumberKeyCode = function(keyCode){
    var keyMatch = false, keyCodes = [8,9,48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105];
    for (var i in keyCodes) {
      if(keyCode === keyCodes[i]){ keyMatch = true; break; }
    }
    return keyMatch;
  };
  
  /* Product Form */
  var ProductForm = function(form, settings, id){
    this.$form = $(form);
    this.settings = settings;
    this.id = id;
    this.postURL = '/cart/add.js';
    this.formButton = this._getFormButton();
    this._addEventHandlers();
  };
  
  ProductForm.prototype.sendToCartSuccess = function(result){
    var message = result.title+' successfully added. <a href="/cart">View cart</a>';
    this._displayMessage(message, 'success');
  };
  
  ProductForm.prototype.sendToCartError = function(err, status){
    console.log(err, status);
    try {
      var response = jQuery.parseJSON(err.responseText);
      this._displayMessage(response.message+': '+response.description, 'danger');
    } catch(e) {
      this._displayMessage('ERROR: There was an error adding your item to the cart.', 'danger');
    }
  };
  
  ProductForm.prototype._getFormButton = function(){
    var $button = this.$form.find('input[name="add"]');
    if($button.length > 0){
      return new CartFormButton($button, this.settings);
    } else {
      return false;
    }
  };
  
  ProductForm.prototype._addEventHandlers = function(){
    var self = this;
    this.$form.on('submit', function(e){
      e.preventDefault();
      if(self.formButton){ self.formButton.updateButton('Adding...', true); }
      $.event.trigger('sendToCart', [$(this).serialize(), self.id]);
    });
  };
  
  ProductForm.prototype._displayMessage = function(message, messageType){
    this.formButton.updateButton(false, false);
    var messageMarkup = this.settings.productMessageMarkup(message, messageType);
    this.$form.append(messageMarkup);
    var self = this;
    window.setTimeout(function(){
      self._removeMessage();
    }, 6000);
  };
  
  ProductForm.prototype._removeMessage = function(){
    this.$form.find('.ajax-cart-message').hide(186, function(){
      this.remove();
    });
  };
  
  /* Cart Form Button */
  var CartFormButton = function($ele, settings){
    this.$ele = $ele;
    this.settings = settings;
    this.defaultSubmitValue = this.$ele.val() || this.settings.defaultSubmitValue;
  };
  
  CartFormButton.prototype.updateButton = function(message, disable){
    if(!message){ message = this.defaultSubmitValue; }
    this.$ele.val(message).prop("disabled", disable);
  };
  
  /* Cart Display */
  var CartDisplay = function(cartCountElement){
    this.$cartCountElement = $(cartCountElement);
  };
  
  CartDisplay.prototype.updateCartCountElement = function(count){
    if(this.$cartCountElement.text() !== count){
      this.$cartCountElement.text(count);
    }
  };
  
  /* Cart Price */
  var CartPrice = function(ele){
    this.$ele = $(ele);
  };
  
  CartPrice.prototype.updatePriceElement = function(result){
    if(this.$ele.length > 0){
      var formattedMoney = Shopify.formatMoney(result.total_price);
      this.$ele.find('.money').replaceWith('<span class="money">'+formattedMoney+'</span>');
      if (typeof Currency !== 'undefined') {
        if(Currency.shopCurrency !== Currency.currentCurrency){
          Currency.convertAll(Currency.shopCurrency, Currency.currentCurrency);
        }
      }
      this._recalcShipping();
    }
  };
  
  CartPrice.prototype._recalcShipping = function(){
    var $shippingCalc = $('.shipping-calculator-wrapper');
    var $responseWrapper = $shippingCalc.find('#wrapper-response');
    if($shippingCalc.length > 0 && $responseWrapper.html() !== ''){
      $shippingCalc.find('.get-rates').trigger('click');
    }
  };
  
  /* jQueryify */
  $.fn.ajaxCart = function(opts){
    var settings = $.extend({}, $.fn.ajaxCart.defaults, opts);
    return this.each(function(){
      var $ele = $(this);
      $ele.data('_ajaxCart', new AjaxCart($ele, settings));
    });
  };
  
  $.fn.ajaxCart.defaults = {
    cartCountElement: '.cartCount',
    cartPriceElement: 'form[action="/cart"] .product-price',
    form: {
      defaultSubmitValue: 'Add to cart',
      productMessageMarkup: function(message, messageType){
        return '<span class="ajax-cart-message help-block text-'+messageType+'">'+message+'</span>';
      },
      cartMessageMarkup: function(message, messageType){
        return '<div class="ajax-cart-message alert alert-'+messageType+'">'+message+'</div>';
      }
    }
  };

}(jQuery));
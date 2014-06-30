/*
 * Shopify - jQuery Ajax Cart.
 */
 
(function($) {
  
  /* Main */
  var AjaxCart = function($ele, settings){
    this.$ele = $ele;
    this.settings = settings;
    
    this.connection = new CartConnection(this.settings.connection);
    this.cartDisplay = new CartDisplay(this.settings.cartCountElement);
    
    this.cartFormQueue = [];
    this.cartForms = [];
    var self = this;
    this.$ele.find('form[action="/cart/add"]').each(function(i){
      var cartForm = new CartForm(this, self.settings.form, i);
      self.cartForms.push(cartForm);
    });
    
    this.addEventHandlers();
  };
  
  AjaxCart.prototype.addEventHandlers = function(){
    var self = this;
    this.$ele.on('cartCollected', function(e, cartData){
      self.cart = cartData;
      self.cartCount = cartData.item_count;
      self.cartDisplay.updateCartCountElement(self.cartCount);
    });
    this.$ele.on('sendToCart', function(e, formData, formID){
      self.cartFormQueue.push(self.cartForms[formID]);
      self.connection.postToCart(formData);
    });
    this.$ele.on('postToCartSuccess', function(e, product){
      self.cartCount++;
      self.cartDisplay.updateCartCountElement(self.cartCount);
      var cartForm = self.cartFormQueue.shift();
      cartForm.sendToCartSuccess(product);
    });
    this.$ele.on('postToCartError', function(e, err, status){
      var cartForm = self.cartFormQueue.shift();
      cartForm.sendToCartError(err, status);
    });
  };
  
  /* Cart Connection */
  var CartConnection = function(settings){
    this.settings = settings;
    this.getCart();
  };

  CartConnection.prototype.getCart = function(){
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: this.settings.cartGetURL
    })
    .done(function(data){
      $.event.trigger('cartCollected', data);
    });
  };

  CartConnection.prototype.postToCart = function(formData){
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: this.settings.cartPostURL,
      data: formData
    })
    .done(function(product){
      $.event.trigger('postToCartSuccess', product);
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
    this.formSubmit = this.$form.find('input[name="add"]');
    this.defaultSubmitValue = this.formSubmit.val() || this.settings.defaultSubmitValue;
    this.addEventHandlers();
  };
  
  CartForm.prototype.addEventHandlers = function(){
    var self = this;
    this.$form.on('submit', function(e){
      e.preventDefault();
      self._updateSubmit('Adding...', true);
      $.event.trigger('sendToCart', $(this).serialize(), self.id);
    });
  };
  
  CartForm.prototype.sendToCartSuccess = function(product){
    var message = product.title+' successfully added. <a href="/cart">View cart</a>';
    this._displayMessage(message, 'success');
    this._updateSubmit(this.defaultSubmitValue, false);
  };
  
  CartForm.prototype.sendToCartError = function(err, status){
    console.log(err, status);
    try {
      var response = jQuery.parseJSON(err.responseText);
      this._displayMessage('ERROR: '+response, 'danger');
    } catch(e) {
      this._displayMessage('ERROR: There was an error adding your item to the cart.', 'danger');
    }
    this._updateSubmit(this.defaultSubmitValue, false);
  };
  
  CartForm.prototype._updateSubmit = function(message, disable){
    this.formSubmit.val(message);
    if(disable){
      this.formSubmit.prop("disabled", true);
    } else {
      this.formSubmit.prop("disabled", false);
    }
  };
  
  CartForm.prototype._displayMessage = function(message, messageType){
    var messageMarkup = this.settings.messageMarkup(message, messageType);
    this.formSubmit.after(messageMarkup);
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
  
  /* Cart Display */
  var CartDisplay = function(cartCountElement){
    this.$cartCountElement = $(cartCountElement);
  };
  
  CartDisplay.prototype.updateCartCountElement = function(count){
    if(this.$cartCountElement.text() !== count){
      this.$cartCountElement.text(count);
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
    connection: {
      cartGetURL: '/cart.js',
      cartPostURL: '/cart/add.js'
    },
    form: {
      cartURL: '/cart/add.js', // remove
      defaultSubmitValue: 'Add to cart',
      messageMarkup: function(message, messageType){
        return '<span class="ajax-cart-message help-block text-'+messageType+'">'+message+'</span>';
      }
    }
  };

}(jQuery));
// ---------------------------------------------------------------------------
// Bootstrapify option selector by Lucid - 17/1/2014
// ---------------------------------------------------------------------------

Shopify.BootstrapifyOptionSelectors = function(existingSelectorId, options){
  // override markup vars
  this.b_selectorDivClass       = 'selector-wrapper form-group';
  this.b_selectorClass          = 'single-option-selector form-control';
  this.b_linkOptions            = options.linkOptions || false;
  this.onVariantSelected        = Shopify.isDefined(options.onVariantSelected) ? options.onVariantSelected : function(){};
  this.product                  = new Shopify.Product(options.product);
  
  if(this.product.variants.length === 1){
    var oldSelector = document.getElementById(existingSelectorId);
    oldSelector.style.display = 'none';
    this.displayVariantTitle(oldSelector);
    // trigger select callback
    this.onVariantSelected(this.product.variants[0], null);
  } else {
    // call base constructor
    Shopify.BootstrapifyOptionSelectors.baseConstructor.call(this, existingSelectorId, options);
    // apply markup
    this.bootstrapifyMarkup();
    // linked options
    if(this.b_linkOptions && this.product.available && this.product.options.length > 1){
      Shopify.linkOptionSelectors(this.product, existingSelectorId);
    }
  }
};

Shopify.extend(Shopify.BootstrapifyOptionSelectors, Shopify.OptionSelectors);

Shopify.BootstrapifyOptionSelectors.prototype.displayVariantTitle = function(oldSelector){
  var options = this.product.variants[0].options;	
  var showTitle = true;
  for(var i = 0; i < options.length; i++){
    if(options[i] === "Default Title"){
      showTitle = false;
    }
  }
  if(showTitle){
    var title = document.createElement('p');
    title.className = 'lead';
    title.innerHTML = this.product.variants[0].title; // needs option.name as well
    oldSelector.parentNode.appendChild(title);
  }
};

Shopify.BootstrapifyOptionSelectors.prototype.bootstrapifyMarkup = function(){
  var self = this;
  Shopify.each(this.selectors, function(selector){
    var element = selector.element;
    var parentElement = element.parentNode;
    element.className = self.b_selectorClass;
    parentElement.className = self.b_selectorDivClass;
    
    if(self.selectors.length === 1 && selector.name !== 'Title'){
      parentElement.insertBefore(self.displaySingleOptionLable(selector), element);
    }
  });
};

Shopify.BootstrapifyOptionSelectors.prototype.displaySingleOptionLable = function(selector){
  var label = document.createElement('label');
  label.htmlFor = selector.element.id;
  label.innerHTML = selector.name;
  return label;
};



// (c) Copyright 2011 Caroline Schnapp. All Rights Reserved. Contact: mllegeorgesand@gmail.com
// See http://wiki.shopify.com/Linked_Options
 
var Shopify = Shopify || {};
 
Shopify.optionsMap = {};
 
Shopify.updateOptionsInSelector = function($productForm, selectorIndex) {
  var key, selector;
  switch (selectorIndex) {
    case 0:
      key = 'root';
      selector = $productForm.find('.single-option-selector:eq(0)');
      break;
    case 1:
      key = $productForm.find('.single-option-selector:eq(0)').val();
      selector = $productForm.find('.single-option-selector:eq(1)');
      break;
    case 2:
      key = $productForm.find('.single-option-selector:eq(0)').val();  
      key += ' / ' + $productForm.find('.single-option-selector:eq(1)').val();
      selector = $productForm.find('.single-option-selector:eq(2)');
  }
  
  var initialValue = selector.val();
  selector.empty();    
  var availableOptions = Shopify.optionsMap[key];
  for (var i=0; i<availableOptions.length; i++) {
    var option = availableOptions[i];
    var newOption = jQuery('<option></option>').val(option).html(option);
    selector.append(newOption);
  }
  if (jQuery.inArray(initialValue, availableOptions) !== -1) {
    selector.val(initialValue);
  }
  selector.trigger('change');  
  
};
 
Shopify.linkOptionSelectors = function(product, existingSelectorId) {
  // Building our mapping object.
  for (var i=0; i<product.variants.length; i++) {
    var variant = product.variants[i];
    var key;
    if (variant.available) {
      // Gathering values for the 1st drop-down.
      Shopify.optionsMap['root'] = Shopify.optionsMap['root'] || [];
      Shopify.optionsMap['root'].push(variant.option1);
      Shopify.optionsMap['root'] = Shopify.uniq(Shopify.optionsMap['root']);
      // Gathering values for the 2nd drop-down.
      if (product.options.length > 1) {
        key = variant.option1;
        Shopify.optionsMap[key] = Shopify.optionsMap[key] || [];
        Shopify.optionsMap[key].push(variant.option2);
        Shopify.optionsMap[key] = Shopify.uniq(Shopify.optionsMap[key]);
      }
      // Gathering values for the 3rd drop-down.
      if (product.options.length === 3) {
        key = variant.option1 + ' / ' + variant.option2;
        Shopify.optionsMap[key] = Shopify.optionsMap[key] || [];
        Shopify.optionsMap[key].push(variant.option3);
        Shopify.optionsMap[key] = Shopify.uniq(Shopify.optionsMap[key]);
      }
    }
  }
  
  var $productForm = $('#'+existingSelectorId).closest('form');
  // Update options right away.
  Shopify.updateOptionsInSelector($productForm, 0);
  if (product.options.length > 1){ Shopify.updateOptionsInSelector($productForm, 1); }
  if (product.options.length === 3){ Shopify.updateOptionsInSelector($productForm, 2); }
  // When there is an update in the first dropdown.
  $productForm.find(".single-option-selector:eq(0)").change(function() {
    Shopify.updateOptionsInSelector($productForm, 1);
    if (product.options.length === 3){ Shopify.updateOptionsInSelector($productForm, 2); }
    return true;
  });
  // When there is an update in the second dropdown.
  $productForm.find(".single-option-selector:eq(1)").change(function() {
    if (product.options.length === 3){ Shopify.updateOptionsInSelector($productForm, 2); }
    return true;
  });
  
};
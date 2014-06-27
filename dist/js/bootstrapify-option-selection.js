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
      Shopify.linkOptionSelectors(this.product);
    }
  }
};

Shopify.extend(Shopify.BootstrapifyOptionSelectors, Shopify.OptionSelectors);

// OVERRIDE SHOPIFY DEFAULT create and return new selector element for given option
Shopify.OptionSelectors.prototype.buildSelectors = function() {
  // build selectors
  for (var i = 0; i < this.product.optionNames().length; i++) {
    var sel = new Shopify.SingleOptionSelector(this, i, this.product.optionNames()[i], this.product.optionValues(i));
    sel.element.disabled = false;
    this.selectors.push(sel);
  }

  // replace existing selector with new selectors, new hidden input field, new hidden messageElement
  var divClass = this.selectorDivClass;
  var optionNames = this.product.optionNames();
  var elements = Shopify.map(this.selectors, function(selector) {
    var div = document.createElement('div');
    div.setAttribute('class', divClass);
    // create label if more than 1 option (ie: more than one drop down)
    if (optionNames.length > 1 || selector.name !== 'Title') {
      // create and appened a label into div
      var label = document.createElement('label');
      label.htmlFor = selector.element.id;
      label.innerHTML = selector.name;
      div.appendChild(label);
    }
    div.appendChild(selector.element);
    return div;
  });

  return elements;
};

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
    title.innerHTML = this.product.variants[0].title;
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
  });
};



// (c) Copyright 2011 Caroline Schnapp. All Rights Reserved. Contact: mllegeorgesand@gmail.com
// See http://wiki.shopify.com/Linked_Options
 
var Shopify = Shopify || {};
 
Shopify.optionsMap = {};
 
Shopify.updateOptionsInSelector = function(selectorIndex) {
  var key, selector;
  switch (selectorIndex) {
    case 0:
      key = 'root';
      selector = jQuery('.single-option-selector:eq(0)');
      break;
    case 1:
      key = jQuery('.single-option-selector:eq(0)').val();
      selector = jQuery('.single-option-selector:eq(1)');
      break;
    case 2:
      key = jQuery('.single-option-selector:eq(0)').val();  
      key += ' / ' + jQuery('.single-option-selector:eq(1)').val();
      selector = jQuery('.single-option-selector:eq(2)');
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
 
Shopify.linkOptionSelectors = function(product) {
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
  
  // Update options right away.
  Shopify.updateOptionsInSelector(0);
  if (product.options.length > 1){ Shopify.updateOptionsInSelector(1); }
  if (product.options.length === 3){ Shopify.updateOptionsInSelector(2); }
  // When there is an update in the first dropdown.
  jQuery(".single-option-selector:eq(0)").change(function() {
    Shopify.updateOptionsInSelector(1);
    if (product.options.length === 3){ Shopify.updateOptionsInSelector(2); }
    return true;
  });
  // When there is an update in the second dropdown.
  jQuery(".single-option-selector:eq(1)").change(function() {
    if (product.options.length === 3){ Shopify.updateOptionsInSelector(2); }
    return true;
  });
  
};
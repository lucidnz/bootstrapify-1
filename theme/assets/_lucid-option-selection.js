// ---------------------------------------------------------------------------
// A better Shopify option selector by Lucid - 17/1/2014
// ---------------------------------------------------------------------------
// Goal: a more intuitive option select that removes the need for an 'unavailble' product
//
// - Build the option selectors based on the exsisting selector
//   -> Use markup from exsisting selector including any classes or data attributes from exsisting selector
//   -> has to be smart enough to use lable classes if they exist
//   -> Include a blank option for when there is no matching option
// - Call calllback function when option selector is selected

if ((typeof Shopify) === 'undefined') { var Shopify = {}; }

Shopify.LucidOptionSelectors = function(existingSelectorId, options){
  this.selectorDivClass  = 'selector-wrapper '+options.selectorDivClass;
  this.selectorClass     = 'single-option-selector';
  this.blankOption       = '---';
  
  this.variants          = [];
  this.selectors         = [];
  this.domIdPrefix       = existingSelectorId;
  this.product           = new Shopify.Product(options.product);
  this.onVariantSelected = Shopify.isDefined(options.onVariantSelected) ? options.onVariantSelected : function(){};
  
  this.replaceSelector(existingSelectorId);
};

Shopify.LucidOptionSelectors.prototype = {

  replaceSelector: function(domId){
  
/*     console.log(this.product); */
    
    this.oldSelector = document.getElementById(domId);
    this.oldSelectorLabel = this.getSelectorLabel(domId);
    var parent = this.oldSelector.parentNode;
    
    var firstChild = parent.firstChild;
    Shopify.each(this.buildSelectors(), function(el) {
      parent.insertBefore(el, firstChild);
    });
    
    this.oldSelector.style.display = 'none';
    if(this.oldSelectorLabel){ this.oldSelectorLabel.style.display = 'none'; }
    this.variantIdField = this.oldSelector;
  },
  
  getSelectorLabel: function(selectorId){
    var labels = document.getElementsByTagName('label');
    for(var i = 0; i < labels.length; i++){
      if(labels[i].getAttribute('for') === selectorId){ return labels[i]; }
    }
    return false;
  },
  
  buildSelectors: function(){
    for (var i = 0; i < this.product.optionNames().length; i++) {
      var sel = new Shopify.LucidSingleOptionSelector(this, i, this.product.optionNames()[i], this.product.optionValues(i));
      this.selectors.push(sel);
    }
  
    var divClass = this.selectorDivClass;
    var elements = Shopify.map(this.selectors, function(selector) {
      var div = document.createElement('div');
      div.setAttribute('class', divClass);
      div.appendChild(selector.label);
      div.appendChild(selector.element);
      return div;
    });
    
    return elements;
  },
  
  // returns array of currently selected values from all multiselectors
  selectedValues: function() {
    var currValues = [];
    for (var i = 0; i < this.selectors.length; i++) {
      var thisValue = this.selectors[i].element.value;
      currValues.push(thisValue);
    }
    return currValues;
  },
  
  // callback when a selector is updated.
  updateSelectors: function(index){
    var currValues = this.selectedValues(); // get current values
    var variant    = this.product.getVariant(currValues);
/*     console.log(this.product.getVariant); */
/*     console.log('======================'); */
    
    if (variant) {
      this.variantIdField.disabled = false;
      this.variantIdField.value = variant.id; // update hidden selector with new variant id
    } else {
      // get list of matching variants
      this.getVariantsFor(currValues, index);
      console.log(this.variants);
      
      // disable the non matching variants
/*
      for(var i = 0; i < this.selectors.length; i++){
        if(i !== index){
          var selector = this.getSelectorByIndex(i);
          var variantOptions = this.getVariantOptions(this.variants, i);
          this.disableNonMatchingOptions(selector.getOptions(), variantOptions);
        }
      }
      this.variantIdField.disabled = true;
*/
    }
    this.onVariantSelected(variant, this);  // callback 
  },
  
  getVariantsFor: function(selectedValues, index){
    // return an array of variants that match the current select group
    
  
  
/*
    if(this.isAllBlank(selectedValues)){
      // setting all selects back to blank
      this.variants = [];
    } else if(this.variants.length === 0){
      // search all variants for the ones we want
      var variants = [];
      Shopify.each(this.product.variants, function(variant) {
        for(var i in variant.options){
          if(selectedValues.indexOf(variant.options[i]) !== -1){
            variants.push(variant.options);
          }
        }
      });
      this.variants = variants;
    } else {
      // refine current variants
      var variants = [];
      var lastSelectedValue = this.getLastSelectorsValue(index);
      
      console.log('lastSelectedValue: '+lastSelectedValue);
      
      for(var i = 0; i < this.variants.length; i++){
        console.log('this.variants[index]: '+this.variants[i]);
        if(this.variants[i].indexOf(lastSelectedValue) !== -1){
          variants.push(this.variants[i]);
        }
      }
      this.variants = variants;
    }
*/
  },
  
  isAllBlank: function(currValues){
    console.log('current selected values: '+currValues);
    // if all vales in array are null
    for(var i = 0; i < currValues.length; i++){
      if(currValues[i] !== 'null'){
        return false;
      }
    }
    return true;
  },
  
  getVariantOptions: function(variants, optionIndex){
    console.log(variants);
    var options = [];
    Shopify.each(variants, function(variantOptions){
      var option = variantOptions[optionIndex];
      if(options.indexOf(option) === -1){
        options.push(option);
      }
    });
    return options;
  },
  
  disableNonMatchingOptions: function(selectorOptions, variantOptions){
    Shopify.each(selectorOptions, function(option){
      if(option.value !== 'null' && variantOptions.indexOf(option.value) === -1){
        option.disabled = true;
      } else if(option.disabled){
        option.disabled = false; // make sure we don't leave things disabled if they are not
      }
    });
  },
  
  getLastSelectorsValue: function(index){
    var selector = this.getSelectorByIndex(index);
    return selector.getValue();
  },
  
  getSelectorByIndex: function(index){
    return this.selectors[index];
  }
  
};

// ---------------------------------------------------------------------------
// SingleOptionSelector
// takes option name and values and creates a cloned option selector
// ---------------------------------------------------------------------------

Shopify.LucidSingleOptionSelector = function(multiSelector, index, name, values) {
  this.multiSelector = multiSelector;
  this.values = values;
  this.index = index;
  this.name = name;
  this.id = this.multiSelector.domIdPrefix + '-option-' + this.index;
  this.label = this.buildSelectLabel();
  this.element = this.buildSelectElement();
  return true;
};

Shopify.LucidSingleOptionSelector.prototype = {
  
  buildSelectLabel: function(){
    var label = document.createElement('label');
    label.htmlFor = this.id;
    label.innerHTML = this.name;
    // keep any classes that are set on the original label
    if(this.multiSelector.oldSelectorLabel){
      label.className = this.multiSelector.oldSelectorLabel.className;
    }
    return label;
  },
  
  buildSelectElement: function(){
    // clone the select element so as to keep any classes and data attributes
    var element = this.multiSelector.oldSelector.cloneNode(true);
    element.className += ' '+this.multiSelector.selectorClass;
    element.id = this.id;
    // we don't want any conflicts when the form is submitted
    element.removeAttribute('name');
    // set the selects options
    element = this.setElementOptions(element);
    
    var multiSelector = this.multiSelector;
    var index = this.index;
    element.onchange = function() {
      multiSelector.updateSelectors(index);
    };
    return element;
  },
  
  setElementOptions: function(element){
    // reset the options
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    // add blank option
    var blankOption = this.selectOption(null, this.multiSelector.blankOption);
    element.appendChild(blankOption);
    for (var i = 0; i < this.values.length; i++) {
      element.appendChild(this.selectOption(this.values[i], this.values[i]));
    }
    return element;
  },

  selectOption: function(value, option){
    var opt = document.createElement('option');
    opt.value = value;
    opt.innerHTML = option;
    return opt;
  },
  
  getValue: function(){
    return this.element.value;
  },
  
  getOptions: function(){
    return this.element.options;
  }
};
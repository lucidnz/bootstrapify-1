(function($){
  
  var BootstrapifyDropdown = function($ele){
    this.$ele = $ele;
    this.submenus = this.$ele.find('.submenu');
    this.init();
  };
  
  BootstrapifyDropdown.prototype.init = function(){
    if(this.hasSubMenus(1)){
      this.resizeDropdown();
    }
    this.addDividers();
  };
  
  BootstrapifyDropdown.prototype.resizeDropdown = function(){
    var newDropdownWidth = this.getDropdownWidth();
    this.$ele.width(newDropdownWidth);
  };
  
  BootstrapifyDropdown.prototype.addDividers = function(){
    if(this.hasSubMenus()){
/*       if(){} */
      // if submenu first has a prev sibling add divider before
      // if submenu last has next sibling add divider after
    
    
      console.log(this.submenus);
    }
  };
  
  BootstrapifyDropdown.prototype.hasSubMenus = function(threshold){
    if(threshold === undefined){ threshold = 0; }
    return this.submenus.length > threshold;
  };
  
  BootstrapifyDropdown.prototype.getDropdownWidth = function(){
    var totalWidth = 0;
    $.each(this.submenus, function(){
      totalWidth += $(this).getHiddenDimensions().width;
    });
    return totalWidth;
  };

  $.fn.bootstrapifyDropdown = function(){
    return this.each(function(){
      $ele = $(this);
      $ele.data('_bootstrapifyDropdown', new BootstrapifyDropdown($ele));
    });
  };
  
  
  // http://www.foliotek.com/devblog/getting-the-width-of-a-hidden-element-with-jquery-using-width/
  // Optional parameter includeMargin is used when calculating outer dimensions
  $.fn.getHiddenDimensions = function(includeMargin) {
    var $item = this,
      props = { position: 'absolute', visibility: 'hidden', display: 'block' },
      dim = { width:0, height:0, innerWidth: 0, innerHeight: 0,outerWidth: 0,outerHeight: 0 },
      $hiddenParents = $item.parents().andSelf().not(':visible'),
      includeMargin = (includeMargin == null)? false : includeMargin;

    var oldProps = [];
    $hiddenParents.each(function() {
      var old = {};

      for ( var name in props ) {
          old[ name ] = this.style[ name ];
          this.style[ name ] = props[ name ];
      }

      oldProps.push(old);
    });

    dim.width = $item.width();
    dim.outerWidth = $item.outerWidth(includeMargin);
    dim.innerWidth = $item.innerWidth();
    dim.height = $item.height();
    dim.innerHeight = $item.innerHeight();
    dim.outerHeight = $item.outerHeight(includeMargin);

    $hiddenParents.each(function(i) {
      var old = oldProps[i];
      for ( var name in props ) {
          this.style[ name ] = old[ name ];
      }
    });

    return dim;
  }
  
}(jQuery));
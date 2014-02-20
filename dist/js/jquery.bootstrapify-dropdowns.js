(function($){
  
  var BootstrapifyDropdown = function($ele){
    this.$ele = $ele;
    this.menu = $ele.find('.dropdown-menu');
    this.submenus = $ele.find('.submenu');
    this.divider = '<li class="divider"></li>';
    this.maxCols = 3;
    this.init();
    
    var self = this;
    $(window).on('resize', function(){
      self.resizeDropdown();
    });
  };
  
  BootstrapifyDropdown.prototype.init = function(){
    this.resizeDropdown();
    this.addDividers();
  };
  
  BootstrapifyDropdown.prototype.resizeDropdown = function(){
    if(this.hasSubMenus(1)){
      if(this.screenSizeIs('xs')){
        // dont resize if we are on a mobile view
        this.menu.width('auto');
        
      } else {
        // open dropdown to get hidden elements dimensions
        this.$ele.addClass('open');
        
        var newDropdownWidth = this.getDropdownWidth();
        this.menu.width(newDropdownWidth);
        
        // close the dropdown again
        this.$ele.removeClass('open');
      }
    }
  };
  
  BootstrapifyDropdown.prototype.hasSubMenus = function(threshold){
    if(threshold === undefined){ threshold = 0; }
    return this.submenus.length > threshold;
  };
  
  BootstrapifyDropdown.prototype.getDropdownWidth = function(){
    var maxDropdownWidth = this.getMaxDropdownWidth();
    var maxCols = this.maxCols;
    var totalWidth = 1; // +1 to account for fx being a lame
    $.each(this.submenus, function(i){
      var colCount = i + 1;
      var width = $(this).width();
      
      // we have the max amount of cols we can fit so break
      if(totalWidth + width > maxDropdownWidth || colCount > maxCols){ return; }
      
      totalWidth += width;
    });
    return totalWidth;
  };
  
  BootstrapifyDropdown.prototype.getMaxDropdownWidth = function(){
    var documentWidth = $(document).width();
    var menuOffsetLeft = this.menu.offset().left;
    return documentWidth - menuOffsetLeft;
  };
  
  BootstrapifyDropdown.prototype.addDividers = function(){
    if(this.hasSubMenus()){
      var self = this;
      $.each(this.submenus, function(){
        var $this = $(this);
        // if submenu has a next sibling that is not a submenu add divider after
        if(self.hasSibling($this.next())){ $this.after(self.divider); }
        
        // if submenu has a prev sibling that is not a submenu add divider before
        if(self.hasSibling($this.prev())){ $this.before(self.divider); }
      });
    }
  };
  
  BootstrapifyDropdown.prototype.hasSibling = function($sibling){
    return $sibling.length > 0 && !$sibling.hasClass('submenu');
  };
  
  BootstrapifyDropdown.prototype.screenSizeIs = function(size){
    var screenSize = this.getScreenSize();
    return screenSize.indexOf(size) !==-1;
  };
  
  BootstrapifyDropdown.prototype.getScreenSize = function(){
    return window.getComputedStyle(document.body,':after').getPropertyValue('content');
  };

  $.fn.bootstrapifyDropdown = function(){
    return this.each(function(){
      var $ele = $(this);
      $ele.data('_bootstrapifyDropdown', new BootstrapifyDropdown($ele));
    });
  };
  
}(jQuery));
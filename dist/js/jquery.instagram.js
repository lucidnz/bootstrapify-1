/*
 * jquery.instagram.js
 * Display an instagram feed on your shopify site.
 * Requires jQuery Instagram by Giovanni Cappellotto http://potomak.github.com/jquery-instagram
 */
 
(function($) {

  var BootstrapifyInstagram = function($ele){
    this.$ele           = $ele;
    this.clientId       = this.$ele.data('client-id');
    this.hastag         = this.$ele.data('hashtag');
    this.defaultHastag  = this.$ele.data('default-hashtag');
    this.imageCount     = this.$ele.data('image-count');
    this.blacklist      = this.$ele.data('blacklist').split(',');
    
    this.init();
  };
  
  BootstrapifyInstagram.prototype.init = function(){
    var self = this;
    var hashtag = this.hastag || this.defaultHastag;
    this.$ele.instagram({
      hash: hashtag,
      count: this.imageCount,
      clientId: this.clientId
    }).on('didLoadInstagram', function(event, response){
      self.didLoadInstagram(this, event, response);
    });
  };
  
  BootstrapifyInstagram.prototype.didLoadInstagram = function(element, event, response){
    console.log(this);
    console.log(event);
    console.log(element);
    console.log(response);
/*
    if(response.data.length > 0){
      $.each(response.data, function(i, photo) {
        $(that).append(createPhotoElement(photo));
      });
    } else {
      console.log('No images for instagram search');
    }
*/
    
    
/*
    var that = this;
    if(response.data.length > 0){
      $.each(response.data, function(i, photo) {
        $(that).append(createPhotoElement(photo));
      });
    } else {
      console.log('No images for instagram search');
    }
*/
  };

  $.fn.bootstrapifyInstagram = function(){
    return this.each(function(){
      var $ele = $(this);
      $ele.data('_bootstrapifyInstagram', new BootstrapifyInstagram($ele));
    });
  };

}(jQuery));

/* Load instagram widget */
$(function(){
  jQuery(document.getElementById('instagram-widget')).bootstrapifyInstagram();
});

/*
$(document).ready(function(){
  var clientId = '5491f0c04ee54ee09dd0803be66f96a9';
  var $instagram = $('.instagram');
  var hashtag = $instagram.data('hashtag');
  var hashtagFallback = $instagram.data('hashtag-fallback');
  var blackList = '{{ settings.instagram_app_black_list }}'.split(',');
  var imageCount = 12;
  
  function inBlackList(photo){
    var inList = false;
    $.each(blackList, function(i, str){
      var str = $.trim(str);
      if(str != '' && photo.link.indexOf(str) !== -1){ inList = true; }
    });
    return inList;
  }
  
  function createPhotoElement(photo) {
    if(!inBlackList(photo)){
      var innerHtml = $('<img>')
      .addClass('instagram-image')
      .attr('src', photo.images.thumbnail.url);
  
      innerHtml = $('<a>')
      .attr('target', '_blank')
      .attr('href', photo.link)
      .append(innerHtml);
  
      return $('<div>')
      .addClass('instagram-thumb col-sm-2 col-md-2 col-lg-2')
      .attr('id', photo.id)
      .append(innerHtml);
    }
  }

  function didLoadInstagram(event, response) {
    var that = this;
    if(response.data.length > 0){
      $.each(response.data, function(i, photo) {
        $(that).append(createPhotoElement(photo));
      });
    } else {
      console.log('No images for instagram search, loading fallback');
      $(that).instagram({
        hash: hashtagFallback,
        count: imageCount,
        clientId: clientId
      })
      .off('didLoadInstagram', didLoadInstagram)
      .on('didLoadInstagram', didLoadInstagramFallback);
    }
  }
  
  function didLoadInstagramFallback(event, response){
    var that = this;
    if(response.data.length > 0){
      $.each(response.data, function(i, photo) {
        $(that).append(createPhotoElement(photo));
      });
    } else {
      $(that).append('no images found.');
    }
  }
    
  $instagram.instagram({
    hash: hashtag,
    count: imageCount,
    clientId: clientId
  }).on('didLoadInstagram', didLoadInstagram);
});
*/
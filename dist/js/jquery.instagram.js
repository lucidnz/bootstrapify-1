/*
 * jquery.instagram.js
 * Display an Instagram feed on your Shopify site.
 *
 * Wrapper for jQuery Instagram by Giovanni Cappellotto https://github.com/potomak/jquery-instagram
 * Adds a black-list for filtering unwanted images
 * As well as the ablity to show a page specific hashtag if one exists
 * with a global fallback if it doesn't exist or returns no results
 */
 
(function($) {

  var BootstrapifyInstagram = function($ele){
    this.$ele           = $ele;
    this.clientId       = this.$ele.data('client-id');
    this.feedLink       = this.$ele.data('instagram-link');
    this.hastag         = this.$ele.data('hashtag');
    this.defaultHashtag = this.$ele.data('default-hashtag');
    this.currentHashtag = this.hastag || this.defaultHashtag;
    this.imageCount     = this.$ele.data('image-count');
    this.blacklist      = this.$ele.data('blacklist').split(',');
    
    if(this.currentHashtag){
      this.addEventListeners();
      this.loadInstagramImages(this.currentHashtag);
    } else {
      this.$ele.html('');
      console.log('No hashtag set for instagram feed.');
    }
  };
  
  BootstrapifyInstagram.prototype.addEventListeners = function(){
    var self = this;
    this.$ele.on('didLoadInstagram', function(event, response){
      self.didLoadInstagram(this, event, response);
    });
  };
  
  BootstrapifyInstagram.prototype.loadInstagramImages = function(hashtag){
    this.currentHashtag = hashtag; // make sure we always know what we are searching
    
    // Call Instagram request
    this.$ele.instagram({
      hash: hashtag,
      count: this.imageCount + 10, // grab some extras so that we can account for any images that are filltered out by Instagram or blacklisted
      clientId: this.clientId
    });
  };
  
  BootstrapifyInstagram.prototype.didLoadInstagram = function(element, event, response){
    var self = this;
    if(response.data.length > 0){
      self.updateMessageHashtag();
      self.loopResponseData(response.data);
    } else {
      self.noResponseData();
    }
  };
  
  BootstrapifyInstagram.prototype.updateMessageHashtag = function(){
    var messageHashtag = this.$ele.find('.hashtag');
    if(messageHashtag.length > 0 && messageHashtag.text() != this.currentHashtag){
      messageHashtag.text(this.currentHashtag);
    }
  };
  
  BootstrapifyInstagram.prototype.loopResponseData = function(data){
    var self = this;
    // make sure we are returning an expected amount of images, or as close to
    // taking into account filltered and blacklisted images
    var imageCount = 0;
    $.each(data, function(i, photo) {
      if(imageCount === self.imageCount){ return false; } // break when we have what we need
    
      if(self.notInBlackList(photo)){
        self.addImage(photo);
        imageCount++;
      }
    });
  };
  
  BootstrapifyInstagram.prototype.addImage = function(photo){
    var imageContainer = this.$ele.find('.instagram-images');
    var imageElement = this.createPhotoElement(photo);
    imageContainer.append(imageElement);
  };
  
  BootstrapifyInstagram.prototype.createPhotoElement = function(photo){
    var innerHtml = $('<img>')
    .addClass('instagram-image thumbnail')
    .attr('src', photo.images.low_resolution.url);

    innerHtml = $('<a>')
    .attr('target', '_blank')
    .attr('href', photo.link)
    .append(innerHtml);

    return $('<div>')
    .addClass('instagram-thumb col-sm-3')
    .attr('id', photo.id)
    .append(innerHtml);
  };
  
  BootstrapifyInstagram.prototype.notInBlackList = function(photo){
    var inList = true;
    $.each(this.blacklist, function(i, str){
      str = $.trim(str);
      if(str !== '' && photo.link.indexOf(str) !== -1){ inList = false; }
    });
    return inList;
  };
  
  BootstrapifyInstagram.prototype.noResponseData = function(){
    if(this.currentHashtag !== this.defaultHashtag){
      this.loadInstagramImages(this.defaultHashtag); // drop back to fallback hashtag
    } else {
      var message = $('p').text('No images found for #'+this.currentHashtag);
      this.$ele.append(message);
    }
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
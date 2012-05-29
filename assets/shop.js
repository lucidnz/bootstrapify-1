function displayImage(index, parent){
 	var images = document.getElementById(parent).getElementsByTagName("div");
	for(var i = 0; i < images.length; i++) {
	  var image = images[i];
	  if (image.className != 'pimage')  { continue }
	  if(i == index-1) {
	    image.style.display="block";
	  }
	  else {
	    image.style.display="none";
	  }		
	}	
}
jQuery(document).ready(function(jQuery){
$('.typeahead').typeahead();
$('.dropdown-toggle').dropdown();



})

/** 
 * Balances the height of rows of products/collections. 
 * Finds the tallest item in a row, makes each <li> in that row as tall as the tallest. 
 */
$.fn.balanceRowHeight = function(numPerRow) {  
  var nPerRow = numPerRow || 4; 
  var nItems = $(this).find('.thumbnail .image-wrap').length;
  var nRows = Math.round( nItems / nPerRow );

  for( var row = 1; row <= nRows; row++ ){
    var min = row * nPerRow - nPerRow;
    var max = row * nPerRow;
    var tallestInRow = 0;
    var tallestTitleInRow = 0;

    $(this).find('.thumbnail .image-wrap').slice(min, max).each(function(){
      if( $(this).height() > tallestInRow ){
        tallestInRow = $(this).height();     
      }
      if( $(this).find('.caption:first').height() > tallestTitleInRow ){
        tallestTitleInRow = $(this).find('.caption').height();
      }
    }).height(tallestInRow).addClass('generated-height').find('.caption').height(tallestTitleInRow);
  }

  return this;
};
$(window).load( function(){
  
    $('.thumbnails').balanceRowHeight(4);
  
});

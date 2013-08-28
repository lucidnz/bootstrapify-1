/* Product Image Switcher */
$('.thumbnail').click(function() {
	var targetImage = $(this).attr('data-main-image');
	$('#main').fadeOut(400, function(){
		$('div.loader').fadeIn(100);
		$(this).attr('src', targetImage).load(function(){
			$('div.loader').fadeOut(100);
			$(this).fadeIn();
		});
	});
});
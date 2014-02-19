function getID(id){ // http://jsperf.com/getelementbyid-vs-jquery-id/44
  return jQuery(document.getElementById(id));
}

var preloadProductImages = function(){
  var $thumbs = $('[data-main-image]');
  if($thumbs.length > 0){
    $thumbs.each(function(){
      var image = new Image();
      image.src = $(this).attr('data-main-image');
    });
  }
};

$(function() {
  /* Multiple currencies */
  if ($('body').hasClass('currencies')) {
        
    $('#currency-picker-toggle a').click(function() {
      $('#currency-picker-toggle').hide();
      $('#currencies-picker').fadeIn();
      return false;
    });

    $('#currencies-picker select').change(function() {
      $('#currencies-picker').hide();
      $('#currency-picker-toggle').fadeIn();
      return true;
    }).blur(function() {
      $('#currencies-picker').hide();
      $('#currency-picker-toggle').fadeIn();
      return true;
    });

  }
        
  $('.localize').tooltip();
  $('.tip').popover({
    trigger: 'click',
    placement: 'left',
    html: true
  });
});

$(window).load(function(){
  preloadProductImages();
  
  /* Isotope */
  var $container = $('.row');
  // init
  $container.isotope({
    // options
    itemSelector: '.masonry',
    layoutMode: 'masonry'
  });
  /* End Isotope */
  
  $('.carousel').on('slid.bs.carousel', function () {
    var imgHeight = $(this).find('.item.active img').height();
    $('.carousel-control').css({maxHeight: imgHeight});
  });
});

/* Product Image Switcher */
$('[data-main-image]').click(function(event) {
	var targetImage = $(this).attr('data-main-image');
	var $mainImage = getID('main');
	if($mainImage.attr('src') !== targetImage){
    $mainImage.fadeOut(400, function(){
      $('div.loader').fadeIn(100);
      $(this).attr('src', targetImage).load(function(){
        $('div.loader').fadeOut(100);
        $(this).fadeIn();
      });
    });
	}
	event.preventDefault();
});


/* modal signin forms */
var modalForm = getID('signinModal');
modalForm.on('submit', 'form', function(e){
  // collect form data and validate
  var form = $(this),
    inputArray = [],
    valid = true;
  form.find('input').each(function(){
    var input = $(this);
    if(input.attr('name')){
      if(input.val() === ''){
        valid = false;
        input.closest('.form-group').addClass('has-error').append('<p class="help-block">Field can\'t be blank.</p>');
      }
      inputArray.push(input.attr('name') +'='+ input.val());
    }
  });
  var dataString = inputArray.join('&');
  
  // POST form data
  if(valid){
    $.ajax({
      type: "POST",
      url: $(this).attr('action'),
      data: dataString,
      success: function(data) {
        // check for error and refresh page if none found
        var formAlert = $(data).find('form .alert');
        if(formAlert.length > 0){
          form.prepend('<div class="alert alert-danger">'+formAlert.html()+'</div>');
        } else {
          window.location.reload();
        }
      },
      error: function(data) {
        console.log('Form post error:');
        console.log(data);
      }
    });
  }
  e.preventDefault();
});

/* Recover password form */
var recoverForm = getID('customer-recover-password-form'),
  loginForm = getID('customer-login-form');

function showRecoverPasswordForm() {
  recoverForm.parent().show();
  loginForm.parent().hide();
}

function hideRecoverPasswordForm() {
  recoverForm.parent().hide();
  loginForm.parent().show();
}

$('.hide-recover-password-form').on('click', function(e){
  hideRecoverPasswordForm();
  e.preventDefault();
});

$('.show-recover-password-form').on('click', function(e){
  showRecoverPasswordForm();
  e.preventDefault();
});

// dont show links if we dont have both includes present
if(recoverForm === null){ getID('forgotten-password-link').style.display='none'; }
if(loginForm === null){ getID('recover-password-link').style.display='none'; }

hideRecoverPasswordForm();
if (window.location.hash === '#recover') { showRecoverPasswordForm(); }
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


/* Recover password form */
var recoverForm = document.getElementById('customer-recover-password-form'),
  loginForm = document.getElementById('customer-login-form');

function showRecoverPasswordForm() {
  $(recoverForm).closest('.customer-recover-password-form').show();
  $(loginForm).closest('.customer-login-form').hide();
}

function hideRecoverPasswordForm() {
  $(recoverForm).closest('.customer-recover-password-form').hide();
  $(loginForm).closest('.customer-login-form').show();
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
if(recoverForm === null){ document.getElementById('forgotten-password-link').style.display='none'; }
if(loginForm === null){ document.getElementById('recover-password-link').style.display='none'; }

hideRecoverPasswordForm();
if (window.location.hash === '#recover') { showRecoverPasswordForm(); }
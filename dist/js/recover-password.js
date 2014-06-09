/* Recover password form */

function getID(id){ // http://jsperf.com/getelementbyid-vs-jquery-id/44
  return jQuery(document.getElementById(id));
}

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
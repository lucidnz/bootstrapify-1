/*
* Base JS file
*/

$(function() {
  /* Multiple currencies */
  if ($('body').hasClass('currencies')) {
    var $currencyPicker = $('.currency-picker');
    $currencyPicker.on('click', 'a', function(e) {
      $currencyPicker.find('#current-currency').hide();
      $currencyPicker.find('#currencies-picker').fadeIn();
      e.preventDefault();
      return false;
    }).on('change', 'select', function() {
      $currencyPicker.find('#current-currency').fadeIn();
      $currencyPicker.find('#currencies-picker').hide();
    }).on('blur', 'select', function(){
      $currencyPicker.find('#current-currency').fadeIn();
      $currencyPicker.find('#currencies-picker').hide();
    });
  }
});

/* Show/Hide Cart Note */
$('#cart-note').on('show.bs.collapse', function(){
  $('.cart-note-action').hide();
});
$('#cart-note').on('shown.bs.collapse', function(){
  $(this).find('#note').focus();
});

/* Notify me form */
$(document).on('submit', '.notify-me-wrapper form', function(e){
  var $self = $(this);
  $self.find('.alert').removeClass('alert-danger alert-success').text('').hide();
  
  if($self.find('[type="email"]').val() !== ''){
    $.ajax({
      url: '/contact',
      type: 'POST',
      data: $self.serialize()
    })
    .done(function(){
      $self.find('.alert').addClass('alert-success').text('Thanks! We will notify you when this product becomes available.').show();
      $self.find('.form-group').removeClass('has-error').hide();
    })
    .fail(function(a,b,c){
      console.log(a,b,c);
      $self.find('.alert').addClass('alert-danger').text('There was an error submitting your email. Please try again later.').show();
    });
  } else {
    $self.find('.alert').addClass('alert-danger').text('Please enter an email adddress.').show();
    $self.find('.form-group').addClass('has-error');
  }
  e.preventDefault();
});

/* add body classes on bootstrap js actions */
$(document).on('show.bs.collapse', '#top-nav', function(){
  $('body').removeClass('navbar-collapse-hide').addClass('navbar-collapse-show');
});
$(document).on('hidden.bs.collapse', '#top-nav', function(){
  $('body').removeClass('navbar-collapse-show').addClass('navbar-collapse-hide');
});

/* Trigger window resize after SPR has loaded */
$(function() {
  
/*
  try {
    SPR.$(document).on('spr:badge:loaded', function () {
      console.log('fucking badges');
    });
        
    SPR.$(document).on('spr:reviews:loaded', function () {
      console.log('spr:reviews:loaded');
    });
    
    SPR.$(document).on('spr:product:loaded', function () {
      console.log('spr:product');
    });
  } catch (e) {
    console.log(e);
  }
*/
  
  
/*
  if (SPR === undefined) {
    console.log('no spr');
  } else {
    console.log('!SPR!', SPR);
  }
*/
  
});






/*
      var SPR = SPR || false;
      console.log('spr', SPR);
      if (SPR) {
        console.log('!!!!!');
        SPR.$(document).on('spr:badge:loaded', function () {
          console.log('fucking badges');
        });
        
         SPR.$(document).on('spr:reviews:loaded', function () {
          console.log('spr:reviews:loaded');
        });
        
         SPR.$(document).on('spr:product:loaded', function () {
          console.log('spr:product');
        });
      } else {
        
      }
*/
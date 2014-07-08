/*
* Base JS file
*/

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
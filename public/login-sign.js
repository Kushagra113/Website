$('#flip').on('click', function(e) {
	e.preventDefault();


	$('#card').toggleClass('flipped');

  $('#flip').toggleClass('powered');

  if ($('#card').hasClass('flipped')) {
    $('#message').text("Need to sign up?");
    $('#flip').text("Create an account");
  } else {
    $('#message').text("Already have an account?");
    $('#flip').text("Log in");
  }

});

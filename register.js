function validateEmail() {
	var emailValidation = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	if(!emailValidation.test($('#email')[0].value)) {
		$('#emailWarning').html(" Please enter a valid email address");
		$('#emailWarning').removeClass('validText');
		$('#emailWarning').addClass('invalidText');
	} else {
		$('#emailWarning').html(" Valid email Address");
		$('#emailWarning').removeClass('invalidText');
		$('#emailWarning').addClass('validText');
		// Check if the email already exists. (After setting up database)
	}
}

function validatePassword() {
	// Check password safety level (1~5)
	if($('#password')[0].value !== $('#password2')[0].value) {
		$('#retypePwWarning').html(" Two passwords don't match");
		$('#retypePwWarning').removeClass('validText');
		$('#retypePwWarning').addClass('invalidText');
	} else {
		$('#retypePwWarning').html(" Passwords match")
		$('#retypePwWarning').removeClass('invalidText');
		$('#retypePwWarning').addClass('validText');
	}
}

function validate() {
	validatePassword();
	validateEmail();
}

setInterval(validate, 100);
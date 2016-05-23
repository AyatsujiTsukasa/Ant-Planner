var emailValid = false;
var passwordValid = false;

function validateEmail() {
	var emailValidation = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[_a-z0-9-]+)*(\.[a-z]{2,4})$/;
	if(!emailValidation.test($.trim($('#email')[0].value))) {
		$('#emailWarning').html(" Please enter a valid email address");
		$('#emailWarning').removeClass('validText');
		$('#emailWarning').addClass('invalidText');
		emailValid = false;
	} else {
		$('#emailWarning').html(" Valid email Address");
		$('#emailWarning').removeClass('invalidText');
		$('#emailWarning').addClass('validText');
		emailValid = true;
		// Check if the email already exists. (After setting up database)
	}
}

function validatePassword() {
	var str = $.trim($('#password')[0].value);
	if(!(/[0-9]/.test(str) && /[a-zA-Z]/.test(str))){
		$('#passwordWarning').html(" The password should contain both letters and numbers");
		passwordValid = false;
	} else if (str.length < 6) {
		$('#passwordWarning').html(" The password should contain at least 6 characters");
		passwordValid = false;
	} else if (str.length > 15) {
		$('#passwordWarning').html(" The password should contain at most 15 characters");
		passwordValid = false;
	} else {
		passwordValid = true;
	}
	if(passwordValid){
		$('#passwordWarning').removeClass('invalidText');
		$('#passwordWarning').addClass('validText');
		$('#passwordWarning').html(" Valid password");
	} else {
		$('#passwordWarning').removeClass('validText');
		$('#passwordWarning').addClass('invalidText');
	}
}

function validate() {
	validateEmail();
	validatePassword();
	if(emailValid&&passwordValid){
		$('#loginButton').removeAttr('disabled');
	} else {
		$('#loginButton').attr('disabled', 'disabled');
	}
}

setInterval(validate, 100);
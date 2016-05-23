var emailValid = false;
var passwordValid = false;
var passwordMatch = false;
var usernameValid = false;

function validateUsername() {
	var usernameValidation = /^[a-zA-Z0-9 ]{3,20}$/;
	if(!usernameValidation.test($.trim($('#username')[0].value))) {
		$('#usernameWarning').html(" The username can only contain letters, numbers and spaces, and 3-20 characters");
		$('#usernameWarning').removeClass('validText');
		$('#usernameWarning').addClass('invalidText');
		usernameValid = false;
	} else {
		$('#usernameWarning').html(" Valid username");
		$('#usernameWarning').removeClass('invalidText');
		$('#usernameWarning').addClass('validText');
		usernameValid = true;
		// Check if the username already exists. (After setting up database)
	}
}

function validateEmail() {
	var emailValidation = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[_a-z0-9-]+)*(\.[a-z]{2,4})$/;
	if(!emailValidation.test($.trim($('#email')[0].value))) {
		$('#emailWarning').html(" Please enter a valid email address");
		$('#emailWarning').removeClass('validText');
		$('#emailWarning').addClass('invalidText');
		emailValid = false;
	} else {
		$('#emailWarning').html(" Valid email address");
		$('#emailWarning').removeClass('invalidText');
		$('#emailWarning').addClass('validText');
		emailValid = true;
		// Check if the email already exists. (After setting up database)
	}
}

function matchPassword() {
	if($('#password')[0].value !== $('#password2')[0].value || $('#password2')[0].value === "") {
		$('#retypePasswordWarning').html(" Two passwords do not match");
		$('#retypePasswordWarning').removeClass('validText');
		$('#retypePasswordWarning').addClass('invalidText');
		passwordMatch = false;
	} else {
		$('#retypePasswordWarning').html(" Passwords match");
		$('#retypePasswordWarning').removeClass('invalidText');
		$('#retypePasswordWarning').addClass('validText');
		passwordMatch = true;
	}
}

function validatePassword() {
	var str = $.trim($('#password')[0].value);
	if(!(/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(str))){
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
		$('#passwordWarning').html("Valid password")
		$('#passwordWarning').removeClass('invalidText');
		$('#passwordWarning').addClass('validText');
	} else {
		$('#passwordWarning').removeClass('validText');
		$('#passwordWarning').addClass('invalidText');
	}
}

function validate() {
	matchPassword();
	validateEmail();
	validatePassword();
	validateUsername();
	if(emailValid&&passwordValid&&passwordMatch&&usernameValid){
		$('#registerButton').removeAttr('disabled');
	} else {
		$('#registerButton').attr('disabled', 'disabled');
	}
}

$('#registerForm').submit(function (e) {
	e.preventDefault();
	var _this = $(this),
		action = _this.attr("action");
	$.post(action, _this.serialize(), function (data) {
		$('.ajaxMsg').html(data).show();
	});
});

setInterval(validate, 100);
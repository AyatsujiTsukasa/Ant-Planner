var emailValid = false;
var passwordValid = false;
var passwordMatch = false;
var usernameValid = false;

function validateUsername() {
	var usernameValidation = /^[a-zA-Z0-9 ]{3,20}$/;
	if(!usernameValidation.test($('#username')[0].value)) {
		$('#usernameWarning').html(" Uername can only contain alphabetical characters and spaces, and within length 3-20");
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
	if(!emailValidation.test($('#email')[0].value)) {
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
	if($('#password')[0].value !== $('#password2')[0].value) {
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
	var str = $('#password')[0].value;
	if(!(/[0-9]/.test(str) && /[a-zA-Z]/.test(str))){
		$('#passwordWarning').html(" The password should be alphanumeric");
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
}

function confirmSubmission() {
	if(passwordMatch&&emailValid&&passwordValid){
		$('#registerForm')[0].submit();
	}
}

$('#registerForm').on("keyup", "input.validateLocally", validate);
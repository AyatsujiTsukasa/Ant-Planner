var valid = true;

function validateUsername() {
	var usernameValidation = /^[a-zA-Z0-9 ]{3,20}$/;
	if(!usernameValidation.test($.trim($('#username')[0].value))) {
		$('#usernameWarning').html(" Please use only letters, numbers and spaces, and 3-20 characters");
		$('#usernameWarning').removeClass('text-success');
		$('#usernameWarning').addClass('text-danger');
		valid = false;
	} else {
        if (window.XMLHttpRequest) {
            // for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if(xmlhttp.responseText === "exist") {
                	$('#usernameWarning').html(" Username already taken");
					$('#usernameWarning').removeClass('text-success');
					$('#usernameWarning').addClass('text-danger');
					valid = false;
                } else {
                	$('#usernameWarning').html(" Valid username");
					$('#usernameWarning').removeClass('text-danger');
					$('#usernameWarning').addClass('text-success');
                }
            }
        };
        xmlhttp.open("get", "checkExist.php?q=" + $.trim($('#username')[0].value) + "&para=username", true);
        xmlhttp.send();
	}
}

function validateEmail() {
	var emailValidation = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[_a-z0-9-]+)*(\.[a-z]{2,4})$/;
	if(!emailValidation.test($.trim($('#email')[0].value))) {
		$('#emailWarning').html(" Please enter a valid email address");
		$('#emailWarning').removeClass('text-success');
		$('#emailWarning').addClass('text-danger');
		valid = false;
	} else {
        if (window.XMLHttpRequest) {
            // for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if(xmlhttp.responseText === "exist") {
                	$('#emailWarning').html(" Email already taken");
					$('#emailWarning').removeClass('text-success');
					$('#emailWarning').addClass('text-danger');
					valid = false;
                } else {
                	$('#emailWarning').html(" Valid email address");
					$('#emailWarning').removeClass('text-danger');
					$('#emailWarning').addClass('text-success');
                }
            }
        };
        xmlhttp.open("get", "checkExist.php?q=" + $.trim($('#email')[0].value) + "&para=email", true);
        xmlhttp.send();
	}
}

function matchPassword() {
	if($('#password')[0].value !== $('#password2')[0].value || $('#password2')[0].value === "") {
		$('#retypePasswordWarning').html(" Two passwords do not match");
		$('#retypePasswordWarning').removeClass('text-success');
		$('#retypePasswordWarning').addClass('text-danger');
		valid = false;
	} else {
		$('#retypePasswordWarning').html(" Passwords match");
		$('#retypePasswordWarning').removeClass('text-danger');
		$('#retypePasswordWarning').addClass('text-success');
	}
}

function validatePassword() {
	var str = $.trim($('#password')[0].value);
	var passwordValid = true;
	if(!(/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(str))){
		$('#passwordWarning').html(" The password should contain both letters and numbers");
		passwordValid = false;
	} else if (str.length < 6) {
		$('#passwordWarning').html(" The password should contain at least 6 characters");
		passwordValid = false;
	} else if (str.length > 15) {
		$('#passwordWarning').html(" The password should contain at most 15 characters");
		passwordValid = false;
	}
	if(passwordValid){
		$('#passwordWarning').html("Valid password")
		$('#passwordWarning').removeClass('text-danger');
		$('#passwordWarning').addClass('text-success');
	} else {
		$('#passwordWarning').removeClass('text-success');
		$('#passwordWarning').addClass('text-danger');
		valid = false;
	}
}

function validate() {
	matchPassword();
	validateEmail();
	validatePassword();
	validateUsername();
	if(valid){
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

// setInterval(validate, 100);
$('#registerForm').on("keyup", "input.validateLocally", validate);
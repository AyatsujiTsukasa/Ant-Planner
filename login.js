$('#loginForm').submit(function (e) {
	e.preventDefault();
	var _this = $(this),
		action = _this.attr("action");
	$.post(action, _this.serialize(), function (data) {
		$('.ajaxMsg').html(data).show();
	});
});

function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "googleSignIn.php");
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onload = function() {
  		$('.ajaxMsg').html(xhr.responseText).show();
	};
	xhr.send("username=" + profile.getName() + "&email=" + profile.getEmail());
}

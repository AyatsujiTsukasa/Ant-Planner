$('#loginButton').on("click", function () {
	var _this = $(this).parent(),
		action = _this.attr("action");
	$.post(action, _this.serialize(), function (data) {
		if(data === "Verified"){
			window.location = 'userhome.html';
		} else {
			$('.ajaxMsg').html(data).show();
		}
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

function enter(e){
    if (e.keyCode === 13) {
        $("#loginButton").click();
    }
}
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

function getCookie(c_name){
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) {
				c_end=document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start,c_end).replace(/\+/g, " "));
		}
	}
	return "";
}

function redirect(){
	if(getCookie('ownerId') !== "" && getCookie('password') !== "" && getCookie('username') !== ""){
		window.location = 'userhome.html';
	}
}

window.onload = redirect;
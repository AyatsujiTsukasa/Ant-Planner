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

$("#usernameSide").html(getCookie("username"));

$('#logOut').on("click", function () {
	clearCookie();
	window.location = 'login.html';
});

$('#changePW').on("click", function () {
	var _this = $(this).parent(),
		action = _this.attr("action");
	$.post(action, _this.serialize()+"&id="+getCookie("ownerId"), function (data) {
		$('.ajaxMsg').html(data).show();
		if(/Password Changed!/.test(data)){
			clearCookie();
			$('#redirect').html("Redirecting to login page...3");
			setTimeout(function () {$('#redirect').html("Redirecting to login page...2");}, 1000);
			setTimeout(function () {$('#redirect').html("Redirecting to login page...1");}, 2000);
			setTimeout(function () {
				$('#redirect').html("Redirecting to login page...0");
				window.location = 'login.html';
			}, 3000);
		}
	});
});

function confirm(e) {
	if (e.keyCode === 13) {
        $("#changePW").click();
    }
}

$(".reset").on("click", function() {
	$("#changePW-form")[0].reset();
})

function clearCookie() {
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++)
		document.cookie=cookies[i].split("=")[0]+"=; path=/";
}

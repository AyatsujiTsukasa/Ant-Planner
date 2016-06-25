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
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++)
		document.cookie=cookies[i].split("=")[0]+"=; path=/";
	window.location = 'login.html';
});

$('#changePW').on("click", function () {

});

$(".reset").on("click", function() {
	$("#changePW-form")[0].reset();
})
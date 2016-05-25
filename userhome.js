function getCookie(c_name){
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) {
				c_end=document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}
$('#welcomeMsg').html("Welcome, " + getCookie("username").replace(/\+/g, " ") + "!");

var importance = 1;
var phoneAlarm = false;
var phonePush = false;
var desktopPush = false;

$(".importance").mousemove(function(event) {
	var starWidth = $(this).width()/3;
	var v = (event.pageX - $(this).offset().left)/starWidth;
	if(v < 1){
		$(this).removeClass("importance2").removeClass("importance3").addClass("importance1");
		importance = 1;
	} else if (v < 2){
		$(this).removeClass("importance1").removeClass("importance3").addClass("importance2");
		importance = 2;
	} else {
		$(this).removeClass("importance2").removeClass("importance1").addClass("importance3");
		importance = 3;
	}
});

// function plan(){
// 	var _html = "<div class='plan'></div>"
// }
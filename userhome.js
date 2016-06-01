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
$("#usernameSide").html(getCookie("username").replace(/\+/g, " "));
$("#usernameBar").html(getCookie("username").replace(/\+/g, " "));
$("#welcomeMsg").html("Hi " + getCookie("username").replace(/\+/g, " ") + "! Have a productive day:)");

function toggleMenu() {
	$(".menu").click(function() {
		$(".sidebar").animate({
    		left: "0rem"
    	}, 100);
    	$(".main").animate({
    		left: "12rem"
    	}, 100);
  	});

  	$(".close-menu").click(function() {
    	$(".sidebar").animate({
    		left: "-12rem"
    	}, 100);
    	$(".main").animate({
    		left: "0rem"
    	}, 100);
    	$(".menu").removeClass("hidden-sm-up");
  	});

  	$(".friends").click(function() {
		$(".friend-list").animate({
    		right: "0rem"
    	}, 100);
    	$(".main").animate({
    		right: "16rem"
    	}, 0);
  	});

  	$(".close-friend").click(function() {
		$(".friend-list").animate({
    		right: "-16rem"
    	}, 100);
    	$(".main").animate({
    		right: "0rem"
    	}, 0);
  	});
}

$(document).ready(toggleMenu);
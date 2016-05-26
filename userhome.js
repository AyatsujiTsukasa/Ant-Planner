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
document.getElementsByName('ownerId')[0].value = getCookie("id");

$(".importance").mousemove(function(event) {
	var starWidth = $(this).width()/3;
	var v = (event.pageX - $(this).offset().left)/starWidth;
	if(v < 1){
		$(this).removeClass("importance2").removeClass("importance3").addClass("importance1");
		$(this).siblings()[0].value = 1;
	} else if (v < 2){
		$(this).removeClass("importance1").removeClass("importance3").addClass("importance2");
		$(this).siblings()[0].value = 2;
	} else {
		$(this).removeClass("importance2").removeClass("importance1").addClass("importance3");
		$(this).siblings()[0].value = 3;
	}
});

$('.reminder').on("click", function() {
	var ele = $(this).siblings()[0];
	ele.value = 1 - ele.value;
	if(ele.value === "1"){
		$(this).removeClass("reminderDisabled").addClass("reminderEnabled");
	} else {
		$(this).removeClass("reminderEnabled").addClass("reminderDisabled");
	}
});

// function plan(){
// 	var _html = "<div class='plan'></div>"
// }

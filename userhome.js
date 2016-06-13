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
$("#welcomeMsg").html("Hi " + getCookie("username").replace(/\+/g, " ") + "! Have a productive day :)");

function toggleMenu() {
	$(".menu").click(function() {
		$(".sidebar").animate({
			left: "0rem"
		}, 100);
		$(".main").animate({
			left: "12rem"
		}, 100);
		$(".menu").hide();
	});

	$(".close-menu").click(function() {
		$(".sidebar").animate({
			left: "-12rem"
		}, 100);
		$(".main").animate({
			left: "0rem"
		}, 100);
		$(".menu").removeClass("hidden-sm-up");
		$(".menu").show();
	});

	$(".friends").click(function() {
		$(".friend-list").animate({
			right: "0rem"
		}, 100);
		$(".main").animate({
			right: "16rem"
		}, 0);
		$(".friends").hide();
	});

	$(".close-friend").click(function() {
		$(".friend-list").animate({
			right: "-16rem"
		}, 100);
		$(".main").animate({
			right: "0rem"
		}, 0);
		$(".friends").removeClass("hidden-md-up");
		$(".friends").show();
	});
}

$(document).ready(toggleMenu);

var planHTML = "<li class='list-group-item'><div class='container-fluid'><form class='planForm' id='planForm' method='post' action='plan.php'><input type='hidden' name='planId' id='planId'><div class='form-group row header'><div class='col-sm-2 planTagHeader' onclick='dropMenu(this)'><p class='planTagHeaderIconDown icon'> Options</p></div><div class='col-sm-10 planName'><input type='hidden' name='importance' value='1' /><input type='hidden' name='ownerId' /><div class='col-sm-9'><input type='text' name='name' class='planName-input form-control' placeholder='Write down your plan' /></div><span class='importance1 importance icon' onmousemove='importanceChange(event, this)'>&nbsp;&nbsp;</span><span class='cancel icon' data-toggle='tooltip' data-placement='bottom' onclick='resetForm(this)' title='Cancel'>&nbsp;&nbsp;</span> <span class='submit icon' data-toggle='tooltip' data-placement='bottom' onclick='submitForm(this)' title='Add'></span></div></div><div class='form-group row planDesc' onmouseenter='planDescMouseenter(this)' onmouseleave='planDescMouseleave(this)'><label for='planDesc' class='col-sm-2 form-control-label planDescIcon icon'> Details</label><div class='col-sm-10'><textarea class='form-control planDesc-input' name='planDesc'></textarea></div></div><div class='form-group row tags' onmouseenter='tagsMouseenter(this)' onmouseleave='tagsMouseleave(this)'><label for='tags' class='col-sm-2 form-control-label newCustomTagIcon icon'> Tag</label><div class='col-sm-10'><input class='form-control tags-input' name='tags' list='commonTags' /><datalist id='commonTags'><option value='Work'><option value='Study'><option value='Family'><option value='Personal'></datalist> </div></div><div class='form-group row due' onmouseenter='dueMouseenter(this)' onmouseleave='dueMouseleave(this)'><label for='due' class='col-sm-2 form-control-label dueTagIcon icon'> Due</label><div class='col-sm-10'><input type='text' name='due' class='form-control dueDateTime due-input' id='datetimepicker' /></div></div><div class='form-group row repeat' onmouseenter='repeatMouseenter(this)' onmouseleave='repeatMouseleave(this)'><label for='repeat' class='col-sm-2 form-control-label repeatTagIcon icon'> Repeat</label><div class='col-sm-10'><select class='form-control c-select repeat-input' name='repeat'><option value='never'>Never</option><option value='day'>Every day</option><option value='week'>Every week</option><option value='month'>Every month</option><option value='year'>Every year</option></select></div></div><div class='form-group row reminderRow' onmouseenter='reminderRowMouseenter(this)' onmouseleave='reminderRowMouseleave(this)'><label for='reminder' class='col-sm-2 form-control-label reminderTagIcon icon'> Reminder</label><div class='col-sm-10'><div class='col-sm-4 phoneAlarm'><input type='hidden' name='phoneAlarm' value='0' /><p class='reminder phoneAlarmIcon icon reminderDisabled' onclick='toggleReminder(this)'> Alarm</p></div><div class='col-sm-4 phonePush'><input type='hidden' name='phonePush' value='0' /><p class='reminder phonePushIcon icon reminderDisabled' onclick='toggleReminder(this)'> Push</p></div><div class='col-sm-4 desktopPush'><input type='hidden' name='desktopPush' value='0' /><p class='reminder desktopPushIcon icon reminderDisabled' onclick='toggleReminder(this)'> Push</p></div></div></div><div class='form-group row url' onmouseenter='urlMouseenter(this)' onmouseleave='urlMouseleave(this)'><label for='url' class='col-sm-2 form-control-label urlTagIcon icon'> Url</label><div class='col-sm-10 url'><input type='url' name='url' class='form-control urlText url-input' /></div></div><div class='form-group row locationRow' onmouseenter='locationRowMouseenter(this)' onmouseleave='locationRowMouseleave(this)'><label for='location' class='col-sm-2 form-control-label locationTagIcon icon'>Location</p></label><div class='col-sm-10 location' onkeyup='searchMap(this)'><input type='text' name='location' class='form-control location-input' /><input type='hidden' name='lat' /><input type='hidden' name='lng' /><ul class='dropDownList list-group'></ul></div><div class='col-sm-10 col-sm-offset-2'><div class='map'><div id='map' style='height:280px'></div></div></div></div></form></div></li>";

$('.btnAddPlan').on("click", function () {
	var newPlan = $(planHTML);
	newPlan.find("#datetimepicker").datetimepicker();
	$('ul.plans').append(newPlan);
	getLocation(newPlan.find("#map")[0]);
});
$('.btnFoldAll').on("click", function () {
	$('.header').siblings().addClass('subHidden');
});
$('.btnUnfoldAll').on("click", function () {
	$('.header').siblings().removeClass('subHidden');
});

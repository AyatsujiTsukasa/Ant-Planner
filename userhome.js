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

var planHTML = "<li class='list-group-item'><div class='container-fluid'><form autocomplete='off' class='planForm' id='planForm' method='post' action='plan.php'><input type='hidden' name='planId' id='planId'><div class='form-group row header'><div class='col-sm-2 planTagHeader' onclick='dropMenu(this)'><p class='planTagHeaderIconDown icon'> Options</p></div><div class='col-sm-10 planName'><input type='hidden' name='importance' value='1' /><input type='hidden' name='ownerId' /><div class='col-sm-9'><input type='text' name='name' class='planName-input form-control' placeholder='Write down your plan' /></div><span class='importance1 importance icon' onmousemove='importanceChange(event, this)'>&nbsp;&nbsp;</span><span class='cancel icon' data-toggle='tooltip' data-placement='bottom' onclick='resetForm(this)' title='Cancel'>&nbsp;&nbsp;</span> <span class='submit icon' data-toggle='tooltip' data-placement='bottom' onclick='submitForm(this)' title='Add'></span></div></div><div class='form-group row planDesc' onmouseenter='planDescMouseenter(this)' onmouseleave='planDescMouseleave(this)'><label for='planDesc' class='col-sm-2 form-control-label planDescIcon icon'> Details</label><div class='col-sm-10'><textarea class='form-control planDesc-input' name='planDesc'></textarea></div></div><div class='form-group row tags' onmouseenter='tagsMouseenter(this)' onmouseleave='tagsMouseleave(this)'><label for='tags' class='col-sm-2 form-control-label newCustomTagIcon icon'> Tag</label><div class='col-sm-10'><select class='form-control c-select tags-input' name='tags'><option value='Work'>Work</option><option value='Study'>Study</option><option value='Family'>Family</option><option value='Personal'>Personal</option></select></div></div><div class='form-group row due' onmouseenter='dueMouseenter(this)' onmouseleave='dueMouseleave(this)'><label for='due' class='col-sm-2 form-control-label dueTagIcon icon'> Due</label><div class='col-sm-10'><input type='text' name='due' class='form-control dueDateTime due-input' id='datetimepicker' /></div></div><div class='form-group row repeat' onmouseenter='repeatMouseenter(this)' onmouseleave='repeatMouseleave(this)'><label for='repeat' class='col-sm-2 form-control-label repeatTagIcon icon'> Repeat</label><div class='col-sm-10'><select class='form-control c-select repeat-input' name='repeat'><option value='never'>Never</option><option value='day'>Every day</option><option value='week'>Every week</option><option value='month'>Every month</option><option value='year'>Every year</option></select></div></div><div class='form-group row reminderRow' onmouseenter='reminderRowMouseenter(this)' onmouseleave='reminderRowMouseleave(this)'><label for='reminder' class='col-sm-2 form-control-label reminderTagIcon icon'> Reminder</label><div class='col-sm-10'><div class='col-sm-4 phoneAlarm'><input type='hidden' name='phoneAlarm' value='0' /><p class='reminder phoneAlarmIcon icon reminderDisabled' onclick='toggleReminder(this)'> Alarm</p></div><div class='col-sm-4 phonePush'><input type='hidden' name='phonePush' value='0' /><p class='reminder phonePushIcon icon reminderDisabled' onclick='toggleReminder(this)'> Push</p></div><div class='col-sm-4 desktopPush'><input type='hidden' name='desktopPush' value='0' /><p class='reminder desktopPushIcon icon reminderDisabled' onclick='toggleReminder(this)'> Push</p></div></div></div><div class='form-group row url' onmouseenter='urlMouseenter(this)' onmouseleave='urlMouseleave(this)'><label for='url' class='col-sm-2 form-control-label urlTagIcon icon'> Url</label><div class='col-sm-10 url'><input type='url' name='url' class='form-control urlText url-input' /></div></div><div class='form-group row locationRow' onmouseenter='locationRowMouseenter(this)' onmouseleave='locationRowMouseleave(this)'><label for='location' class='col-sm-2 form-control-label locationTagIcon icon'>Location</p></label><div class='col-sm-10 location' onkeyup='searchMap(this)'><input type='text' name='location' class='form-control location-input' /><input type='hidden' name='lat' /><input type='hidden' name='lng' /><ul class='dropDownList list-group'></ul></div><div class='col-sm-10 col-sm-offset-2'><div class='map'><div id='map' style='height:280px'></div></div></div></div></form></div></li>";

function addPlan() {
	var newPlan = $(planHTML);
	newPlan.find("#datetimepicker").datetimepicker();
	$('ul.plans').append(newPlan);
    $('html, body').animate({
        scrollTop: $(newPlan).offset().top
    }, 600);
	getLocation(newPlan.find("#map")[0]);
}

$('.btnAddPlan').on("click", addPlan);
$('.btnFoldAll').on("click", function () {
	$('.header').siblings().addClass('subHidden');
});
$('.btnUnfoldAll').on("click", function () {
	$('.header').siblings().removeClass('subHidden');
});
$('.timeTag').on('click', function(){
	if(!/active/.test($(this).attr('class'))){
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
		$(this).parent().val($(this).html());
	}
	sync();
})
$('.btnTag').on('click', function(){
	if(!/activeTag/.test($(this).attr('class'))){
		$(this).addClass('activeTag');
		$(this).siblings().removeClass('activeTag');
		$(this).parent().val($(this).html());
	}
	sync();
})
function sync() {
	if(getCookie('ownerId') === "" || getCookie('password') === "" || getCookie('username') === ""){
		window.location = 'login.html';
	} else {
		$.post("sync.php", {ownerId: getCookie("ownerId"), 
							password: getCookie("password"), 
							tagFilter: $('#tagFilter').val() === "" ? "All" : $('#tagFilter').val(), 
							timeFilter: $('#timeFilter').val() === "" ? "All" : $('#timeFilter').val()}, function(data){
			if(data === "Success"){
				$('.plans').html("");
				syncAll();
			}
		});
	}
}

$('#addFriendSearch').on('keyup', function(){
	var key = $.trim($(this).val());
	if(key !== ""){
		$.post("addFriendSearch.php", {key: key, id: getCookie('ownerId')}, function (data) {
			var results = "";
			var lst = data.split('&');
			for(var i in lst){
				if(lst[i] !== ""){
					var res = lst[i].split("+");
					var btn = "";
					switch (res[1]) {
						case "searchResult_Requested":
						btn = "<div class='extraBtn cancelRequest cursor-pointer' onclick=\"friendAction('" + res[2] + "', 'cancelRequest')\"> Cancel Request</div>";
						break;
						case "searchResult_Friend":
						btn = "<div class='extraBtn deleteFriend cursor-pointer' onclick=\"friendAction('" + res[2] + "', 'deleteFriend')\"> Delete Friend</div>";
						break;
						default:
						btn = "<div class='extraBtn sendRequest cursor-pointer' onclick=\"friendAction('" + res[2] + "', 'sendRequest')\"> Send Request</div>";
					}
					results += "<li class='addFriendSearchResult input-group input-group-sm " + res[1] + "'><span class='input-group-addon'></span><div class='addFriendSearchResultItem'>" + res[0] + "</div>" + btn + "</li>";
				}
			}
			$('#addFriendSearchResults').html(results);
		})
	} else {
		$('#addFriendSearchResults').html("");
	}
})

function share(element) {
	console.log(element);
}

function sendMessage(element) {
	console.log(element);
}

function addFriend(element) {
	$.get("addFriend.php", {id: getCookie('ownerId'), password: getCookie('password'), friendName: $(element).siblings()[0].innerHTML}, sync);
}

function refuse(element) {
	$.get("refuse.php", {id: getCookie('ownerId'), password: getCookie('password'), friendName: $(element).siblings()[0].innerHTML}, sync);
}

function deleteFriend(element) {
	$.get("deleteFriend.php", {id: getCookie('ownerId'), password: getCookie('password'), friendName: $(element).siblings()[0].innerHTML}, sync);
}

function friendAction(Fid, action){
	$.get("friendAction.php", {friendId: Fid, id: getCookie('ownerId'), password: getCookie('password'), action: action}, function () {
		$('#addFriendSearch').trigger('keyup');
		sync();
	});
}

function syncAll() {
	$('#syncLoading').modal('show');
	var numPlans = parseInt(getCookie("numPlans"));
	for (var i=0; i<numPlans; i++) {
		var plan = $(planHTML);s
		plan.find("[name='ownerId']").val(getCookie("ownerId_"+i));
		plan.find("[name='planId']").val(getCookie("planId_"+i));
		plan.find("[name='name']").val(getCookie("name_"+i));
		plan.find("[name='planDesc']").val(getCookie("description_"+i));
		var importanceVal = getCookie("importance_"+i);
		plan.find("[name='importance']").val(importanceVal);
		switch (importanceVal){
			case "1":
				plan.find(".importance").removeClass("importance2").removeClass("importance3").addClass("importance1");
				break;
			case "2":
				plan.find(".importance").removeClass("importance1").removeClass("importance3").addClass("importance2");
				break;
			case "3":
				plan.find(".importance").removeClass("importance1").removeClass("importance2").addClass("importance3");
		}
		var dueVal = getCookie("due_"+i).replace(/\-/g, "/");
		dueVal = dueVal === "0000/00/00 00:00:00" ? "" : dueVal;
		plan.find("[name='due']").val(dueVal);
		var repVal = getCookie("rep_"+i);
		plan.find("[name='repeat']").val(repVal === "0" ? "never" : repVal === "1" ? "day" : repVal === "2" ? "week" : repVal === "3" ? "month" : "year");
		var phoneAlarmVal = getCookie("phoneAlarm_"+i);
		var phonePushVal = getCookie("phonePush_"+i);
		var desktopPushVal = getCookie("desktopPush_"+i);
		if(phoneAlarmVal === "1"){
			plan.find(".phoneAlarmIcon").removeClass("reminderDisabled").addClass("reminderEnabled");
		}
		if(phonePushVal === "1"){
			plan.find(".phonePushIcon").removeClass("reminderDisabled").addClass("reminderEnabled");
		}
		if(desktopPushVal === "1"){
			plan.find(".desktopPushIcon").removeClass("reminderDisabled").addClass("reminderEnabled");
		}
		plan.find("[name='phoneAlarm']").val(phoneAlarmVal);
		plan.find("[name='phonePush']").val(phonePushVal);
		plan.find("[name='desktopPush']").val(desktopPushVal);
		plan.find("[name='url']").val(getCookie("url_"+i));
		var locationVal = getCookie("location_"+i);
		plan.find("[name='location']").val(locationVal);
		var map = undefined;
		var marker = undefined;
		if(locationVal !== ""){
			var latVal = getCookie("lat_"+i);
			var lngVal = getCookie("lng_"+i);
			var latInput = plan.find("[name='lat']");
			var lngInput = plan.find("[name='lng']");
			latInput.val(latVal);
			lngInput.val(lngVal);
			var latlng = new google.maps.LatLng(latVal, lngVal);
			var mapOptions = {
	            center: latlng,
	            zoom: 8,
	            mapTypeId: google.maps.MapTypeId.ROADMAP
	        };
	        map = new google.maps.Map(plan.find("#map")[0], mapOptions);
	        google.maps.event.addListener(map, 'click', function(event){
	            addMarker(event.latLng);
	            latInput.value = event.latLng.lat();
	            lngInput.value = event.latLng.lng();
	        });
	        marker = new google.maps.Marker({
	            position: latlng,
	            map: map,
	            draggable:true
	        });
	        function addMarker(latLng){
	            if(marker != null){
	                marker.setMap(null);
	            }
	            marker = new google.maps.Marker({
	                position: latLng,
	                map: map,
	                draggable:true
	            });
	        }
	        function addMarker(latLng){       
                if(marker != null){
                    marker.setMap(null);
                }
                marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    draggable:true
                });
            }
		}
		plan.find("[name='tags']").val(getCookie("tags_"+i));
		plan.find("#datetimepicker").datetimepicker();
		$('ul.plans').append(plan);
		if(locationVal !== ""){
			google.maps.event.trigger(map, 'resize');
			map.panTo(marker.getPosition());
		}
	}
	friendHTML = "";
	requestHTML = "";
	var friends = getCookie("friends").split("&");
	for(var i in friends){
		if(friends[i] !== "") {
			friendHTML += "<li class='friendItem input-group'><div class='friend'>" + friends[i] + "</div><div class='btn btn-share friendBtn' onclick='share(this)' data-toggle='tooltip' data-placement='bottom' title='Share plans'><span class='shareIcon'></span></div><div class='btn btn-msg friendBtn' onclick='sendMessage(this)' data-toggle='tooltip' data-placement='bottom' title='Send messages'><span class='messageIcon'></span></div><div class='btn btn-delete friendBtn' onclick='deleteFriend(this)' data-toggle='tooltip' data-placement='bottom' title='Delete friend'><span class='deleteIcon'></span></div></li>";
		}
	}
	var requests = getCookie("requests").split("&");
	for(var i in requests){
		if(requests[i] !== ""){
			requestHTML += "<li class='friendItem input-group'><div class='friend'>" + requests[i] + "</div><div class='btn btn-add pendingBtn' onclick='addFriend(this)' data-toggle='tooltip' data-placement='bottom' title='Add Friend'><span class='addIcon'></span></div><div class='btn btn-refuse pendingBtn' onclick='refuse(this)' data-toggle='tooltip' data-placement='bottom' title='Refuse'><span class='refuseIcon'></span></div></li>";
		}
	}
	$('#friendsPart').html(friendHTML);
	$('#pendingPart').html(requestHTML);
	$('#syncLoading').modal('hide');
}

// Initialization

$("#usernameBar").html(getCookie("username"));
$("#welcomeMsg").html("Hi " + getCookie("username") + "! Have a productive day :)");
$(document).ready(toggleMenu);
sync();
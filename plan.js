function getCookie (c_name) {
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

function importanceChange (event, ele) {
    var starWidth = $(ele).width()/3;
    var v = (event.pageX - $(ele).offset().left)/starWidth;
    if(v < 1){
        $(ele).removeClass("importance2").removeClass("importance3").addClass("importance1");
        $(ele).siblings()[0].value = 1;
    } else if (v < 2){
        $(ele).removeClass("importance1").removeClass("importance3").addClass("importance2");
        $(ele).siblings()[0].value = 2;
    } else {
        $(ele).removeClass("importance2").removeClass("importance1").addClass("importance3");
        $(ele).siblings()[0].value = 3;
    }
}

function toggleReminder (ele) {
    var element = $(ele).siblings()[0];
    element.value = 1 - element.value;
    if(element.value === "1"){
        $(ele).removeClass("reminderDisabled").addClass("reminderEnabled");
    } else {
        $(ele).removeClass("reminderEnabled").addClass("reminderDisabled");
    }
}

function dropMenu (ele) {
	var sib = $(ele).parent().siblings();
    if(/subHidden/.test(sib.attr("class"))){
        sib.removeClass("subHidden");
        $(ele).children().removeClass("planTagHeaderIconDown").addClass("planTagHeaderIconUp");
    } else {
        sib.addClass("subHidden");
        $(ele).children().removeClass("planTagHeaderIconUp").addClass("planTagHeaderIconDown");
    }
}

function searchMap (ele) {
    test = ele;
    url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + $(ele).children().val();
    var xhr = new XMLHttpRequest();
    var _ele = $(ele);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            try {
                if(this.status == 0) {
                    throw('Status = 0');
                }
                res = jQuery.trim(this.responseText).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                response = JSON.parse(res);
                var lst = response.results.slice(0, 5);
                _ele.children()[1].innerHTML = lst.map(function(x){return mapchoice(x.formatted_address, x.geometry.location.lat, x.geometry.location.lng);}).join("");
            } catch (e) {
                console.log(e);
            }
        }
    }
    try {
        xhr.open("get", url, true);
        xhr.send("");
    }
    catch(e){
        console.log(e);
    }
}

function initializeMap(ele){
	var mapOptions = {
    	center: new google.maps.LatLng(ele.getAttribute('lat'), ele.getAttribute('lng')),
    	zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(ele.parentElement.parentElement.parentElement.nextElementSibling.children[0].children[0], mapOptions);
    ele.parentElement.parentElement.innerHTML = "";
}

function mapchoice(name, lat, lng) {
	return "<li class='list-group-item'><div class='mapChoice', onclick=initializeMap(this) lat='" + lat + "', lng='" + lng + "'>" + name + "</div></li>";
}

function planDescMouseenter(ele){
    $(ele).addClass("planDesc-active");
    $(ele).children().children().addClass("planDesc-active-input");
}
function planDescMouseleave(ele){
    $(ele).removeClass("planDesc-active");
    $(ele).children().children().removeClass("planDesc-active-input");
}


function tagsMouseenter(ele){
    $(ele).addClass("tags-active");
    $(ele).children().children().addClass("tags-active-input");
}
function tagsMouseleave(ele){
    $(ele).removeClass("tags-active");
    $(ele).children().children().removeClass("tags-active-input");
}


function dueMouseenter(ele){
    $(ele).addClass("due-active");
    $(ele).children().children().addClass("due-active-input");
}
function dueMouseleave(ele){
    $(ele).removeClass("due-active");
    $(ele).children().children().removeClass("due-active-input");
}


function repeatMouseenter(ele){
    $(ele).addClass("repeat-active");
    $(ele).children().children().addClass("repeat-active-input");
}
function repeatMouseleave(ele){
    $(ele).removeClass("repeat-active");
    $(ele).children().children().removeClass("repeat-active-input");
}


function reminderRowMouseenter(ele){
    $(ele).addClass("reminderTagIcon-active");
}
function reminderRowMouseleave(ele){
    $(ele).removeClass("reminderTagIcon-active");
}


function urlMouseenter(ele){
    $(ele).addClass("url-active");
    $(ele).children().children().addClass("url-active-input");
}
function urlMouseleave(ele){
    $(ele).removeClass("url-active");
    $(ele).children().children().removeClass("url-active-input");
}


function locationRowMouseenter(ele){
    $(ele).addClass("locationTagIcon-active");
    $(ele).children().children().addClass("location-active-input");
}
function locationRowMouseleave(ele){
    $(ele).removeClass("locationTagIcon-active");
    $(ele).children().children().removeClass("location-active-input");
}

var test = undefined;
function resetForm(ele) {
    $(ele).parent().parent().parent()[0].reset();
}

function submitForm(ele) {
    test = ele;
    $(document.getElementsByName('ownerId')).val(getCookie("id"));
    $(ele).parent().parent().parent()[0].submit();
}
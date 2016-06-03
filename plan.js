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
        $(this).modal();
    } else {
        $(this).removeClass("reminderEnabled").addClass("reminderDisabled");
    }
});

$('.planTagHeader').on("click", function() {
	var sib = $(this).parent().siblings();
	if(/subHidden/.test(sib.attr("class"))){
		sib.removeClass("subHidden");
		$(this).children().removeClass("planTagHeaderIconDown").addClass("planTagHeaderIconUp");
	} else {
		sib.addClass("subHidden");
		$(this).children().removeClass("planTagHeaderIconUp").addClass("planTagHeaderIconDown");
	}
});

$('.location').on("keyup", function () {
	url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + $(this).children().val();
	var xhr = new XMLHttpRequest();
	var _this = $(this);
    xhr.onreadystatechange = function () {
    	if (this.readyState == 4) {
	        try {
	            if(this.status == 0) {
	                throw('Status = 0');
	            }
	            res = jQuery.trim(this.responseText).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	            response = JSON.parse(res);
	            var lst = response.results.slice(0, 5);
	            _this.children()[1].innerHTML = lst.map(function(x){return mapchoice(x.formatted_address, x.geometry.location.lat, x.geometry.location.lng);}).join("");
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
});

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

$(".planDesc").on({
    mouseenter: function(){
        $(".planDesc").addClass("planDesc-active");
        $(".planDesc-input").addClass("planDesc-active-input");
    },
    mouseleave: function(){
        $(".planDesc").removeClass("planDesc-active");
        $(".planDesc-input").removeClass("planDesc-active-input");
    },
});

$(".tags").on({
    mouseenter: function(){
        $(".tags").addClass("tags-active");
        $(".tags-input").addClass("tags-active-input");
    },
    mouseleave: function(){
        $(".tags").removeClass("tags-active");
        $(".tags-input").removeClass("tags-active-input");
    },
});

$(".due").on({
    mouseenter: function(){
        $(".due").addClass("due-active");
        $(".due-input").addClass("due-active-input");
    },
    mouseleave: function(){
        $(".due").removeClass("due-active");
        $(".due-input").removeClass("due-active-input");
    },
});

$(".repeat").on({
    mouseenter: function(){
        $(".repeat").addClass("repeat-active");
        $(".repeat-input").addClass("repeat-active-input");
    },
    mouseleave: function(){
        $(".repeat").removeClass("repeat-active");
        $(".repeat-input").removeClass("repeat-active-input");
    },
});

$(".reminderRow").on({
    mouseenter: function(){
        $(".reminderTagIcon").addClass("reminderTagIcon-active");
    },
    mouseleave: function(){
        $(".reminderTagIcon").removeClass("reminderTagIcon-active");
    },
});

$(".url").on({
    mouseenter: function(){
        $(".url").addClass("url-active");
        $(".url-input").addClass("url-active-input");
    },
    mouseleave: function(){
        $(".url").removeClass("url-active");
        $(".url-input").removeClass("url-active-input");
    },
});

$(".locationRow").on({
    mouseenter: function(){
        $(".locationTagIcon").addClass("locationTagIcon-active");
        $(".location-input").addClass("location-active-input");
    },
    mouseleave: function(){
        $(".locationTagIcon").removeClass("locationTagIcon-active");
        $(".location-input").removeClass("location-active-input");
    },
});

$(".cancel").on("click", function() {
    document.getElementById("planForm").reset();
});

$(".submit").on("click", function() {
    document.getElementsByName('ownerId')[0].value = getCookie("id");
    document.getElementById("planForm").submit();
});

$(function () {
     $('#datetimepicker').datetimepicker();
});
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

function getLocation(ele) {
    if (navigator.geolocation) {
        var latInput = ele.parentElement.parentElement.previousElementSibling.children[1];
        var lngInput = latInput.nextElementSibling;
        navigator.geolocation.getCurrentPosition(function (position) {
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            latInput.value = position.coords.latitude;
            lngInput.value = position.coords.longitude;
            var mapOptions = {
                center: latlng,
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(ele, mapOptions);
            google.maps.event.trigger(map, 'resize');
            google.maps.event.addListener(map, 'click', function(event){
                addMarker(event.latLng);
                latInput.value = event.latLng.lat();
                lngInput.value = event.latLng.lng();
            });
            var marker = new google.maps.Marker({
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
        });
    }
}

function searchMap (ele) {
    var adr = $.trim($(ele).children().val());
    if(adr !== ""){
        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + adr;
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
                    _ele.children()[3].innerHTML = lst.map(function(x){return mapchoice(x.formatted_address, x.geometry.location.lat, x.geometry.location.lng);}).join("");
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
}

function initializeMap(ele){
    ele.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.value = ele.innerHTML;
    var latlng = new google.maps.LatLng(ele.getAttribute('lat'), ele.getAttribute('lng'));
    var lngInput = ele.parentElement.parentElement.previousElementSibling;
    var latInput = lngInput.previousElementSibling;
    latInput.value = ele.getAttribute('lat');
    lngInput.value = ele.getAttribute('lng');
	var mapOptions = {
    	center: latlng,
    	zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(ele.parentElement.parentElement.parentElement.nextElementSibling.children[0].children[0], mapOptions);
    google.maps.event.trigger(map, 'resize');
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        draggable:true
    });
    google.maps.event.addListener(map, 'click', function(event){
        addMarker(event.latLng);
        latInput.value = event.latLng.lat();
        lngInput.value = event.latLng.lng();
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

function resetForm(ele) {
    $(ele).parent().parent().parent().parent().parent().remove();
}

function submitForm(ele) {
    if($.trim($(ele).prev().prev().prev().children().val()) !== ""){
        var form = $(ele).parent().parent().parent();
        $(document.getElementsByName('ownerId')).val(getCookie("ownerId"));
        var action = form.attr("action");
        $.post(action, form.serialize());
    } else {
        alert("The name of this plan is empty.");
    }
}
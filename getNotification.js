var notifID = undefined;

function setNotification() {
    requestPermission();
	if (notifID !== undefined) {
		clearInterval(notifID);
	}
	$.post("getNotification.php", {ownerId: getCookie("ownerId"),
							password: getCookie("password")}, function(data){
		if(data !== "No plan"){
			var nextDuePlan = JSON.parse(data);
			callNotification(nextDuePlan.name, nextDuePlan.due, nextDuePlan.reminder);
		}
	});
}

function callNotification(name, due, reminder) {
	var notificationTime = Date.parse(reminder);
	var current = new Date();
	var diff = notificationTime - current.getTime();
	notifID = setInterval(function(){
        current = new Date();
        diff = notificationTime - current.getTime();
        if (diff <= 0) {
            showNotificatioin("Reminder: " + name, "Due: " + due);
            music();
            clearInterval(notifID);
            setNotification();
        }
    }, 60000);
}

var audio = $("#audio")[0]; 

function music() {
    audio.play();
    setTimeout("audio.pause()", 5000);
}

function requestPermission(){
    if (Notification) {
        Notification.requestPermission();
    }
}

function showNotificatioin(title, body){
    var options = {body: body, icon: "Images/AntPlannerIcon.png", tag: "dueNotification"};
    if (Notification) {
        requestPermission();
        if (Notification.permission === "granted") {
            notify = new Notification(title, options);
        }
    }
}
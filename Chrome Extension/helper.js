$('#signUp').on('click', function () {
	chrome.tabs.create({'url':'https://www.antplanner.org/register.html', 'selected':true});
})
$('#toMainPage').on('click', function () {
	chrome.tabs.create({'url':'https://www.antplanner.org', 'selected':true});
})

function signIn() {
	if(password !== "" && (username !== "" || email !== "")){
		$('.main').html("<p style='line-height: 200px; margin: 0px; text-align: center;'>Signing in, Please wait...</p>");
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "https://www.antplanner.org/crxLogin.php?username="+username+"&password="+password+"&email="+email, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
		    	if(xhr.responseText !== "Not verified"){
		    		loadPlans(JSON.parse(xhr.responseText));
		    	}
			}
		}
		xhr.send();
	}
}

function planFrame(planObj) {
	var a_head = "",
		a_tail = "";
	if(planObj.url !== ""){
		a_head = "<a href='"+planObj.url+"'>";
		a_tail = "</a>";
	}
	var rep = "";
	switch(planObj.rep){
		case "1":
		rep = "Every Day";
		break;
		case "2":
		rep = "Every Week";
		break;
		case "3":
		rep = "Every Month";
		break;
		case "4":
		rep = "Every Year";
		break;
		default:
		break;
	}
	rep = rep === "" ? "" : "<p class='repeat'>Repeat: "+rep+"</p>";
	return "<div class='plan'>"+a_head+"<p class='planName "+planObj.customTags+"'>"+planObj.name+"</p>"+a_tail+"<p class='due'>"+planObj.due+"</p>"+rep+"</div>";
}

function tagFilter(type) {
	return "<div class='tagFilter'><p class='"+type+"'></p><p>"+type+"</p></div>";
}

function loadPlans(response) {
	test = response;
	var plans = "";
	for(var i in response){
		plans += planFrame(response[i]);
	}
	var head = tagFilter('Personal') + tagFilter('Work') + tagFilter('Family') + tagFilter('Study');
	$('.main').html(head + plans);
}

//Initialization

var username = "",
	email = "",
	password = "";

chrome.cookies.getAll({"url": "https://www.antplanner.org"}, function (cookie) {

	// Get cookies from antplanner.org
	for(var i in cookie){
		switch(cookie[i].name){
			case "username":
			username = cookie[i].value.replace(/\+/g, " ");
			break;
			case "password":
			password = cookie[i].value.replace(/\+/g, " ");
			break;
			default:
			break;
		}
	}
	// And sign in
	signIn();
});
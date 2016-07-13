function initialze() {
	$('#signUp').on('click', function () {
		chrome.tabs.create({'url':'https://www.antplanner.org/register.html', 'selected':true});
	});
	$('#toMainPage').on('click', function () {
		chrome.tabs.create({'url':'https://www.antplanner.org', 'selected':true});
	});
	$('#signIn').on('click', function () {
		var form = $("<div style='padding:5px'><input type='text' name='email' id='email' placeholder='Email'><input type='password' id='password' name='password' placeholder='Password'><br/><input type='checkbox' checked='checked' id='remember' name='remember'><label for='remember'>Remember Me</label><br/><input type='button' value='Login' id='loginButton'></div>");
		$('.main').html(form);
		form.on('keydown', function (event) {
			if (event.keyCode === 13) {
		        $("#loginButton").click();
		    }
		})
		$("#loginButton").on('click', function () {
			email = $('#email').val();
			password = $('#password').val();
			if($('#remember').is(':checked')){
				chrome.cookies.set({"url": "https://www.antplanner.org", "name": "email", "value": email, "expirationDate": (new Date().getTime()/1000) + 3600*24*30});
				chrome.cookies.set({"url": "https://www.antplanner.org", "name": "password", "value": password, "expirationDate": (new Date().getTime()/1000) + 3600*24*30});
			}
			signIn();
		});
	});
}

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
	return "<div class='plan'>"+a_head+"<p class='planName "+planObj.customTags+"'>"+" "+planObj.name+"</p>"+a_tail+"<p class='due'>"+planObj.due+"</p>"+rep+"</div>";
}

function tagFilter(type) {
	return "<div class='tagFilter'><p class='"+type+"'></p><p>"+type+"</p></div>";
}

function loadPlans(response) {
	var plans = "";
	ownerId = response.ownerId;
	username = response.username;
	chrome.cookies.set({"url": "https://www.antplanner.org", "name": "username", "value": username, "expirationDate": (new Date().getTime()/1000) + 3600*24*30});
			chrome.cookies.set({"url": "https://www.antplanner.org", "name": "ownerId", "value": ownerId, "expirationDate": (new Date().getTime()/1000) + 3600*24*30});
	var planArr = response.contents;
	for(var i in planArr){
		plans += planFrame(planArr[i]);
	}
	var head = tagFilter('Personal') + tagFilter('Work') + tagFilter('Family') + tagFilter('Study');
	var btn1 = planArr.length > 0 ? "Manage My Plans" : "Add My First Plan";
	var tail = "<div style='padding-left: 5px'><p id='toUserhome' style='cursor:pointer'>"+btn1+"</p><p id='logOut' style='cursor:pointer'>Log Out</p></div>";
	$('.main').html(head + plans + tail);
	$('#toUserhome').on('click', function () {
		chrome.tabs.create({'url':'https://www.antplanner.org/userhome.html', 'selected':true});
	});
	$('#logOut').on('click', function () {
		chrome.cookies.remove({"url": "https://www.antplanner.org", "name": "username"});
		chrome.cookies.remove({"url": "https://www.antplanner.org", "name": "password"});
		chrome.cookies.remove({"url": "https://www.antplanner.org", "name": "email"});
		chrome.cookies.remove({"url": "https://www.antplanner.org", "name": "ownerId"});
		$('.main').html("<button id='toMainPage'>Go to Ant Planner</button><button id='signUp'>To Sign Up Page</button><button id='signIn'>Sign In</button>");
		initialze();
	})
}

//Initialization

var username = "",
	email = "",
	password = "",
	ownerId = "";

chrome.cookies.getAll({"url": "https://www.antplanner.org"}, function (cookie) {

	// Get cookies from antplanner.org
	for(var i in cookie){
		switch(cookie[i].name){
			case "username":
			username = cookie[i].value.replace(/\+/g, " ");
			break;
			case "email":
			email = cookie[i].value.replace(/\+/g, " ");
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

initialze();
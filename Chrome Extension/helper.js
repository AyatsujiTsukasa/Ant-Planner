(function() {
        document.getElementById("toMainPage").onclick = function() { 
        	chrome.tabs.create({'url':'https://www.antplanner.org', 'selected':true});
        };
})();

$('#signUp').on('click', function () {
	chrome.tabs.create({'url':'https://www.antplanner.org/register.html', 'selected':true});
})
(function() {
        document.getElementById("toMainPage").onclick = function() { 
        	chrome.tabs.create({'url':'https://www.antplanner.org', 'selected':true});
        };
})();
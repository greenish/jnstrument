chrome.tabs.query({currentWindow:true, active:true}, function(result){
	var tab=result[0];
	var bgPage=chrome.extension.getBackgroundPage();
	var activateLink=document.getElementById("activate");
	var deactivateLink=document.getElementById("deactivate");
	var gotoLink=document.getElementById("open");
	var https;
	var checkLink = function(){
		if(!window.Proxy) {
			document.body.setAttribute("class", "flags");
			return;
		}
		else if(tab.url.match(/^https/)) {
			document.body.setAttribute("class", "https");
			return;
		}
		var status = bgPage.jnstrument.tabStatus(tab);
		if(status && status.status) {
			document.body.setAttribute("class", "active");
		}
		else {
			document.body.setAttribute("class", "deactive");
		}
	}
	var openVisualization = function(){
		var status = bgPage.jnstrument.tabStatus(tab);
		if(!status || !status.status) return;
		chrome.windows.create({'url': "http://jnstrument.com/"+status.guid+"/neuron"});
	}
	var activate = function(){
		bgPage.jnstrument.activate(tab);
		checkLink();
		openVisualization();
	}

	checkLink();

	activateLink.addEventListener("click", activate);
	deactivateLink.addEventListener("click", activate);

	gotoLink.addEventListener("click", function(){
		openVisualization();
	});

	window.addEventListener("blur", function(){
		window.close();
	})


});
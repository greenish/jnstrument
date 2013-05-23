new (function jnstrument(){
/////////////////////////////////////////////////////////////
	var tabs = {};
/////////////////////////////////////////////////////////////
	chrome.browserAction.onClicked.addListener(function(tab) {
		if(tabs[tab.id] && tabs[tab.id].status) deactivateTab(tab.id);
		else activateTab(tab.id);
	});
/////////////////////////////////////////////////////////////
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if(tabs[sender.tab.id] && tabs[sender.tab.id].status) sendResponse({
			action : "enable",
			guid : tabs[sender.tab.id].guid
		});
	});
/////////////////////////////////////////////////////////////
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		var icon = tabs[tabId] && tabs[tabId].status ? 
			"active.png":
			"inactive.png";
		chrome.browserAction.setIcon({
			path:icon,
			tabId:tabId
		});
	});
/////////////////////////////////////////////////////////////
	chrome.debugger.onDetach.addListener(function(debuggee){
		deactivateTab(debuggee.tabId);
	});
/////////////////////////////////////////////////////////////
	chrome.debugger.onEvent.addListener(function(debuggee, method, data){
		if(method !=="Debugger.scriptParsed") return;
		if(data.url.search("^(http://|https://|file://|localhost:).*")<0) return; // only instrument scripts from the website.. not from scripts sent from chrome.
		if(data.url.search(/pca__ProxyInstrumentES5\.js/) >= 0) return;
		
		var instrument="if(window.__pca__) __pca__.liner(this, arguments);";

		chrome.debugger.sendCommand(debuggee, "Debugger.getScriptSource",{scriptId: data.scriptId }, function(result){
			var instrumentedScript=result.scriptSource.replace(
					/(function[\s\n\r\t]*([$A-Za-z_][A-Za-z_0-9$]*)?[\s\n\r\t]*\(([\s\n\r\t]*([$A-Za-z_][\w$]*)?[\s\n\r\t]*,?)*\)[\s\n\r\t]*{)/g,
					"$1 "+instrument);

			//chrome.tabs.executeScript(priv.debuggee.tabId, {code:niceScript},function(response){console.log(response)});
			chrome.debugger.sendCommand(debuggee,"Runtime.evaluate",{expression:instrumentedScript},function(response){if(response.thrown)console.log(response)});
		});
	});
/////////////////////////////////////////////////////////////
	var activateTab = function(tabId){
		// try{
		// 	chrome.debugger.detach({tabId:tabId});
		// } catch(e){};		
		// chrome.debugger.attach({tabId:tabId}, "1.0", function(){
		// 	chrome.debugger.sendCommand({tabId:tabId}, "Debugger.enable");
		// });

		if(tabs[tabId]) tabs[tabId].status = true;
		else tabs[tabId] = {
			guid: createGuid(),
			status : true
		};

		chrome.tabs.sendMessage(tabId, {
			action: "enable", 
			guid : tabs[tabId].guid
		});

		chrome.browserAction.setIcon({
			path:"active.png",
			tabId:tabId
		});
	}
/////////////////////////////////////////////////////////////
	var deactivateTab = function(tabId){
		tabId = typeof(tabId) == "object" ?
			tabId.tabId:
			tabId;
		chrome.tabs.sendMessage(tabId, {
			action: "disable"
		});
		tabs[tabId].status = false;
		// try{
		// 	chrome.debugger.detach({tabId:tabId});
		// } catch(e){};
		chrome.browserAction.setIcon({
			path:"inactive.png",
			tabId:tabId
		});
	}
/////////////////////////////////////////////////////////////
	var createGuid = function (){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-pxxxxcxxxxxa'.replace(/[xy]/g, function(c) {
	    	var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	    	return v.toString(16);
		});
	}
/////////////////////////////////////////////////////////////
})();

	// var trueInject = function(tabId, details, callback){
	// 	if(details.file) { 
	// 		details.code="document.body.appendChild(document.createElement('script')).src='"+details.file+"';";
	// 		delete details.file;
	// 	}
	// 	else {
	// 		details.code = "document.body.appendChild(document.createElement('script')).innerHTML='"+details.code+"';";
	// 	}
	// 	chrome.tabs.executeScript(tabId, details, callback);
	// } 

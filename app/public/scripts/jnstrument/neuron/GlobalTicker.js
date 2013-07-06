(function(undefined) {	
	var GlobalTicker = function(){
/*/////////////////////////////////////////////////////////////////////////////
	Private Properties
/*/////////////////////////////////////////////////////////////////////////////
		var frameRate={};
		var ticks = 0;
/*/////////////////////////////////////////////////////////////////////////////
	Private Methods
/*/////////////////////////////////////////////////////////////////////////////
		var showFrameRate = function(now) {
			now = Math.floor(now/1000);
			frameRate[now] = frameRate[now]+1 || 1;
			if(frameRate[now-1]) {
				console.log(frameRate[now-1]);
				delete frameRate[now-1];
			}
		}
/*/////////////////////////////////////////////////////////////////////////////
	Public Methods
/*/////////////////////////////////////////////////////////////////////////////
		this.tick = (function(data, answer, now){
			ticks++;
			if(ticks%2 != 0) return;
			this.emitEvent(undefined, undefined, "calculate");
			this.emitEvent(undefined, undefined, "update");
			this.emitEvent(undefined, undefined, "render");
			showFrameRate(now);
		}).bind(this);
///////////////////////////////////////////////////////////////////////////////
		$(window).resize(function(e){
			this.emitEvent(e, undefined, "resize");
		}.bind(this));
///////////////////////////////////////////////////////////////////////////////
		$(window).click(function(e){
			e.preventDefault();
			this.emitEvent(e, undefined, "click");
		}.bind(this));
///////////////////////////////////////////////////////////////////////////////
	}
///////////////////////////////////////////////////////////////////////////////
	module.exports = require("./eventEmitter.js").extend(GlobalTicker);
})()
(function($, THREE, window, document, undefined) {	
	var GlobalTicker = function(){
/*/////////////////////////////////////////////////////////////////////////////
	Private Properties
/*/////////////////////////////////////////////////////////////////////////////
		var that;
		var frameRate={};
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
		this.construct = function(){
			this.name="GlobalTicker";
			// that = this;		
			// this._super();
		}
///////////////////////////////////////////////////////////////////////////////
		this.tick = function(now){
			if(this.ticks%2 != 0) return;
			this.triggerTick();
			//showFrameRate(now);
		}
///////////////////////////////////////////////////////////////////////////////
	}
///////////////////////////////////////////////////////////////////////////////
	module.exports = require("./tickable.js").extend(require("./ticker.js")).extend(GlobalTicker);
})(jQuery, THREE, window, document)
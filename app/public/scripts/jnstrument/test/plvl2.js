(function($, THREE, window, document, undefined) {	
	var lvl2 = function(){

		this.construct = function(){
			//console.log("lvl2");
			this._super();
		}
		this.blub = function(){
			this._super();

		}		
		this.bla = function(){
			this._super();

		}
		this.plp = function(){
			this._super();

		}
		var haha;
		this.lvl2 = function(){

		}
	}
	module.exports = require("./plvl1.js").extend(lvl2)
})(jQuery, THREE, window, document)
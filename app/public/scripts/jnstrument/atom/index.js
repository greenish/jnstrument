(function($, THREE, window, document, undefined) {	
	var index = function(){			
		var socket = 		new (require("./Socket.js"))('127.0.0.1:8000');
		var loop = 			new (require("./Loop.js"))();
		var atom = 			new (require("./Atom.js"))(socket, loop);
		atom.initialize($("#scene"));
	}
///////////////////////////////////////////////////////////////////////////////	

///////////////////////////////////////////////////////////////////////////////
	$(document).ready(function(){
		index(); // Start
	});
})(jQuery, THREE, window, document)
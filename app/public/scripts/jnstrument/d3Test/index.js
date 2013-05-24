(function($, d3, window, document, undefined) {	
	var d3Test = function(){
		var eventHandler = require("../eventHandler.js")('127.0.0.1:8000');
		
		var dataStore = {};

		var width = 500,
		    height = 500;

		var svg = d3.select("body").append("svg")
		    .attr("width", width)
		    .attr("height", height)
		  .append("g")
		    .attr("transform", "translate(0,0)");

		eventHandler.addListener("all",function (data){
			data = normalize(data);
			var circle = svg.selectAll("circle")
				.data(data, function(d){ 
					return d.id;
				})
				.attr("fill", function(d){
					if(!d.new) return "#000";
					d.new=false;
					return "#f00";
				});
			
			circle.enter().append("circle")
				.attr("r", 5)
				.attr("cy", function() {
		  			return (Math.random() * height);
				})
		  		.attr("cx", function() {
		  			return Math.random() * width;
				})
				.attr("fill", "#f00");

			circle.exit()
				.attr("fill", "#f00");
				// .remove();
		});
		var normalize = function(data){
			dataStore[data.id]=data;
			dataStore[data.id].new = true;

			return $.map(dataStore, function(v, k){return v;});

		}
	}
	module.exports = function(){
		return new d3Test();
	}	
})(jQuery, d3, window, document)
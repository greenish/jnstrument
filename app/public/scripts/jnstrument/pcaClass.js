(function(){
	// pcaClass Module by Philipp Adrian philippadrian.com
	// Based on:

	/* Simple JavaScript Inheritance
	 * By John Resig http://ejohn.org/
	 * MIT Licensed.
	 * 
	 * Inspired by base2 and Prototype
	 */
	var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

	// The base Class implementation (does nothing)
	this.Class = function(){};

	// Create a new Class that inherits from this class
	Class._extend = function(prop) {
		var _super = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for (var name in prop) {
			// Check if we're overwriting an existing function
			prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ?
				(function(name, fn){
					return function() {
						var tmp = this._super;

						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = _super[name];

						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						var ret = fn.apply(this, arguments);        
						this._super = tmp;

						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}

		// The dummy class constructor
		function Class() {
			// All construction is actually done in the init method
			if( initializing ) return
			if( this._abstract ) throw("Abstract class may not be constructed"); //pca
			else if( this.construct ) this.construct.apply(this, arguments);
		}

		// Populate our constructed prototype object
		Class.prototype = prototype;

		// Enforce the constructor to be what we expect
		Class.prototype.constructor = Class;

		// And make this class extendable
		Class._extend = arguments.callee;

		return Class;
	};

	var extend = function(newClass){
		this.prototype._abstract=false;
		return this._extend(newClass);		
	}
	var abstract = function(newClass){
		newClass.prototype._abstract= true;
		return this.extend(newClass);
	}
	var pcaClass = function(newClass){
		newClass = Class._extend(newClass);
		newClass.extend = extend.bind(newClass);
		newClass.extend.abstract = abstract.bind(newClass);
		return newClass;
	}
	pcaClass.abstract = function(newClass) {
		newClass.prototype._abstract= true;
		return pcaClass(newClass);
	}
	pcaClass.extend = function(abstractClass, extendingClass) {
		return typeof(abstractClass.extend) === "function" ?
			abstractClass.extend(extendingClass):
			pcaClass(abstractClass).extend(extendingClass);
	}

	module.exports = pcaClass;
})();
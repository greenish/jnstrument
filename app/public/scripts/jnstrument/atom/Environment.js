(function($, THREE, window, document, undefined) {	
	var Environment = function(container){
/*/////////////////////////////////////////////////////////////////////////////
	Private Properties
/*/////////////////////////////////////////////////////////////////////////////

/*/////////////////////////////////////////////////////////////////////////////
	Public Properties
/*/////////////////////////////////////////////////////////////////////////////
		this.renderer;
		this.scene;
		this.camera;
		this.height;
		this.width;
/*/////////////////////////////////////////////////////////////////////////////
	Private Methods
/*/////////////////////////////////////////////////////////////////////////////
/*/////////////////////////////////////////////////////////////////////////////
	Public Methods
/*/////////////////////////////////////////////////////////////////////////////
		this.construct  = function(_container){
			var container = $(_container);
			this.width = container.innerWidth();
			this.height = container.innerHeight();			
			this.scene = new THREE.Scene();
			this.camera = new THREE.OrthographicCamera( 0, this.width, 0, this.height, 1, 1000);
			this.renderer = new THREE.WebGLRenderer();

			this.camera.position.z = 300;
			this.scene.add(this.camera);
			this.renderer.setSize(this.width, this.height); 
			container.append(this.renderer.domElement);
		}
///////////////////////////////////////////////////////////////////////////////	
		this.tick = function() {
			this.renderer.render(this.scene, this.camera);
		}
	}
///////////////////////////////////////////////////////////////////////////////	
	module.exports = require("../Class.js").extend(Environment);
})(jQuery, THREE, window, document)
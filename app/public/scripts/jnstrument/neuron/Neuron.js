(function($, THREE, window, document, undefined) {	
	var config = require("../config.js");
	var curtain = function(){
		var globalTick, world, loop, socket, that;
		var elementData = new (require("./ObjectStore"));
		var senderId;
		var shaders = require("./shaders.js");
		var	mapEase = require("./mapEase.js");
		var projector = new THREE.Projector();
		var background;
		var composer;
		var composerActive;
		var composerBlur;
		var activeId;

		var mouse;

		//var materialDot = new THREE.MeshBasicMaterial({color:config.colors.normalDots, transparent:true, opacity:0.4});
		//var materialDot = new THREE.ParticleBasicMaterial({size:config.neuron.fE.minRadius*config.neuron.fE.minRadius*Math.PI, color:config.colors.normalDots, transparent:true, opacity:0.4});
		var attributes = {
			lerpAlpha : {type:"f", value:[]},
			outline : {type:"f", value:[]},
			radius : {type:"f", value:[]}
		};

		var materialDot = new THREE.ShaderMaterial({ transparent:true, vertexShader: shaders.particle.vertexShader,fragmentShader: shaders.particle.fragmentShader, attributes:attributes, uniforms: shaders.particle.uniforms});
		var material = new THREE.LineBasicMaterial({ color:config.colors.normalLines, linewidth:1, transparent:true, opacity:0.2});
		var materialActiveDot = new THREE.MeshBasicMaterial({color:config.colors.activeDots,transparent:true, opacity:0.4});
		var materialActive = new THREE.LineBasicMaterial({ color:config.colors.activeLines, linewidth:2,transparent:true, opacity:0.5});

		var stageObject, stageGeometry;
		var stageDotObject, stageDotGeometry;
		var activeObject, activeGeometry;
		var activeDotObject, activeDotGeometry;

		var baseElementCircle = new THREE.Mesh(new THREE.CircleGeometry(1,16));
		baseElementCircle.geometry.mergeVertices();

		var showDebugStuff=true;

		var functionCollisionDetection;
		var groupCollisionDetection;

		var elementGroups = new (require("./ObjectStore"));




///////////////////////////////////////////////////////////////////////////////
		var clicked = function(data, answer, now){
			console.log(elementData.getAll());
			console.log(materialDot);
			console.log(attributes);
			showDebugStuff=!showDebugStuff;

			var vector = new THREE.Vector3( ( data.clientX / world.width ) * 2 - 1, - ( data.clientY / world.height ) * 2 + 1, 0.5 );
			projector.unprojectVector( vector, world.camera );
			var raycaster = new THREE.Raycaster( world.camera.position, vector.sub( world.camera.position ).normalize() );
			var intersects = raycaster.intersectObject( background );

			var activeElement=world.activeElement;
			if ( intersects.length > 0 ) {
				mouse.position = intersects[0].point;
				mouse.position.z =0;
				mouse.minDistance = 9999;
				var collisionDetection = new (require("./BSPCollisionDetection"))(elementData.getAllObjects());

				collisionDetection.testElement(mouse);
				if(mouse.minDistance === 9999) world.activeElement = undefined;
			}

			// Send active to other visualizations
			if(activeElement !== world.activeElement) 
				socket.sendData("__pca__ActiveElement", {id:world.activeElement});

			/*
			// Parse all the faces
			for ( var i in intersects ) {

				intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );

			}
			*/

		}


///////////////////////////////////////////////////////////////////////////////
 		var socketJSEvent= function(data, answer, now){
 			// Remove everything if new SenderId received
			if(data.sender.id !== senderId) {
				elementGroups.removeAll();
				elementData.removeAll();
				groupCollisionDetection.clearElements();
				functionCollisionDetection.clearElements();
				senderId = data.sender.id;
				//groupCollisionDetection.addElement(mouse);
			}

			// get caller and element
			var caller = data.data.calledById !== false ? 
				elementData.get(data.data.calledById):
				{object:{}, data:false};
			var element = elementData.get(data.id);

			if(element === false) element= {object:new (require("./FunctionElement"))(data.id, caller ? caller.object.position:undefined, world), data:{}};
			if(caller === false) caller=  {object:new (require("./FunctionElement"))(data.data.calledById, element.object.position, world), data:{}};

			// get group
			if(element.object.group && caller.object.group && element.object.group.id !== caller.object.group.id) {
				elementGroups.remove(caller.object.group);
				groupCollisionDetection.removeElement(caller.object.group);
				var group = elementGroups.get( element.object.group.merge( caller.object.group ) );
			}
			else var group = elementGroups.get(element.object.group) || elementGroups.get(caller.object.group) || {object:new (require("./GroupElement"))(data.id+"_"+data.data.calledById, element.object.position, world), data:{id:data.id+"_"+data.data.calledById}};
			
			groupCollisionDetection.addElement(group.object);

			// if there is a caller
			if(caller.data !== false) {
				caller.data.id = data.data.calledById;
				group.object.elements.store(caller.object, {id:caller.data.id});
				caller.object.group = group.object;

				caller.object.outboundElements.store(element.object, { id: element.object.id });
				element.object.inboundElements.store(caller.object, { id: caller.object.id });

				element.object.inboundCounts[caller.object.id] = element.object.inboundCounts[caller.object.id] > 0 ? 
					element.object.inboundCounts[caller.object.id]+1 : 1;

				caller.object.outboundCounts[element.object.id] = caller.object.outboundCounts[element.object.id] > 0 ? 
					caller.object.outboundCounts[element.object.id]+1 : 1;

				caller.object.outboundCounts.total++;
				//caller.object.events.unshift(now);

				functionCollisionDetection.addElement(caller.object);

				elementData.store(caller.object, caller.data);

				caller.object.updateRadius();

			}

			group.object.elements.store(element.object, {id: data.id});

			element.data.id = data.id;
			element.object.group = group.object;
			element.object.inboundCounts.total++;
			element.object.events.unshift(now);
			element.object.updateRadius();
			functionCollisionDetection.addElement(element.object);

			elementGroups.store(group.object, group.data);
			elementData.store(element.object, element.data);
		}		

///////////////////////////////////////////////////////////////////////////////
 		var calculateElements = function(data, answer, now){
			var groupElements = elementGroups.getAllObjects();
			var functionElements = elementData.getAllObjects();

			// Update collision detections
			functionCollisionDetection.reMap();
			groupCollisionDetection.reMap();


			// Collide
			functionCollisionDetection.testElements();
			groupCollisionDetection.testElements();

 			// Update Group positions
 			for(var i=0; i<groupElements.length; i++) {
 				groupElements[i].updatePosition();
 				groupElements[i].updateActionRadius();
 			}
			// Update functionElement Positions
 			for(var i=0; i<functionElements.length; i++) 
 				functionElements[i].update(now);
 		}
///////////////////////////////////////////////////////////////////////////////
 		var updateElements = function(data, answer, now){
			var store = elementData.getAll();
			var objects = store.objects;
			var data = store.data;
			var outboundElements;
			
			stageGeometry = new THREE.Geometry();
			stageDotGeometry = new THREE.Geometry();
			activeGeometry = new THREE.Geometry();
			activeDotGeometry = new THREE.Geometry();
			for(var attribute in attributes) {
				attributes[attribute].value = [];
				attributes[attribute].needsUpdate = true;
			}


			// Update Data
			for(var i=0; i < objects.length; i++) {		

				// stageDotGeometry.vertices.push(objects[i].position);
				// attributes.sizes.value.push(Math.pow(objects[i].radius,2)*Math.PI);				
				baseElementCircle.position = objects[i].position;
				baseElementCircle.scale.set(objects[i].radius,objects[i].radius,objects[i].radius);
				THREE.GeometryUtils.merge(stageDotGeometry, baseElementCircle);



				if(objects[i].id === world.activeElement) this.drawActiveElement(objects[i]);


				// add object attributes to Shader Attributes (per vertex).
				for(var x=0; x<baseElementCircle.geometry.vertices.length; x++)
					for(var attribute in attributes)
						attributes[attribute].value.push(objects[i].shaderAttributes[attribute]);

				// Add Lines
				outboundElements = objects[i].outboundElements.getAllObjects(); 				
				for(var k=0;  k<outboundElements.length; k++) {
					stageGeometry.vertices.push(objects[i].position);
					stageGeometry.vertices.push(outboundElements[k].position);


					//Add arrows
					var arrowLength=   objects[i].radius + config.neuron.fE.elementPadding * objects[i].outboundCounts[outboundElements[k].id] / objects[i].outboundCounts.total;
					var arrow = outboundElements[k].position.clone().sub(objects[i].position);
				
					activeGeometry.vertices.push(objects[i].position.clone().add(arrow.setLength(arrowLength)));
					activeGeometry.vertices.push(objects[i].position.clone().add(arrow.setLength(objects[i].radius-1)));

				}

			}

			// Show group elements temp

			if(showDebugStuff){

				var groupElements = elementGroups.getAllObjects();
				for(var i=0; i < groupElements.length; i++) {
					
					baseElementCircle.position = groupElements[i].position;
					baseElementCircle.scale.set(groupElements[i].actionRadius,groupElements[i].actionRadius,groupElements[i].actionRadius);
					THREE.GeometryUtils.merge(activeDotGeometry, baseElementCircle);


					activeGeometry.vertices.push(groupElements[i].boundingBox.min);
					activeGeometry.vertices.push(groupElements[i].boundingBox.max);

				}

			}
			functionCollisionDetection.drawGrids(world, showDebugStuff);
			updateScenes();
 		}

///////////////////////////////////////////////////////////////////////////////
 		var updateScenes=function(data, answer, now){
			if(stageObject) {
				world.scene.remove(stageObject);	
				stageObject.geometry.dispose();									
			}
			if(stageDotObject) {
				world.scene.remove(stageDotObject);	
				stageDotObject.geometry.dispose();
			}
			if(activeObject) {
				world.activeScene.remove(activeObject);	
				activeObject.geometry.dispose();								
			}
			if(activeDotObject) {
				world.activeScene.remove(activeDotObject);	
				activeDotObject.geometry.dispose();
			}

			if(stageGeometry && stageGeometry.vertices.length >0){
				stageObject = new THREE.Line(stageGeometry, material, THREE.LinePieces);
				world.scene.add(stageObject);
			}
			if(stageDotGeometry && stageDotGeometry.vertices.length >0){
				// stageDotObject = new THREE.ParticleSystem(stageDotGeometry, materialDot);
				stageDotObject = new THREE.Mesh(stageDotGeometry, materialDot);
				stageDotObject.position.set(0,0,1);
				world.scene.add(stageDotObject);
			}
			if(activeGeometry && activeGeometry.vertices.length >0){
				activeObject = new THREE.Line(activeGeometry, materialActive, THREE.LinePieces);
				world.activeScene.add(activeObject);
			}
			if(activeDotGeometry && activeDotGeometry.vertices.length >0){
				activeDotObject = new THREE.Mesh(activeDotGeometry, materialActiveDot);
				activeDotObject.position.set(0,0,1);
				world.activeScene.add(activeDotObject);
			}
		}
///////////////////////////////////////////////////////////////////////////////
		this.drawActiveElement =function(element) {
			var circle = new THREE.Mesh(new THREE.CircleGeometry(1,40));
			circle.geometry.mergeVertices();

			circle.geometry.vertices.shift();
			circle.position = element.position;
			circle.scale.set(element.actionRadius,element.actionRadius,element.actionRadius);
			THREE.GeometryUtils.merge(activeGeometry, circle);



		}
///////////////////////////////////////////////////////////////////////////////
		var setupComposer = function() {

			// BlurActive
			composerBlur = new THREE.EffectComposer( world.renderer );
			composerBlur.addPass( new THREE.RenderPass( world.activeScene, world.camera ) );
			var effectTint = new THREE.ShaderPass( shaders.tint );
				effectTint.uniforms[ "color" ].value = new THREE.Color(config.colors.activeGlow);
			var effectHorizBlur = new THREE.ShaderPass( shaders.horizontalBlur );
				effectHorizBlur.uniforms[ "h" ].value = 1.5 / world.width;
			var effectVertiBlur = new THREE.ShaderPass( shaders.verticalBlur );
				effectVertiBlur.uniforms[ "v" ].value = 1.5 / world.height;			
			composerBlur.addPass( effectTint );
			composerBlur.addPass( effectHorizBlur );
			composerBlur.addPass( effectVertiBlur );

			// Active
			composerActive = new THREE.EffectComposer( world.renderer );
			composerActive.addPass( new THREE.RenderPass( world.activeScene, world.camera ) );

			// Combine With Background and add Vignette
			composer = new THREE.EffectComposer( world.renderer );
			composer.addPass( new THREE.RenderPass( world.scene, world.camera ) );
			var effectVignette = new THREE.ShaderPass( shaders.vignette );
				// larger values = darker closer to center
				// darkness < 1  => lighter edges
				effectVignette.uniforms[ "offset" ].value = 1;
				effectVignette.uniforms[ "darkness" ].value = 1;
			var effectBlend1 = new THREE.ShaderPass( shaders.additiveBlend, "tDiffuse1" );
				effectBlend1.uniforms[ 'tDiffuse2' ].value = composerBlur.renderTarget2;
			var effectBlend11 = new THREE.ShaderPass( shaders.additiveBlend, "tDiffuse1" );
				effectBlend11.uniforms[ 'tDiffuse2' ].value = composerBlur.renderTarget2;
			var effectBlend2 = new THREE.ShaderPass( shaders.additiveBlend, "tDiffuse2" );
				effectBlend2.uniforms[ 'tDiffuse1' ].value = composerActive.renderTarget2
				effectBlend2.renderToScreen = true;
			composer.addPass(effectVignette);
			composer.addPass(effectBlend1);					
			composer.addPass(effectBlend2);
		}
///////////////////////////////////////////////////////////////////////////////
		var render = function(){
			composerBlur.render();
			composerActive.render();
			composer.render();
		}
///////////////////////////////////////////////////////////////////////////////
		this.construct = function(_socket, _loop){		
			socket = _socket;
			loop = _loop;	
			that = this;
			globalTick = new (require("./GlobalTicker.js"))();
		}
///////////////////////////////////////////////////////////////////////////////
		this.initialize = function(container) {
			world = new (require("./World.js"))($(container));
			functionCollisionDetection = new (require("./BSPCollisionDetection"))();
			groupCollisionDetection = new (require("./BSPCollisionDetection"))();

			//mouseelement
			mouse = new (require("./MouseElement.js"))(world);
			// groupCollisionDetection.addElement(mouse);
			// globalTick.addListener(mouse.update, { bind: mouse, eventName :"update"});

			//Background
			background = new THREE.Mesh(new THREE.PlaneGeometry(999999, 999999, 1,1), new THREE.MeshBasicMaterial({color:config.colors.background}));
			world.scene.add(background);
			setupComposer();

			loop.addListener(globalTick.tick, { bind:globalTick });
			
			socket.addListener(socketJSEvent, {bind : this, eventName:"jsEvent"});
			
			globalTick.addListener(world.onWindowResize, { bind:world, eventName :"resize" });
			globalTick.addListener(clicked, {bind:this, eventName:"click"});
//			globalTick.addListener(setupComposer, { bind:this, eventName :"resize" });
			globalTick.addListener(calculateElements, { bind: this, eventName :"calculate"});
			globalTick.addListener(updateElements, { bind: this, eventName :"update"});
			//globalTick.addListener(updateScenes, {bind: this, eventName :"update"});			
			globalTick.addListener(render, { bind:this, eventName :"render" });

			globalTick.activate();

		}


///////////////////////////////////////////////////////////////////////////////
		this.remove = function() {
			loop.removeListener(globalTick.tick);
			loop.removeListener(env.render);
		}


	}
///////////////////////////////////////////////////////////////////////////////
	module.exports = require("../Class.js")(curtain);
})(jQuery, THREE, window, document)
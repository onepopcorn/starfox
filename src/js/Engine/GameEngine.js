/*
 *
 * Consider the following:
 * Game engine must keep track of current Scene ✔
 * Game engine must handle the Renderer & resize ✔
 * Game engine must implement a "director" class to handle scenes 
 * Game engine must handle postprocessing effects and give access to change effects on runtime
 * Game engine should implement a 3d physics engine (cannonjs maybe?)
 * Game engine should implement an assets preloader per scene
 *
 */

import { PerspectiveCamera, WebGLRenderer } from 'three' 
import BaseScene from './Scene/BaseScene'
import Controls from './Controls/Controls'
import raf from 'raf'

export default class GameEngine {
	constructor(targetNodeSelector, initialScene,settings = {}) {
		// Handle settings
		const defaultSettings = {
				fov: 45,
				aspect:  window.innerWidth/window.innerHeight,
				near: 0.1,
				far: 1000,
				antialiasing: true,
				shadowMap: false
		}
		this.settings = Object.assign({},defaultSettings,settings)
		
		// Config camera
		this.camera = new PerspectiveCamera(
			this.settings.fov,
			this.settings.aspect,
			this.settings.near,
			this.settings.far
		);
		this.camera.position.z = 5;

		// Config renderer
		this.renderer = new WebGLRenderer({antialias:this.settings.antialiasing,shadowMapEnabled:this.settings.shadowMap});
		this.renderer.setSize(window.innerWidth,window.innerHeight);
		document.querySelector(targetNodeSelector).appendChild(this.renderer.domElement);

		// Handle input
		this.controls = new Controls();
		this.controls.init();

		// Setup initial scene. Be sure scene is BaseScene subclass
		if(!initialScene instanceof BaseScene){
			throw(new Error('An initial scene must be provided'));
		}
		this.currentScene = new initialScene(this.controls);

		// Handle resize
		window.onresize = this.onresize.bind(this)

		// Startup the engine
		this.render = this.render.bind(this);
		raf(this.render);
	}

	render(delta){
		if(this.currentScene){
			this.currentScene.update();
		}

		this.renderer.render(this.currentScene,this.camera);
		raf(this.render);
	}

	onresize(){
		this.camera.aspect = this.settings.aspect = window.innerWidth/window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth,window.innerHeight);
	}
}
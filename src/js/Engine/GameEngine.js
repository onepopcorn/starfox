/**
 * Main class. Wraps the whole game and kickstarts all necessary stuff.
 * @example const game = new GameEngine('#container',MainScene,{fov:75,antialias:false}) 
 *
 * @todo Game engine must implement a "director" class to handle scenes 
 * @todo Game engine must handle postprocessing effects and give access to change effects on runtime
 * @todo Game engine should implement a 3D physics engine (cannonjs maybe?)
 * @todo Game engine should implement an assets preloader per scene
 */

import { PerspectiveCamera, WebGLRenderer, Clock } from 'three' 
import { BaseScene, DefaultScene, SceneManager } from './Scene'
import Controls from './Controls/Controls'
import raf from 'raf'

export default class GameEngine {
	/**
	 * Create a new game with the given params and settings
	 * @param {string} targetID - ID of the element that will host the canvas to render.
	 * @param {BaseScene} initialScene - The main scene that will be triggered when startup. It must be a BaseClass subclass.
	 *  
	 */
	constructor(targetID, initialScene,settings = {}) {
		// Handle settings
		const defaultSettings = {
				fov: 75,
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
		)
		this.camera.position.z = 5

		// Config renderer
		this.renderer = new WebGLRenderer({antialias:this.settings.antialiasing,shadowMapEnabled:this.settings.shadowMap})
		this.renderer.setSize(window.innerWidth,window.innerHeight)
		document.querySelector(targetID).appendChild(this.renderer.domElement)

		// Handle input
		this.controls = new Controls()
		this.controls.init()

		// Setup scene. 
		// Ensure scene is BaseScene subclass
		if(!initialScene instanceof BaseScene){
			throw(new Error('An initial scene must be provided'))
		}
		// Start with a default preload Scene
		this.currentScene = new DefaultScene()
		this.sceneManager = new SceneManager(this)
		this.sceneManager.loadScene(initialScene)

		// this.currentScene = new initialScene({
		// 	controls:this.controls
		// })
		// this.currentScene.preload(this.currentScene.init)

		// Handle resize
		window.onresize = this.onresize.bind(this)

		// Startup the engine
		this.render = this.render.bind(this)
		this.clock = new Clock()
		raf(this.render)
	}

	// changeScene(newScene){
	// 	this.currentScene = newScene
	// }

	render(delta){
		const d = this.clock.getDelta()
		const e = this.clock.getElapsedTime()

		if(this.currentScene){
			this.currentScene.update(d,e)
		}

		this.renderer.render(this.currentScene,this.camera)
		raf(this.render)
	}

	onresize(){
		this.camera.aspect = this.settings.aspect = window.innerWidth/window.innerHeight
		this.camera.updateProjectionMatrix()
		this.renderer.setSize(window.innerWidth,window.innerHeight)
	}
}
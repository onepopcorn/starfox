/**
 * Main class. Wraps the whole game and kickstarts all necessary stuff.
 * @example const game = new GameEngine('#container',MainScene,{fov:75,antialias:false}) 
 *
 * @todo Game engine must implement a "director" class to handle scenes 
 * @todo Game engine must handle postprocessing effects and give access to change effects on runtime
 * @todo Game engine should implement a 3D physics engine (cannonjs maybe?)
 * @todo Game engine should implement an assets preloader per scene
 * @todo Implement a GUI system. Example: http://codepen.io/waichuen/pen/ojMJKB?editors=0010
 */

import { PerspectiveCamera, OrthographicCamera, Scene, WebGLRenderer, Clock } from 'three' 
import { SceneManager } from './Scene'
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

		this.uicamera = new OrthographicCamera(- window.innerWidth/2, window.innerWidth/2, window.innerHeight/2, -window.innerHeight/2, 1, 10)
		this.uicamera.position.z = 10

		// Config renderer
		this.renderer = new WebGLRenderer({antialias:this.settings.antialiasing,shadowMapEnabled:this.settings.shadowMap})
		this.renderer.autoClear = false
		this.renderer.setSize(window.innerWidth,window.innerHeight)
		document.querySelector(targetID).appendChild(this.renderer.domElement)

		// Handle input
		this.controls = new Controls()
		this.controls.init()

		// Handle scenes
		this.scene3D = new Scene()
		this.sceneGUI = new Scene()
		this.sceneManager = new SceneManager(this)
		this.sceneManager.load(initialScene)

		// Handle resize
		window.onresize = this.onresize.bind(this)

		// Startup the engine
		this.render = this.render.bind(this)
		this.clock = new Clock()
		
		raf(this.render)
	}

	render(){
		const d = this.clock.getDelta()
		const e = this.clock.getElapsedTime()
		
		// Update controls
		this.controls.update()

		// Update scenes
		if(this.currentScene && this.currentScene._active) {
			this.currentScene.update()
		}
		
		// Render both UI and 3D scenes
		this.renderer.clear()
		this.renderer.render(this.scene3D,this.camera)
		this.renderer.clearDepth()
		this.renderer.render(this.sceneGUI,this.uicamera)

		if(this.currentScene)
			console.log(this.currentScene.name)
		
		raf(this.render)
	}

	onresize(){
		this.camera.aspect = this.settings.aspect = window.innerWidth/window.innerHeight
		this.camera.updateProjectionMatrix()
		

		this.uicamera.left = -window.innerWidth/2
		this.uicamera.right = window.innerWidth/2
		this.uicamera.top = window.innerHeight/2
		this.uicamera.bottom = -window.innerHeight/2
		this.uicamera.updateProjectionMatrix()

		this.renderer.setSize(window.innerWidth,window.innerHeight)
	}
}
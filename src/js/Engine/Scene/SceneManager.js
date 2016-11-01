import SceneLoader from './SceneLoader'
import { JSONLoader, TextureLoader } from 'three'

import BaseScene from './BaseScene'

export default class SceneManager {
	constructor(engine){
		this._engine = engine
		this.scene = null
		this.previousScene = null
		
		this.progressCallback = null
		this.endCallback = null
		
		this._queue = []
		this._active = false

		this.loader = new SceneLoader(this._onProgress.bind(this))
		this._onSceneLoaded = this._onSceneLoaded.bind(this)
	}

	load(scene,progress,callback,async){
		this._queue.push({
			scene,
			progress,
			callback,
			async
		})

		if(!this._active){
			this._processQueue()
			this._active = true
		}
	}

	swap(){
		// Initialize scene
		this.scene.init()
		this._engine.currentScene = this.scene

		// Split GUIObjects & GameObjects into the differents scenes. Also update scene params
		this._setupScene()

		// Remove all the elements on both scenes if any 
		if(this.previousScene){
			this.previousScene.destroy()
		}

		this.previousScene = null
		this.progressCallback = null
		
		// Continue loading next scene if needed
		if(this._queue.length > 0){
			this._processQueue()
		} else {
			this._active = false
		}
	}

	_processQueue(){
		let current = this._queue.shift()
		this._loadScene(current.scene,current.progress,current.callback,current.async)
	}


	_onProgress(asset,progress) {
		// call progress callback if available
		if(typeof this.progressCallback === 'function'){
			this.progressCallback.call(null,asset,progress)
		}
	}

	_loadScene(scene, progress, callback, async) {
		// Assign progress callback
		this.progressCallback = progress
		this.endCallback = callback
		
		// Swap previous and current scene
		if(this.scene)
		{
			this.previousScene = this.scene
		}

		this.scene = new scene(this._engine)
		this.loader.load(this.scene.getAssets())
		.then(results => {
			results.forEach((result) =>
				this.scene.assets[result.id] = result.data
			)
			this._onSceneLoaded(async)
		})
	}

	// Everything in the scene has been preloaded. Ready to run it. 
	_onSceneLoaded(async){
		if(typeof this.endCallback === 'function'){
			this.endCallback()
		}

		if(!async) {
			this.swap()
		}
	}

	_setupScene(){
		this.scene.children.forEach( child => {
			if(child.type === 'GUIObject'){
				this._engine.sceneGUI.add(child)
			} else {
				this._engine.scene3D.add(child)
			}
		})

		this._engine.scene3D.fog = this.scene.fog
		this._engine.scene3D.background = this.scene.background
	}
}
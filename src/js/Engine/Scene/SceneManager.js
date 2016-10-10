import SceneLoader from './SceneLoader'
import { JSONLoader, TextureLoader } from 'three'

export default class SceneManager {
	constructor(engine){
		this.engine = engine
		this.scene = null
		this.loader = new SceneLoader(this.onSceneLoaded)

	}

	loadScene(scene) {
		this.scene = new scene(this.engine)
		this.loader.load(this.scene.preload())
		.then(results => {
			results.forEach((result) =>
				this.scene.assets[result.id] = result.data
			)
			this.onSceneLoaded()
		}) 
	}

	onSceneLoaded(scene){
		// Initialize scene
		this.scene.init()
		// Tell the renderer to render the new scene
		this.engine.currentScene = this.scene
		this.scene = null
	}
}
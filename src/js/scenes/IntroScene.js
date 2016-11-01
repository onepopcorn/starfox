import { BaseScene } from '../Engine/Scene'

import GameScene from './GameScene'
import UISpiner from '../entities/UISpiner'

export default class IntroScene extends BaseScene {
	constructor(engine){
		super()

		this.name = 'Intro'
		this.engine = engine
	}

	getAssets(){
		return [
			{id:'icon',type:'texture',url:'./assets/textures/icon.png'},
			{id:'meter',type:'image',url:'./assets/textures/meter.png'}
		]
	}

	init(){
		super.init()
		
		this.gui = new UISpiner(this.assets.meter)
		this.add(this.gui)

		this.engine.sceneManager.load(GameScene, this.onLoadProgress.bind(this),this.onLoaded.bind(this),true)
	}

	onLoaded(){
		setTimeout(()=>{
			this.engine.sceneManager.swap()
		}, 5000)
	}

	update(){
		super.update()
	}

	onLoadProgress(asset,progress){
		console.log(progress.loaded * 100 / progress.total)
		this.gui.progress(progress.loaded * 100 / progress.total)
	}

	destroy(){
		super.destroy()
	}
}
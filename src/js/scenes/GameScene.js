import { Scene, JSONLoader, AmbientLight, PointLight, TextureLoader, FogExp2 } from 'three'
import { BaseScene } from '../Engine/Scene'
import Ship from '../entities/Ship'
import Ground from '../entities/Ground'
import Reticle from '../entities/Reticle'

import SceneLoader from '../Engine/Scene/SceneLoader'
import Tween from '../Engine/Ease/Tween'

export default class GameScene extends BaseScene {
	constructor(engine){
		super()

		this.assets = {}
		this.controls = engine.controls.actions
		this.fog = new FogExp2()
	}

	preload() {
		return [
			{id:'ship',type:"json",url:'./assets/models/arwing.json'},
			{id:'spaceBg',type:"texture",url:'./assets/textures/galaxy_background.png'}
		]
	}

	init(){
		let light = new PointLight(0xffffff,1)
		light.position.set(3,5,1)
		this.add(light)

		let amb = new AmbientLight(0xffffff,0.5)
		this.add(amb)

		let ground = new Ground(this.assets.spaceBg)
		this.add(ground)

		this.reticle = new Reticle(this.controls)
		this.add(this.reticle)

		this.ship = new Ship(this.assets.ship,this.reticle.position,this.controls)
		this.add(this.ship)

		const animationConf = {
			duration:0.5,
			pingpong:true,
			loop:true,
			loopCount:2,
			ease:'EaseOutQuad',
			onUpdate: position => {
				const diff = this.ship.position.z - this.reticle.position.z
				this.ship.position.z = position.z		
				this.reticle.position.z = position.z - diff
			}
		}

		this.brake = new Tween({z:1.5}, {z:2.5}, animationConf)
		this.boost = new Tween({z:1.5}, {z:-0.5}, animationConf)

	}

	update(delta,elapsed){
		super.update(delta,elapsed)
		if(this.controls.TRIGGER_L){
			this.brake.start()
		}

		if(this.controls.TRIGGER_R){
			this.boost.start()
		}

		this.brake.update()
		this.boost.update()
		this.ship.lookAt(this.reticle.position)	
	}
}
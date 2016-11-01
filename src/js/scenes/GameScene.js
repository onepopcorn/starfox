import { Scene, JSONLoader, AmbientLight, PointLight, TextureLoader, FogExp2 } from 'three'
import { BaseScene } from '../Engine/Scene'
import Ship from '../entities/Ship'
import Ground from '../entities/Ground'
import Reticle from '../entities/Reticle'

import Tween from '../Engine/Ease/Tween'

export default class GameScene extends BaseScene {
	constructor(engine){
		super()

		this.name = "Game"
		this.controls = engine.controls.actions
		this.fog = new FogExp2()
	}

	getAssets() {
		return [
			{id:'ship',type:'json',url:'./assets/models/arwing.json'},
			{id:'spaceBg',type:"texture",url:'./assets/textures/galaxy_background.png'},
			{id:'crosshair',type:'texture',url:'/assets/textures/crosshair.png'}
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

		this.reticle = new Reticle(this.assets.crosshair,this.controls)
		this.reticle.position.z = -15
		this.add(this.reticle)

		this.ship = new Ship(this.assets.ship,this.reticle.position,this.controls)
		this.ship.position.z = -5
		this.add(this.ship)

		// Flag to prevent easing swap
		this.moving = false

		const animationConf = {
			duration:1,
			pingpong:true,
			loop:true,
			loopCount:2,
			ease:'EaseOutQuad',
			onStart:() => this.moving = true,
			onUpdate: position => {
				const diff = this.ship.position.z - this.reticle.position.z
				this.ship.position.z = position.z		
				this.reticle.position.z = position.z - diff
			},
			onFinish:() => this.moving = false
		}

		this.brake = new Tween({z:this.ship.position.z}, {z:this.ship.position.z + 3}, animationConf)
		this.boost = new Tween({z:this.ship.position.z}, {z:this.ship.position.z - 10}, animationConf)

		// Call it at the END of init function to be sure everything is loaded and settled
		super.init()
	}

	update(delta,elapsed){
		super.update(delta,elapsed)
		if(this.controls.TRIGGER_L && !this.moving){
			this.brake.start()
		}

		if(this.controls.TRIGGER_R && !this.moving){
			this.boost.start()
		}
		this.brake.update()
		this.boost.update()
		this.ship.lookAt(this.reticle.position)	
	}

	destroy(){
		super.destroy()
	}
}
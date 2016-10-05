import { Scene, JSONLoader, AmbientLight, PointLight, TextureLoader, FogExp2 } from 'three'
import { BaseScene } from '../Engine/Scene'
import Ship from '../entities/Ship'
import Ground from '../entities/Ground'

import SceneLoader from '../Engine/Scene/SceneLoader'

export default class GameScene extends BaseScene {
	constructor(engine){
		super()

		this.assets = {}
		this.controls = engine.controls
		this.fog = new FogExp2()

	}

	preload() {
		return [
			{id:'ship',type:"json",url:'./assets/models/arwing.json'},
			{id:'spaceBg',type:"texture",url:'./assets/textures/galaxy_background.png'}
		];
	}

	init(){
		let light = new PointLight(0xffffff,1);
		light.position.set(80,50,60);
		this.add(light);

		let amb = new AmbientLight(0xffffff,0.5);
		this.add(amb);

		let ground = new Ground(this.assets.spaceBg);
		this.add(ground);

		let ship = new Ship(this.assets.ship,this.controls.actions)
		this.add(ship);
	}

	update(){
		super.update()
	}
}
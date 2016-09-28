import { Scene, JSONLoader, AmbientLight, PointLight } from 'three'
import BaseScene from '../Engine/Scene/BaseScene'
import Ship from '../entities/Ship'
import Ground from '../entities/Ground'

export default class GameScene extends BaseScene {
	constructor(controls){
		super();

		let light = new PointLight(0xffffff,1);
		light.position.set(80,50,60);
		this.add(light);

		let amb = new AmbientLight(0xffffff,0.5);
		this.add(amb);

		let ground = new Ground();
		this.add(ground);

		const loader = new JSONLoader();
		loader.load('./assets/models/arwing.json', (geometry, materials) => {
		    let ship = new Ship(geometry,materials,controls.actions);
		    this.add(ship); 
		})
	}

	update(){
		super.update()
	}
}
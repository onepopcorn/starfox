import GameObject from '../Engine/Display/GameObject'
import { MultiMaterial } from 'three'

export default class Ship extends GameObject {
	constructor([geometry,materials],controls){
		super();
		this.geometry = geometry;
		this.material = new MultiMaterial(materials);
		this.controls = controls;
		this.position.z = 2.5
		
		this.velocity = 0.01;
		this.acc = 0.1;
	}

	update(delta){
		console.log(this.controls)
		if(this.controls.LEFT) {
			this.rotation.z += this.velocity
		}
		if(this.controls.RIGHT) {
			this.rotation.z -= this.velocity
		} 

		if(this.controls.UP) {
			this.rotation.x -= this.velocity
		} 

		else if(this.controls.DOWN) {
			this.rotation.x += this.velocity
		}

		if(this.controls.SHOT) {
			console.warn("SHOTING")
		}
	}
}
import GameObject from '../Engine/Display/GameObject'
import { MultiMaterial } from 'three'

export default class Ship extends GameObject {
	constructor(geometry,materials,controls){
		super();
		this.geometry = geometry;
		this.material = new MultiMaterial(materials);
		this.controls = controls;
		this.velocity = 0.01;
		// this.acc = 0.001;
	}

	update(delta){
		if(this.controls.LEFT) {
			this.rotation.z+=this.velocity;
		}
		if(this.controls.RIGHT) {
			this.rotation.z -= this.velocity
		} 

		if(this.controls.UP) {
			this.rotation.x -= this.velocity; 
		} 

		if(this.controls.DOWN) {
			this.rotation.x += this.velocity;
		}

		if(this.controls.SHOT) {
			console.warn("SHOTING");
		}
	}
}
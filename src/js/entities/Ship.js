import GameObject from '../Engine/Display/GameObject'
import { MultiMaterial, Matrix4, Vector3 } from 'three'

export default class Ship extends GameObject {
	constructor([geometry,materials],controls){
		super();
		// Assign properties
		this.geometry = geometry
		this.material = new MultiMaterial(materials)
		this.controls = controls
		this.vel = 0.02
		// Flip Y rotation to face front when lookAt is applied 
		this.geometry.applyMatrix(new Matrix4().makeRotationY(Math.PI))
		this.position.z = 2.5

	}

	update(delta,elapsed){
		if(this.controls.UP){
			this.position.y -= this.vel
		}

		if(this.controls.DOWN) {
			this.position.y += this.vel
		}

		if(this.controls.LEFT) {
			this.position.x -= this.vel
		}

		if(this.controls.RIGHT) {
			this.position.x += this.vel
		}

		if(this.controls.TRIGGER_L) {
			this.rotation.z = 90 * Math.PI / 180
		}

		if(this.controls.TRIGGER_R) {
			this.rotation.z = -90 * Math.PI / 180
		}

		// console.log(this.controls)
	}
}
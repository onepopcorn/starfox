import { PlaneGeometry, MeshBasicMaterial } from 'three'
import GameObject from '../Engine/Display/GameObject'

export default class Reticle extends GameObject {
	constructor(controls){
		super()

		this.geometry = new PlaneGeometry(1.5,1.5)
		this.material = new MeshBasicMaterial({color:0xffffff,wireframe:true})
		this.controls = controls
		this.position.z = -3
		this.vel = 0.15
	}

	update(delta,elapsed){
		if(this.controls.UP) {
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


		// this.rotation.z += 0.05
	}
}
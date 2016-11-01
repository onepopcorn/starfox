import { PlaneGeometry, MeshBasicMaterial, Mesh } from 'three'
import GameObject from '../Engine/Display/GameObject'

export default class Reticle extends GameObject {
	constructor(texture,controls){
		super()

		let geometry = new PlaneGeometry(0.75,0.75)
		let material = new MeshBasicMaterial({map:texture,transparent:true})
		let mesh = new Mesh(geometry,material)
		this.add(mesh)

		this.controls = controls
		this.vel = 0.1
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
	}
}
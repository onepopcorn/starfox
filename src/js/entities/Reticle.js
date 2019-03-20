import { PlaneGeometry, MeshBasicMaterial, Mesh, Matrix4 } from 'three'
import GameObject from '../Engine/Display/GameObject'
import Tween from '../Engine/Ease/Tween'

export default class Reticle extends GameObject {
	constructor(texture,controls){
		super()

		let geometry = new PlaneGeometry(0.75,0.75)
		let material = new MeshBasicMaterial({map:texture,transparent:true})
		let mesh = new Mesh(geometry,material)
		this.add(mesh)

		this.wiggle = new Tween({z:-1}, {z:1}, {
			duration:1,
			autoStart: true,
			loop:true,
			pingpong:true, 
			ease:'EaseInOutQuad',
			onUpdate: rotation => {
				// mesh.rotation.z = rotation.z
				mesh.position.z = rotation.z
			}
		})

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

		this.wiggle.update()

	}
}
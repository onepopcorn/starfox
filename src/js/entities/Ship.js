import GameObject from '../Engine/Display/GameObject'
import { MultiMaterial, Matrix4, Vector3, Mesh } from 'three'
import Tween from '../Engine/Ease/Tween'

export default class Ship extends GameObject {
	constructor([geometry,materials],targetPosition,controls){
		super();
		// Assign properties
		this.controls = controls
		this.target = targetPosition
		this.mesh = new Mesh(geometry,new MultiMaterial(materials))
		this.add(this.mesh)
		
		// // Flip Y & Z mesh points to face front & up when lookAt is applied 
		this.mesh.geometry.applyMatrix(new Matrix4().makeRotationY(Math.PI))
		this.position.z = 1.5
		this.isAnimated = false
		
		this.wiggle = new Tween({z:-0.1}, {z:0.1}, {
			duration:0.5,
			autoStart: true,
			loop:true,
			pingpong:true, 
			ease:'EaseInOutQuad',
			onUpdate: rotation => {
				this.mesh.geometry.applyMatrix(new Matrix4().makeRotationZ(rotation.z * Math.PI / 180))
			}
		})
	}

	update(delta,elapsed){
		this.wiggle.update()
		
		if(this.position.x !== this.target.x || this.position.y !== this.target.y ){
			let dx = this.position.x - this.target.x
			let dy = this.position.y - this.target.y

			this.position.x = Math.abs(dx) > 0.005 ? this.position.x - dx / 30 : this.target.x 
			this.position.y = Math.abs(dy) > 0.005 ? this.position.y - dy / 30 : this.target.y
		} 

	}
}
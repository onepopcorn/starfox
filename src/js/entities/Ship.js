import GameObject from '../Engine/Display/GameObject'
import { MultiMaterial, Matrix4, Vector3 } from 'three'
import Tween from '../Engine/Ease/Tween'

export default class Ship extends GameObject {
	constructor([geometry,materials],controls){
		super();
		// Assign properties
		this.geometry = geometry
		this.material = new MultiMaterial(materials)
		this.controls = controls
		this.vel = 0.03
		// Flip Y & Z mesh points to face front & up when lookAt is applied 
		this.geometry.applyMatrix(new Matrix4().makeRotationY(Math.PI))
		this.geometry.applyMatrix(new Matrix4().makeRotationZ(Math.PI))
		
		this.position.z = 2.5

		this.isAnimated = false


		const animationConf = {
			duration:1,
			pingpong:true,
			loop:true,
			loopCount:2,
			ease:'EaseOutQuad',
			onStart: () => this.isAnimated = true,
			onUpdate: position => this.position.z = position.z,
			onFinish: () => this.isAnimated = false
		}
		this.brake = new Tween({z:this.position.z}, {z:3.5}, animationConf)
		this.boost = new Tween({z:this.position.z}, {z:-2}, animationConf)
		
		this.wiggle = new Tween({z:-2}, {z:2}, {
			duration:0.75,
			autoStart: true,
			loop:true,
			pingpong:true, 
			ease:'EaseInOutQuad',
			onUpdate: rotation => this.rotation.z = rotation.z * Math.PI / 180
		})
	}

	update(delta,elapsed){
		this.wiggle.update()
		this.brake.update()
		this.boost.update()

		if(this.controls.TRIGGER_L && !this.isAnimated) {
			this.brake.start()
		}

		if(this.controls.TRIGGER_R && !this.isAnimated) {
			this.boost.start()
		}
	}
}
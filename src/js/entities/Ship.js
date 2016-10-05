import GameObject from '../Engine/Display/GameObject'
import { MultiMaterial } from 'three'

export default class Ship extends GameObject {
	constructor([geometry,materials],controls){
		super();
		this.geometry = geometry
		this.material = new MultiMaterial(materials)
		this.controls = controls
		this.position.z = 2.5
		
		this.moveVel = 0.03
		this.turnVel = 0.05
	}

	update(delta,elapsed){
		
	}
}
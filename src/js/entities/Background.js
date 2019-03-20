import GameObject from '../Engine/Display/GameObject'
import { SphereGeometry, MeshLambertMaterial, Mesh, DoubleSide } from 'three'

export default class Background extends GameObject {
	constructor(texture){
		super();
		
		let geometry = new SphereGeometry(100,32,32);
		let material = new MeshLambertMaterial({map:texture, side:DoubleSide});
		material.needsUpdate = true;
		let mesh = new Mesh(geometry,material)
		this.add(mesh)
	}

	update(){

	}
}
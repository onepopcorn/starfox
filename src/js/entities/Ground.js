import GameObject from '../Engine/Display/GameObject'
import { BoxGeometry, MeshLambertMaterial, Mesh } from 'three'

export default class Ground extends GameObject {
	constructor(){
		super();
		
		let geometry = new BoxGeometry(20,0.01,150);
		let material = new MeshLambertMaterial({color:0x00ff00});
		material.needsUpdate = true;
		let mesh = new Mesh(geometry,material)
		this.add(mesh)

		mesh.receiveShadow = true
		this.position.y = -2.5;
	}

	update(){

	}
}
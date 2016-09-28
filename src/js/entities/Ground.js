import GameObject from '../Engine/Display/GameObject'
import { BoxGeometry, MeshPhongMaterial } from 'three'

export default class Ground extends GameObject {
	constructor(){
		super();
		
		this.geometry = new BoxGeometry(20,0.01,15);
		this.material = new MeshPhongMaterial({color:0x00ff00});
		this.material.needsUpdate = true;

		this.position.y = -3;
		this.rotation.x = 10;
	}

	update(){

	}
}
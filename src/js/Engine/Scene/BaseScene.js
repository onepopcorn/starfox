import { Scene } from 'three'
import GameObject from '../Display/GameObject'

export default class BaseScene extends Scene {
	constructor() {
		super();
		if(this.constructor === BaseScene){
			throw(new Error('Do not instantiate a GameScene directly. Use it to extend your game classes'))
		}
	}
	
	update(){
		this.children.forEach(child => {
			if(child instanceof GameObject){
				child.update()	
			}
		})
	}
}
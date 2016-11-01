import { Object3D } from 'three'
/**
 * Abstract class that works as a "template" for all in-game objects like Players, NPC's, etc. that requires to be animated controled by the framework (e.g. through update method)
 * @extends {THREE.MESH}
 */
export default class GameObject extends Object3D {
	constructor() {
		super()
		if(this.constructor === GameObject){
			throw(new Error('Do not instantiate a GameObject directly. Use it to extend your game classes'));
		}

		Object.defineProperty(this,'type',{
			enumerable:false,
			configurable:false,
			writable:false,
			value:'GameObject'
		})
	}
	/**
	 * This method must be overriden by a subclass
	 * @abstract
	 * @param {number} delta - Time passed since the last render iteration
	 */
	update(delta){}
	/**
	 * This method must be overriden by a subclass
	 * @abstract
	 */
	destroy(){}
}
import { Scene } from 'THREE'
import GameObject from '../Display/GameObject'

/**
 * This class is intended to be extended by your own Scene classes. 
 * @abstract
 * @extends {THREE.SCENE}
 * 
 */
export default class BaseScene extends Scene {
	/**
	 * This class should not be instantiated directly.
	 * @abstract
	 *
	 */
	constructor() {
		super();
		if(this.constructor === BaseScene){
			throw(new Error('Do not instantiate a GameScene directly. Use it to extend your game classes'))
		}

		// @todo Use constructor to defined needed assets
	}

	preload(){}

	/**
	 * This method can be implemented by inherited classes.
	 * @abstract
	 */
	init(){}
	/**
	 * This method can be implemented by inherited classes. But always call super.update() on the overriding method.
	 * @public
	 */
	update(delta,elapsed){
		this.children.forEach(child => {
			if(child instanceof GameObject){
				child.update(delta,elapsed)	
			}
		})
	}
}
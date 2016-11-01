import { Sprite, SpriteMaterial } from 'three'
/**
 * Abstract class that works as a "template" for all in-game GUI objects like life meters, loading spinners, etc. that requires to be animated controled by the framework (e.g. through update method)
 * @extends {THREE.MESH}
 */
export default class GUIObject extends Sprite {
	constructor() {
		super()

		Object.defineProperty(this,'type',{
			enumerable:false,
			configurable:false,
			writable:false,
			value:'GUIObject'
		})

		this.material = new SpriteMaterial()
	}
	/**
	 * This method sets the texture for the GUIObject.
	 * @param {THREE.Texture} texture - Texture to be appied to the GUIObject.
	 */
	setTexture(texture){
		this.material.map = texture
		this._width = this.material.map.image.width
		this._height = this.material.map.image.height
		this.scale.set(this._width,this._height,1)
		this.material.map.needsUpdate = true
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
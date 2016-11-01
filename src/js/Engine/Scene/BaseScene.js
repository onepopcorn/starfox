import { Scene, Object3D } from 'THREE'
import GameObject from '../Display/GameObject'

/**
 * This class is intended to be extended by your own Scene classes. 
 * @abstract
 * @extends {THREE.SCENE}
 * 
 */
export default class BaseScene {
	/**
	 * This class should not be instantiated directly.
	 * @abstract
	 *
	 */
	constructor() {
		if(this.constructor === BaseScene){
			throw(new Error('Do not instantiate a GameScene directly. Use it to extend your game classes'))
		}

		Object.defineProperty(this,'type',{
			enumerable:false,
			configurable:false,
			writable:false,
			value:'BaseScene'
		})

		Object.defineProperty(this,'_active',{
			enumerable:false,
			configurable:false,
			writable:true,
			value:false
		})

		this.assets = {}
		this.children = []
	}

	/**
	 * This method must return and object with all the assets needed for this scene
	 * @abstract
	 * @return {{id:string, type:json|texture, url:string}[]} - Array of objects defining the id, type & url of the assets needed to preload
	 */
	static getAssets(){}
	/**
	 * This method can be implemented by inherited classes.
	 * @abstract
	 */
	init(){
		this._active = true
	}
	/**
	 * This method can be implemented by inherited classes. But always call super.update() on the overriding method.
	 * @public
	 */
	update(delta,elapsed){
		// Call update on all GameObject & GUIObject 
		this.children.forEach(child => {
			if(child.type === 'GameObject' || child.type === 'GUIObject'){
				child.update(delta,elapsed)	
			}
		})
	}
	/**
	 * Add and element to the scene
	 * @param {THREE.Object3D} item - Item to be inserted into the scene. Can be any Object3D subclass. 
	 */
	add(item){
		// We don't check if item is a sublcass of Object3D because THREE already does it. 
		this.children.push(item)
		// If the scene is active the item can be added at runtime
		if(this._active)
		{
			if(item.type === 'GUIObject'){
				this.engine.sceneGUI.add(item)
			} else {
				this.engine.scene3D.add(item)
			}
		}
	}

	/**
	 * Remove and element from the scene
	 * @param {THREE.Object3D} item - Item to be removed from the scene. The item must be a scene child. 
	 */
	remove(item){

		let idx = this.children.indexOf(item)
		if(idx === -1) {
			throw new Error('Only items in the scene can be removed from scene')
		}

		if(item.type === 'GUIObject')
		{
			this.engine.sceneGUI.remove(item)
		} else {
			this.engine.scene3D.remove(item)
		}

		this.children.splice(idx,1)

	}
	/**
	 * Calls destroy on each child and removes them from scene
	 */
	destroy(){
		this._active = false
		this.children.forEach(child => {
			if(child.type === 'GameObject' || child.type === 'GUIObject'){
				this.remove(child)
				child.destroy()
				delete this[child]
			}
		})
	}
}
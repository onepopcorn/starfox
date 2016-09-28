/*
 * Abstract class that works as a "template" for all in-game objects like Players, NPC's, etc.
 * For lights and other stuff use GameScene directly
 */

import { Mesh } from 'three'

export default class GameObject extends Mesh {
	constructor(...args) {
		super(args)
		if(this.constructor === GameObject){
			throw(new Error('Do not instantiate a GameObject directly. Use it to extend your game classes'));
		}
	}

	update(delta){}
	desstroy(){}
}
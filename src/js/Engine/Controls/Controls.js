/*
 * Should manage all allowed input types like keyboard,gamepad,VR
 * Should allow redefine input controls
 */

 import Keyboard from './Keyboard'
 import Gamepad from './Gamepad'
 import {INPUT_TYPE, INPUT_ACTION} from './Constants'

export default class Controls {
	constructor(inputType) {
		this.inputType = inputType || INPUT_TYPE.KEYBOARD
		this.controller = null;
		this.actions = {anyPressed:false}
		this.init = this.init.bind(this)
	}

	init(){
		switch(this.inputType) {
			case this.inputType.GAMEPAD:
				this.controller = new Gamepad(this.actions)
				break
			default:
				this.controller = new Keyboard(this.actions)
		}

		this.mapActions()
		this.resume()
	}

	mapActions() {
		Object.keys(INPUT_ACTION).map(
			key => this.actions[key] = false
		)
	}

	config(action,key){
		INPUT_ACTION[action] = key

	}

	resume() {
		this.controller.init()
	}

	stop() {
		/* Disabled all listeners and input interaction (e.g. cutscene or non interactive scene)  */
		this.controller.stop()
	}
}
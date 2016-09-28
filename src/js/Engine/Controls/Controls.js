/*
 * Should manage all allowed input types like keyboard,gamepad,VR
 * Should allow redefine input controls
 */

 import Keyboard from './Keyboard'
 import Gamepad from './Gamepad'

 const INPUT_TYPE = {
 	KEYBOARD: 'KEYBOARD',
 	GAMEPAD: 'GAMEPAD',
 	HEADSET: 'HEADSET'
 }

 const INPUT_ACTION = {
 	UP:'ArrowUp',
 	DOWN: 'ArrowDown',
 	LEFT: 'ArrowLeft',
 	RIGHT: 'ArrowRight',
 	SHOT: ' '
 }
export { INPUT_TYPE, INPUT_ACTION }

export default class Controls {
	constructor(inputType) {
		this.inputType = inputType || INPUT_TYPE.KEYBOARD;
		this.controller = null;
		this.actions = {};
		this.init = this.init.bind(this);
	}

	init(){
		switch(this.inputType) {
			case this.inputType.GAMEPAD:
				this.controller = new Gamepad(this.actions);
				break;
			default:
				this.controller = new Keyboard(this.actions);
		}

		this.mapActions();
		this.resume();
	}

	mapActions() {
		Object.keys(INPUT_ACTION).map(key => this.actions[key] = false)
	}

	config(action,key){
		INPUT_ACTION[action] = key;

	}

	resume() {
		this.controller.init();
	}

	stop() {
		/* Disabled all listeners and input interaction. Usage example: cutscene  */
		this.controller.stop();
	}
}
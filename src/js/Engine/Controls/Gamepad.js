/*
 * https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
 */

const supportEvents = 'ongamepadconnected' in window

export default class Gamepad {
	constructor(actions) {
		this.gamepads = {}
		this.actions = actions
		this.active = false
	}

	init() {
		window.addEventListener('gamepadconnected', this.onConnect.bind(this))
		window.addEventListener('gamepaddisconnected', this.onDisconnect.bind(this))
	}

	onConnect(evt) {

		// this.gamepads[evt.gamepad.index] = {
		// 		id:evt.gamepad.id,
		// 		nButtons:evt.gamepad.buttons.length,
		// 		nAxes:evt.gamepad.axes.length
		// 	}

		// this.gamepad = navigator.getGamepads()[evt.gamepad.index]
		// this.active = true
		this.addGamepad(evt.gamepad)
	}

	onDisconnect(evt) {
		console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
			evt.gamepad.index, evt.gamepad.id,
			evt.gamepad.buttons.length, evt.gamepad.axes.length);
	}

	addGamepad(gamepad) {
		this.gamepads[gamepad.index] = gamepad
	}

	removeGamepad(gamepad) {
		delete this.gamepads[gamepad.index]
	}

	scangamepads() {
	  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
	  for (var i = 0; i < gamepads.length; i++) {
	    if (gamepads[i]) {
	      if (gamepads[i].index in this.gamepads) {
	        this.gamepads[gamepads[i].index] = gamepads[i];
	      } else {
	        this.addGamepad(gamepads[i]);
	      }
	    }
	  }
	}


	update() {
		if(!supportEvents){
			this.scangamepads()
		}
		
		Object.keys(this.gamepads).forEach(idx =>{
			const pad = this.gamepads[idx]
			pad.buttons.forEach(btn => {
				const idx = pad.buttons.indexOf(btn)
				// if (btn.pressed)
				// 	console.log(`button ${idx} pressed`)
			})

			console.log("x: ", pad.axes[0].toFixed(1), "\ny: ", pad.axes[1].toFixed(1))

			// pad.axes.forEach(axe => {
			// 	const idx = pad.axes.indexOf(axe)
			// 	const clamp = axe.toFixed(1)
			// 	if(idx === 0)
			// 		const x = clamp > 0 ? 'left' : 'right'
			// 		console.log(x)
			// 	else if(idx === 1)
			// 		console.log(axe.toFixed(1))
			// })
		})
	}
}
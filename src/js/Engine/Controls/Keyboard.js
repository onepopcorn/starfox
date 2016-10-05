/* 
 * Should handle keyboard events to work with Controls class
 */
 import { INPUT_ACTION } from './Constants'

 export default class Keyboard {
 	constructor(actions){
 		this.actions = actions
 		this.onkeydown = this.onkeydown.bind(this)
 		this.onkeyup = this.onkeyup.bind(this)
 	}

 	init(){
 		window.addEventListener('keydown',this.onkeydown)
 		window.addEventListener('keyup',this.onkeyup)
 	}

 	onkeydown(evt){
 		Object.keys(this.actions).map(key => {
 			if(INPUT_ACTION[key] === evt.key){
 				evt.preventDefault()
 				this.actions[key] = true
 			}
 		})

 		this.anyPressedCheck()
 	}

 	onkeyup(evt){
 		Object.keys(this.actions).map(key => {
 			if(INPUT_ACTION[key] === evt.key){
 				evt.preventDefault()
 				this.actions[key] = false
 			}
 		})
 		this.anyPressedCheck()
 	}

 	anyPressedCheck(){
 		const anyPressed = Object.keys(this.actions).filter(action =>{
 			return action !== 'anyPressed' && this.actions[action] === true
 		})

 		this.actions.anyPressed = anyPressed.length > 0
 	}

 	stop() {
 		window.removeEventListener('keydown',this.onkeydown)
 		window.removeEventListener('keyup',this.onkeyup)
 	}
 } 
/** 
 * Class defining a Tween instance
 * 
 */
import * as Funcs from './EaseFunctions'

export default class Tween {
	constructor(initial, target, params) {
		// Params
		this._initValue    = Object.assign({},initial) // Ensure you take the values not a reference to the passed object
		this._target       = target
		this._easeFunc     = Funcs[params.ease]
		this._duration     = params.duration * 60
		this._loop         = params.loop || false
		this._loopCount    = params.loopCount || Infinity
		this._pingpong     = params.pingpong || false
		// Callbacks
		this._onStart      = params.onStart
		this._onFinish     = params.onFinish
		this._onUpdate     = params.onUpdate
		this._onLoop       = params.onLoop
		// Internals
		this._result       = Object.assign({},initial)
		this._isRunning    = false
		this._isFinished   = false
		this._timeIterator = 0
		this._count        = 0

		if(params.autoStart === true){
			this.start()
		}
	}

	start() {
		this._isRunning = true
		if(typeof this._onStart === 'function'){
			this._onStart.call(null,this._initValue)
		}
	}

	stop() {
		this.reset()
		this._isFinished = true
		this._count = 0
		if(this._pingpong) {
			this.swapValues()
		}
	}

	reset() {
		this._isRunning = false
		this._timeIterator = 0
	}

	restart() {
		this.reset()
		this.start()
	}

	swapValues() {
		let ref = Object.assign({}, this._target)
		Object.assign(this._target,this._initValue)
		Object.assign(this._initValue,ref)
		ref = null
	}

	update() {
		if(this._isRunning){
			
			Object.keys(this._target).forEach(val => {
			    this._result[val] = this._easeFunc(this._timeIterator,this._initValue[val],this._target[val] - this._initValue[val], this._duration)
			})
			
			if(typeof this._onUpdate === 'function'){
				this._onUpdate.call(null,this._result)
			}

			if(this._timeIterator === this._duration){
				this._count++
				
				if(this._loop && this._count < this._loopCount) {
					if(this._pingpong) {
						this.swapValues()
					}
					if(typeof this._onLoop === 'function'){
						this._onLoop.call(null,this._count)
					}

					this.restart()

				} else {
					this.stop()
					if(this._isFinished && typeof this._onFinish === 'function') {
						this._onFinish.call(null,this._result)
					}
				}
			
			} else {
				this._timeIterator++
			}
		}
	}
}
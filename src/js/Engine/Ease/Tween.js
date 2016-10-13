import * as Funcs from './EaseFunctions'

/** 
 * Class defining a Tween instanceS
 */
export default class Tween {
	/**
     * Options object that 
	 * @typedef {Object} EasingOptions
	 * @property {string} ease - Easing function wanted 
	 * @property {number} duration - Total easing duration
	 * @property {boolean} [autoStart=false] autoStart - Calls start method as soon as the tween is created. If false the start method must be called manually
	 * @property {boolean} [loop=false] loop - Indicates if the ease should loop or not 
	 * @property {number} [loopCount=Infinity] loopCount - Indicates how many times the ease should loop
	 * @property {boolean} [pingpong=false] pingpong - Indicates if the ease should alternate direction between each loop
	 * @property {function} [onStart=null] onStart - Callback invoked every time the ease starts
	 * @property {function(value:number)} [onUpdate=null] onUpdate - Callback invoked every time the value changes and receives the current ease value as a parameter
	 * @property {function(count:number)} [onLoop=null] onLoop - Callback invoked every time the ease starts a new iteration if loop is set to true. It receives the loop count as a parameter
	 * @property {function(value:number)} [onFinish=null] onFinish - Callback invoked every time the ease ends. It receive the last value of the easing
	 */

	/**
	 * @param {number} initial - Initial value where easing starts from
	 * @param {number} target - Target value where easeing ends
	 * @param {EasingOptions} params - Easing options
	 */
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
		this._onUpdate     = params.onUpdate
		this._onLoop       = params.onLoop
		this._onFinish     = params.onFinish
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
	/**
	 * This method starts the easing
	 * @public
	 *
	 */
	start() {
		this._isRunning = true
		if(typeof this._onStart === 'function'){
			this._onStart.call(null)
		}
	}
	/**
     * This method stops the easing, calls onFinish callback and returns it at it's original state
     * @public
	 */
	stop() {
		this._reset()
		this._isFinished = true
		this._count = 0
		// Back the init and final values at their original state
		if(this._pingpong) {
			this._swapValues()
		}

		if(this._isFinished && typeof this._onFinish === 'function') {
			this._onFinish.call(null)
		}
	}
	/**
	 * This method resets the ease time iterator. Used internally to handle ping-pong animations
	 * @private
	 */
	_reset() {
		this._isRunning = false
		this._timeIterator = 0
	}
	/**
	 * This method resets the ease params and starts it again. Used internally to handle ping-pong animationsç
	 * @private
	 */
	_restart() {
		this._reset()
		this.start()
	}
	/**
	 * -this method swaps the initial and final values of the ease. Used internally to handle ping-pong animations
	 * @private
	 */
	_swapValues() {
		let ref = Object.assign({}, this._target)
		Object.assign(this._target,this._initValue)
		Object.assign(this._initValue,ref)
		ref = null
	}
	/**
	 * This method applies the ease function and updates the iterator. This function MUST be called in a render loop to update the ease values. 
	 * @public
	 */
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
						this._swapValues()
					}
					if(typeof this._onLoop === 'function'){
						this._onLoop.call(null,this._count)
					}

					this._restart()

				} else {
					this.stop()
				}
			
			} else {
				this._timeIterator++
			}
		}
	}
}
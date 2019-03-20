import GUIObject from '../Engine/Display/GUIObject'
import { SpriteMaterial, Texture } from 'three'

export default class UISpiner extends GUIObject {
	constructor(imgPath){
		super()

		this.image = document.createElement('img')
		this.image.src = imgPath
			
		this.canvas = document.createElement('canvas')
		this.canvas.width = '782' 
		this.canvas.height = '23'
		
		this.ctx = this.canvas.getContext('2d')
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
		this.ctx.drawImage(this.image,0,0,this.image.width,this.image.height,0,0,this.image.width,this.image.height)

		this.texture = new Texture(this.canvas)		
		this.setTexture(this.texture)

	}

	progress(percent) {

		let width = this.canvas.width * percent / 100

		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
		// this.ctx.drawImage(this.image,0,0,percent,this.image.height,0,0,percent,this.image.height)
		this.ctx.drawImage(this.image,0,0,width,this.image.height)
		this.setTexture(this.texture)
	}

	update(){
		super.update()
	}
}
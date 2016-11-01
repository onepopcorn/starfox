import GUIObject from '../Engine/Display/GUIObject'
import { SpriteMaterial, Texture } from 'three'

export default class UISpiner extends GUIObject {
	constructor(imgPath){
		super()

		this.image = document.createElement('img')
		this.image.src = imgPath
			
		this.canvas = document.createElement('canvas')
		this.canvas.width = '256' 
		this.canvas.height = '64'
		
		this.ctx = this.canvas.getContext('2d')
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
		this.ctx.drawImage(this.image,0,0,this.image.width,this.image.height,0,0,this.image.width,this.image.height)

		this.texture = new Texture(this.canvas)		
		this.setTexture(this.texture)

	}

	progress(percent) {
		let topMargin = 7
		let leftMargin = 5
		let rightMargin = 10
		let bottomMargin = 15

		this.ctx.clearRect(leftMargin,topMargin,this.canvas.width-rightMargin,this.canvas.height - bottomMargin)
		this.ctx.drawImage(this.image,leftMargin,topMargin,percent,this.image.height - bottomMargin,leftMargin,topMargin,percent,this.image.height - bottomMargin)
		this.setTexture(this.texture)
	}

	update(){
		super.update()
	}
}
export default class Preloader {
	constructor(){
		this.el = document.createElement('div')
		this.el.className = 'preloader'
		
		this.progressBar = document.createElement('progress')
		this.progressBar.className = 'preloader-progress'
		this.progressBar.setAttribute('max',100)
		
		this.text = document.createElement('p')
		this.text.className = 'preloader-text'

		this.el.appendChild(this.text)
		this.el.appendChild(this.progressBar)

		this.onProgress = this.onProgress.bind(this)
	}

	init(){
		document.body.appendChild(this.el)
	}

	onProgress(id,progress) {
		this.text.innerHTML = `loading ${id}`
		this.progressBar.value = (progress.loaded * 100) / progress.total 

	}

	onCompleted() {
		document.body.removeChild(this.el)
	}
} 
/*
 * Should implement:
 * - ImageLoader
 * - JSONLoader
 * - OBJLoader
 * - MTLLoader
 * - ColladaLoader
 * - AudioLoader
 */

import { TextureLoader, JSONLoader } from 'three'

const ASSET_TYPE = {
	JSON: 'json',
	TEXTURE: 'texture',
	IMAGE: 'image'
} 

export default class SceneLoader {
	constructor(progressCallback){
		this.promiseQueue = []
		this.progressCallback = progressCallback

	}

	load(assets) {
		let current
		assets.forEach(asset =>{
			switch(asset.type){
				case ASSET_TYPE.JSON:
					current = new Promise((resolve,reject) =>{
						let loader = new JSONLoader() 
						loader.load(asset.url, 
							(geom,mat) => {resolve({id:asset.id,data:[geom,mat]})}, 
							progress => this.progress(asset,progress),
							error => reject(error)
						)
					})
					break
				case ASSET_TYPE.TEXTURE:
					current = new Promise((resolve,reject) =>{
						let loader = new TextureLoader()
						loader.load(asset.url,
							texture => resolve({id:asset.id,data:texture}),
							progress => this.progress(asset,progress),
							error => reject(error)
						)
					})
					break
				case ASSET_TYPE.IMAGE:
					current = new Promise((resolve,reject) =>{
						let loader = document.createElement('img')
						loader.onload = () => resolve({id:asset.id,data:loader.src})
						loader.onerror = () => reject()
						loader.src = asset.url
					})
					break
			}
			this.promiseQueue.push(current)
		})

		return Promise.all(this.promiseQueue)
	}

	progress(id,progress) {
		this.progressCallback(id,progress)
	}
}
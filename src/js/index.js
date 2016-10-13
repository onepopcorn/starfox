require('babel-polyfill')
import GameEngine from './engine/GameEngine'
import GameScene from './scenes/GameScene'

const game = new GameEngine('#container',GameScene,{fov:25});
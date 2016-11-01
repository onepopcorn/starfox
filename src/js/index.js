require('babel-polyfill')
import GameEngine from './engine/GameEngine'
import IntroScene from './scenes/IntroScene'

const game = new GameEngine('#container',IntroScene,{fov:25});
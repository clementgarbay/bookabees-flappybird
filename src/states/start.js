import Phaser from 'phaser'
import { restartGame } from '../main'

class Start {
  constructor (game) {
    this.game = game
  }

  preload () {
    this.game.load.image('title', 'assets/images/title.png')
    this.game.load.image('btnStart', 'assets/images/btn_start.png')
    this.game.load.image('background', 'assets/images/bg.png')
  }

  create () {
    // Game configuration
    this.game.stage.backgroundColor = '#fff'
    this.game.add.sprite(0, 0, 'background').scale.setTo(0.5, 0.5)

    // Add an overlay
    const overlay = this.add.graphics(0, 0)
    overlay.beginFill('#333', 0.3)
    overlay.drawRect(5, 5, this.game.world.width - 10, this.game.world.height - 5)
    overlay.endFill()

    // Title
    const titleImg = this.game.cache.getImage('title')
    this.game.add.sprite(this.game.world.centerX - titleImg.width * 0.25, 80, 'title').scale.setTo(0.5, 0.5)

    // Instruction
    this.game.add
      .text(0, 0, 'You need to press SPACE to make the bird fly.', { font: '15px Arial', fill: '#fff', boundsAlignH: 'center' })
      .setTextBounds(0, 160, this.game.world.width, 20)
    this.game.add
      .text(0, 0, 'Beware of the clouds!', { font: '15px Arial', fill: '#fff', boundsAlignH: 'center' })
      .setTextBounds(0, 180, this.game.world.width, 20)

    // Button try again
    const btnStartImg = this.game.cache.getImage('btnStart')
    this.game.add.button(
      this.game.world.centerX - btnStartImg.width * 0.25,
      this.game.world.centerY - btnStartImg.height * 0.25,
      'btnStart',
      restartGame
    ).scale.setTo(0.5, 0.5)

    // Map spacebar to start game function
    this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(restartGame)
  }
}

export default Start

import Phaser from 'phaser'
import { restartGame } from '../main'

class GameOver {
  constructor (game) {
    this.game = game
  }

  init (params) {
    this.score = params.score || 0
  }

  preload () {
    this.game.load.image('btnTryAgain', 'assets/images/btn_try-again.png')
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

    // Add score label
    this.game.add
      .text(0, 0, 'Score', { font: '30px Arial', fill: '#fff', boundsAlignH: 'center' })
      .setTextBounds(0, 80, this.game.world.width, 100)
    this.game.add
      .text(0, 0, this.score, { font: 'bold 50px Arial', fill: '#fff', boundsAlignH: 'center' })
      .setTextBounds(0, 130, this.game.world.width, 100)

    // Button try again
    const btnTryAgainImg = this.game.cache.getImage('btnTryAgain')
    this.game.add.button(
      this.game.world.centerX - btnTryAgainImg.width * 0.25,
      this.game.world.centerY - btnTryAgainImg.height * 0.25,
      'btnTryAgain',
      restartGame
    ).scale.setTo(0.5, 0.5)

    // Map spacebar to restart game function
    this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(restartGame)
  }
}

export default GameOver

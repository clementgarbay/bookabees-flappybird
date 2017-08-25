import { restartGame } from '../main'

class Start {
  constructor (game) {
    this.game = game
  }

  preload () {
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

    // Button try again
    const btnStartImg = this.game.cache.getImage('btnStart')
    this.game.add.button(
      this.game.world.centerX - btnStartImg.width * 0.25,
      this.game.world.centerY - btnStartImg.height * 0.25,
      'btnStart',
      restartGame
    ).scale.setTo(0.5, 0.5)
  }
}

export default Start

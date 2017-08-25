import Phaser from 'phaser'
import config from '../config'
import { gameOver } from '../main'

const random = (max, min = 0) => Math.floor(Math.random() * (max + 1 - min) + min)

class Game {
  constructor (game) {
    this.game = game
  }

  preload () {
    this.game.load.image('bird', 'assets/images/bird.png')
    this.game.load.image('obstacle_big', 'assets/images/obstacle_big.png')
    this.game.load.image('obstacle_medium', 'assets/images/obstacle_medium.png')
    this.game.load.image('obstacle_small', 'assets/images/obstacle_small.png')
    this.game.load.image('background', 'assets/images/bg.png')
  }

  create () {
    // Game configuration
    this.game.stage.backgroundColor = '#fff'
    this.game.add.sprite(0, 0, 'background').scale.setTo(0.5, 0.5)
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    // Init bird
    this.bird = this.game.add.sprite(100, this.game.world.height / 2, 'bird')
    // Add physics to the bird
    this.game.physics.arcade.enable(this.bird)
    // Add gravity to the bird to make it fall
    this.bird.body.gravity.y = config.birdGravity

    // Init obstacles
    this.obstacles = this.game.add.group()
    this.game.time.events.loop(config.obstacleLoopSpeed, this.addObstacles, this)

    // Init score
    this.score = 0
    this.labelScore = this.game.add.text(20, 20, '0', { font: '30px Arial', fill: '#fff' })

    // Map spacebar to jump function
    this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.jump, this)
  }

  update () {
    // If the bird is out of the screen, game over
    if (this.bird.y < 0 || this.bird.y > this.game.world.height) gameOver(this.score)
    // Game over when the bird collides an obstacle
    this.game.physics.arcade.overlap(this.bird, this.obstacles, () => gameOver(this.score), null, this)
  }

  jump () {
    this.bird.body.velocity.y = config.birdJump
  }

  addObstacle (x, y) {
    const obstacleImg = ['obstacle_big', 'obstacle_medium', 'obstacle_small'][random(2)]
    const obstacle = this.game.add.sprite(x, y, obstacleImg)

    this.obstacles.add(obstacle)

    // Add physics to the obstacle
    this.game.physics.arcade.enable(obstacle)
    // Add velocity to the obstacle to make it move left
    obstacle.body.velocity.x = config.obstacleMovementSpeed
    // Auto kill the obstacle when it's no longer visible
    obstacle.checkWorldBounds = true
    obstacle.outOfBoundsKill = true
  }

  addObstacles () {
    const hole = random(9, 2)

    // Add 10 obstacles
    Array.from(Array(10).keys()).forEach(i => {
      // Don't put obstacle the hole
      if (i !== hole && i !== hole + 1 && i !== hole - 1) {
        this.addObstacle(this.game.world.width, i * 60 + random(10, 5))
      }
    })

    // Increment score when a new line of obstacles is created
    this.score += 1
    this.labelScore.text = this.score
  }
}

export default Game

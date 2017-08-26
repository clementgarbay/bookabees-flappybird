(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default={screen:{width:450,height:600},birdGravity:1e3,birdJump:-350,obstacleLoopSpeed:1800,obstacleMovementSpeed:-200}},{}],2:[function(require,module,exports){(function(global){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.restartGame=restartGame;exports.gameOver=gameOver;var _phaser=typeof window!=="undefined"?window["Phaser"]:typeof global!=="undefined"?global["Phaser"]:null;var _phaser2=_interopRequireDefault(_phaser);var _config=require("./config");var _config2=_interopRequireDefault(_config);var _start=require("./states/start");var _start2=_interopRequireDefault(_start);var _game=require("./states/game");var _game2=_interopRequireDefault(_game);var _gameover=require("./states/gameover");var _gameover2=_interopRequireDefault(_gameover);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var game=new _phaser2.default.Game(_config2.default.screen.width,_config2.default.screen.height,_phaser2.default.AUTO,"game");game.state.add("start",_start2.default);game.state.add("game",_game2.default);game.state.add("gameOver",_gameover2.default);game.state.start("start");function restartGame(){game.state.start("game")}function gameOver(score){game.state.start("gameOver",true,false,{score:score})}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./config":1,"./states/game":3,"./states/gameover":4,"./states/start":5}],3:[function(require,module,exports){(function(global){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _phaser=typeof window!=="undefined"?window["Phaser"]:typeof global!=="undefined"?global["Phaser"]:null;var _phaser2=_interopRequireDefault(_phaser);var _config=require("../config");var _config2=_interopRequireDefault(_config);var _utils=require("../utils");var _main=require("../main");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var random=function random(max){var min=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;return Math.floor(Math.random()*(max+1-min)+min)};var Game=function(){function Game(game){_classCallCheck(this,Game);this.game=game}_createClass(Game,[{key:"preload",value:function preload(){this.game.load.image("bird","assets/images/bird.png");this.game.load.image("obstacle_big","assets/images/obstacle_big.png");this.game.load.image("obstacle_medium","assets/images/obstacle_medium.png");this.game.load.image("obstacle_small","assets/images/obstacle_small.png");this.game.load.image("background","assets/images/bg.png")}},{key:"create",value:function create(){this.game.add.sprite(0,0,"background").scale.setTo(.5,.5);this.game.physics.startSystem(_phaser2.default.Physics.ARCADE);this.bird=this.game.add.sprite(100,this.game.world.height/2,"bird");this.game.physics.arcade.enable(this.bird);this.bird.body.gravity.y=_config2.default.birdGravity;this.obstacles=this.game.add.group();this.game.time.events.loop(_config2.default.obstacleLoopSpeed,this.addObstacles,this);this.score=0;this.labelScore=this.game.add.text(20,20,"0",{font:"30px Arial",fill:"#fff"});this.game.input.keyboard.addKey(_phaser2.default.Keyboard.SPACEBAR).onDown.add(this.jump,this);if((0,_utils.isMobile)()){this.game.input.onDown.add(this.jump,this)}}},{key:"update",value:function update(){var _this=this;if(this.bird.y<0||this.bird.y>this.game.world.height)(0,_main.gameOver)(this.score);this.game.physics.arcade.overlap(this.bird,this.obstacles,function(){return(0,_main.gameOver)(_this.score)},null,this)}},{key:"jump",value:function jump(){this.bird.body.velocity.y=_config2.default.birdJump}},{key:"addObstacle",value:function addObstacle(x,y){var obstacleImg=["obstacle_big","obstacle_medium","obstacle_small"][random(2)];var obstacle=this.game.add.sprite(x,y,obstacleImg);this.obstacles.add(obstacle);this.game.physics.arcade.enable(obstacle);obstacle.body.velocity.x=_config2.default.obstacleMovementSpeed;obstacle.checkWorldBounds=true;obstacle.outOfBoundsKill=true}},{key:"addObstacles",value:function addObstacles(){var _this2=this;var hole=random(9,2);Array.from(Array(10).keys()).forEach(function(i){if(i!==hole&&i!==hole+1&&i!==hole-1){_this2.addObstacle(_this2.game.world.width,i*60+random(10,5))}});this.score+=1;this.labelScore.text=this.score}}]);return Game}();exports.default=Game}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"../config":1,"../main":2,"../utils":6}],4:[function(require,module,exports){(function(global){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _phaser=typeof window!=="undefined"?window["Phaser"]:typeof global!=="undefined"?global["Phaser"]:null;var _phaser2=_interopRequireDefault(_phaser);var _main=require("../main");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var GameOver=function(){function GameOver(game){_classCallCheck(this,GameOver);this.game=game}_createClass(GameOver,[{key:"init",value:function init(params){this.score=params.score||0}},{key:"preload",value:function preload(){this.game.load.image("btnTryAgain","assets/images/btn_try-again.png");this.game.load.image("background","assets/images/bg.png")}},{key:"create",value:function create(){this.game.add.sprite(0,0,"background").scale.setTo(.5,.5);var overlay=this.add.graphics(0,0);overlay.beginFill("#333",.3);overlay.drawRect(5,5,this.game.world.width-10,this.game.world.height-5);overlay.endFill();this.game.add.text(0,0,"Score",{font:"30px Arial",fill:"#fff",boundsAlignH:"center"}).setTextBounds(0,80,this.game.world.width,100);this.game.add.text(0,0,this.score,{font:"bold 50px Arial",fill:"#fff",boundsAlignH:"center"}).setTextBounds(0,130,this.game.world.width,100);var btnTryAgainImg=this.game.cache.getImage("btnTryAgain");this.game.add.button(this.game.world.centerX-btnTryAgainImg.width*.25,this.game.world.centerY-btnTryAgainImg.height*.25,"btnTryAgain",_main.restartGame).scale.setTo(.5,.5);this.game.input.keyboard.addKey(_phaser2.default.Keyboard.SPACEBAR).onDown.add(_main.restartGame)}}]);return GameOver}();exports.default=GameOver}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"../main":2}],5:[function(require,module,exports){(function(global){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _phaser=typeof window!=="undefined"?window["Phaser"]:typeof global!=="undefined"?global["Phaser"]:null;var _phaser2=_interopRequireDefault(_phaser);var _utils=require("../utils");var _main=require("../main");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var Start=function(){function Start(game){_classCallCheck(this,Start);this.game=game}_createClass(Start,[{key:"preload",value:function preload(){this.game.load.image("title","assets/images/title.png");this.game.load.image("btnStart","assets/images/btn_start.png");this.game.load.image("background","assets/images/bg.png")}},{key:"create",value:function create(){this.game.scale.scaleMode=_phaser2.default.ScaleManager.SHOW_ALL;this.game.scale.pageAlignHorizontally=true;this.game.scale.pageAlignVertically=true;this.game.stage.backgroundColor="#fff";this.game.add.sprite(0,0,"background").scale.setTo(.5,.5);var overlay=this.add.graphics(0,0);overlay.beginFill("#333",.3);overlay.drawRect(5,5,this.game.world.width-10,this.game.world.height-5);overlay.endFill();var titleImg=this.game.cache.getImage("title");this.game.add.sprite(this.game.world.centerX-titleImg.width*.25,80,"title").scale.setTo(.5,.5);var instructionKey=(0,_utils.isMobile)()?"click the screen":"press SPACE";this.game.add.text(0,0,"You need to "+instructionKey+" to make the bird fly.",{font:"15px Arial",fill:"#fff",boundsAlignH:"center"}).setTextBounds(0,160,this.game.world.width,20);this.game.add.text(0,0,"Beware of the clouds!",{font:"15px Arial",fill:"#fff",boundsAlignH:"center"}).setTextBounds(0,180,this.game.world.width,20);var btnStartImg=this.game.cache.getImage("btnStart");this.game.add.button(this.game.world.centerX-btnStartImg.width*.25,this.game.world.centerY-btnStartImg.height*.25,"btnStart",_main.restartGame).scale.setTo(.5,.5);this.game.input.keyboard.addKey(_phaser2.default.Keyboard.SPACEBAR).onDown.add(_main.restartGame)}}]);return Start}();exports.default=Start}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"../main":2,"../utils":6}],6:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var isMobile=exports.isMobile=function isMobile(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}},{}]},{},[2]);

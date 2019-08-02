// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var width = 790;
var height = 400;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);
var score = -2;
var labelScore = score
var player;
var gameGravity = 225;
var gameSpeed = 200;
var jumpPower = 200;
var pipes = [];
var pipeInterval = 1.75
var pipeGap = 100;
var scoreD;
var gapSize = 100;
var gapMargin = 50;
var blockHeight = 50;
var pipeEndExtraWidth = 10;
var pipeEndHeight = 25
var blockHeight = 50
var balloons = [];
var weights = [];
var bonusWidth = 50;
/*var easyMode = {
  pipeInterval: 3,
  gameSpeed: 170,
  gameGravity: 220,
  gapSize: 150
}
var normalMode = {
  pipeInterval: 1.75,
  gmaeSpeed: 200,
  gameGravity: 220,
  gapSize: 100
}
var modes = {
  easy: easyMode,
  normal: normalMode
};*/
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.image("playerImg", "../assets/Incognito2.png");
  game.load.audio("score", "..assets/point.ogg");
  game.load.image("pipeBlock","../assets/pipe.png");
  game.load.image("pipeEnd","../assets/pipe-end.png")
  game.load.image("balloons","../assets/balloons.png")
  game.load.image("weight","../assets/weight.png")
//  game.load.image("easyTag","../assets.easy.png")
  //game.load.image("normalTag","../assets/normal.png")
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.stage.setBackgroundColor("#668cff");
    game.add.tileSprite(0, 0, 790, 400)
  labelScore = game.add.text(20, 20, scoreD);
  player = game.add.sprite(40, 170, "playerImg");
  player.anchor.setTo(0.5, 0.5);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  player.body.gravity.y = gameGravity
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);
  game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, generate);
  game.input.onDown.add(playerJump);
  generate();
  /* = game.add.sprite(350, 100, "Easy");
  game.physics.arcade.enable(easyTag);
  easyTag.body.velocity.x = -gameSpeed;
  normalTag = game.add.sprite(350, 300, "normal")
  game.physics.arcade.enable(normalTag);
  normalTag.body.velocity.x = -gameSpeed;
  setMode(modes.easy);*/
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  if(player.body.y<-20){
    gameOver();
  }
  if(player.body.y>420){
    gameOver();
  }
  player.rotation = Math.atan(player.body.velocity.y / gameSpeed);
  checkBonus(balloons, -50);
  checkBonus(weights, 50);
}
/*  game.physics.arcade.overlap(player, easyTag, function(){
    easyTag.destroy();
    normalTag.destroy();
    setMode(modes.easy);
    game.time.event.loop(pipeInterval * Phaser.Timer.SECOND, generate);
  });
}*/

  function checkBonus(bonusArray, bonusEffect){
    for(var i = bonusArray.length - 1; i>=0; i = i - 1){
      if(bonusArray[i].body.x - bonusWidth < 0){
        bonusArray[i].destroy();
        bonusArray.splice(i, 1);} else{
      game.physics.arcade.overlap(player, bonusArray[i], function(){
        bonusArray[i].destroy();
        bonusArray.splice(i, 1);
        changeGravity(bonusEffect);
      });
    }
  }
   game.physics.arcade.overlap(player, pipes, gameOver);
}
/*function clickhandler(event) {
  game.add.sprite(event.x, event.y, "playerImg");
  game.sound.play("score")

}*/

//function spaceHandler() {
 //game.sound.play()

//}
  function generate(){
    var diceRoll = game.rnd.integerInRange(1, 10)
    if (diceRoll==1){
      generateBallons();
    } else if(diceRoll==2){
      generateWeights();
    } else {
      generatePipe();
    }

  }
  function generatePipe(){
   var gapStart = game.rnd.integerInRange(gapMargin, height - gapMargin - pipeGap);

   addPipeEnd(width-(pipeEndExtraWidth / 2), gapStart- pipeGap / 4);
   for (var y = gapStart - 75; y >-50; y-= blockHeight) {
     addPipeBlock(width, y);
   }

   addPipeEnd(width-(pipeEndExtraWidth / 2), gapStart + pipeGap);
  for(var y = gapStart + pipeGap + pipeEndHeight; y < height; y += blockHeight){
   addPipeBlock (width, y)
   }
   changeScore();
}

  function playerJump() {
     player.body.velocity.y= -jumpPower;
   }
  function addPipeBlock(x, y) {
    var block = game.add.sprite(x, y, "pipeBlock");
    pipes.push(block);
    game.physics.arcade.enable(block);
    block.body.velocity.x = -gameSpeed
  }
function addPipeEnd(x, y) {
  var block = game.add.sprite(x, y, "pipeEnd");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -gameSpeed
}
  function changeScore() {
    score+=1
    if(score==-2){
      scoreD=0
    }
    if(score==-1){
      scoreD=0
    }
    else {
      scoreD=score
    }
    labelScore.setText(scoreD.toString());
}
  function changeGravity(g) {
    gameGravity += g;
    player.body.gravity.y = gameGravity
  }

  function generateBallons(){
    var bonus = game.add.sprite(width, height, "balloons")
    balloons.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = -gameSpeed
    bonus.body.velocity.y = -game.rnd.integerInRange(60, 100)
  }

  function generateWeights(){
    var bonus = game.add.sprite(width, 0, "weight")
    weights.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = -gameSpeed;
    bonus.body.velocity.y = game.rnd.integerInRange(60, 100)
  }
  function setMode(mode) {
    pipeInterval = mode.pipeInterval;
    gameSpeed = mode.gameSpeed;
    gameGravity = mode.gameGravity;
    gapSize = mode.gapSize;
  }




  function gameOver() {
    score = -1;
    game.state.restart();

  }

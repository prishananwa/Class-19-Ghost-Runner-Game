var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  //adding the ghost 
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
  doorsGroup = new Group ();
  climbersGroup = new Group ();
  invisibleBlockGroup = new Group ();
}

function draw() {
  background(200);
  
if (gameState == "play"){
  
    if(tower.y > 400){
        tower.y = 300
      }
    
      //movements for the ghost
      if( keyDown("SPACE")) {
        //jumpSound.play( )
        ghost.velocityY = -5;
      }  
      ghost.velocityY = ghost.velocityY+0.8;
      
      if( keyDown("LEFT_ARROW")) {
          //jumpSound.play( )
          ghost.x = ghost.x-3;
      }
          
      if( keyDown("RIGHT_ARROW")) {
            //jumpSound.play( )
            ghost.x = ghost.x+3;
      }
    

      spawnDoors();
      if(climbersGroup.isTouching (ghost))
        ghost.velocityY = 0;

      // game end condition
      if(invisibleBlockGroup.isTouching (ghost) || ghost.y>600){
        ghost.destroy();
        gameState = "end";
      }
    
      drawSprites();
    }
    if (gameState == "end") {
      stroke ("yellow");
      fill ("yellow");
      textSize (27);
      text("Good Game",250,300);
    }
  }

  function spawnDoors() {
    //write code here to spawn the door
    if (frameCount % 240 === 0) {
      var door = createSprite(200,-50);
      door.x = Math.round(random(120,400));
      door.addImage(doorImg);
      
      //door.scale = 0.5;
      door.velocityY = 1;
    
      //creating climber
      var climber = createSprite(200,10);
      climber.x = door.x
      climber.addImage(climberImg);
      climber.velocityY = 1;

      // invisible block
      var invisibleBlock= createSprite (200,15);
      invisibleBlock.width  = climber.width;
      invisibleBlock.x = door.x
      invisibleBlock.height = 2;
      invisibleBlock.velocityY = 1;
      invisibleBlock.debug = false;

      //assign lifetime to the variable
      door.lifetime = 650;
      climber.lifetime = 650;
      invisibleBlock.lifetime = 650;

      //adjust the depth
      ghost.depth = door.depth;
      ghost.depth = ghost.depth+1;
      
      //add each door and climber to the group
      doorsGroup.add(door);
      climbersGroup.add(climber);
      invisibleBlockGroup.add(invisibleBlock);
    
      }

    }

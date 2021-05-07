var grandma, girl_running;
var goldCoin ,goldCoinImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground;
var background1,backgroundImage;

var score;
var rand;
var PLAY= 1;
var END = 0;
var gameState = PLAY;
var life;

function preload(){
girl_running =  loadImage("eagle.gif")
  
  girl_collided = loadAnimation("gameover.png");
  
  goldCoinImage = loadImage("Gold coin.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(500,600);
  
  girl = createSprite(80,500,70,70);
  girl.addImage("girl",girl_running);
  girl.addAnimation("collided",girl_collided);
  girl.scale = 0.4;
  
  ground = createSprite(250,575,500,20);
  ground.velocityX = -3;
  ground.x = ground.width /2;
  
  background1 = createSprite(250,300,800,1500);
  background1.addImage("background",backgroundImage);
  background1.x = background1.width /2;
 
  survivalTime = 0;
  
  score = 0;
  
  life = 2;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}
 
function draw() {
  background(0);

  girl.collide(ground);
  girl.depth = background1.depth+1;
    
  if(gameState === PLAY){
    background1.velocityX = -3;
    
  if (background1.x < 0){
      background1.x = background1.width/2;
    }

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  
   if(keyDown("space") && girl.y >= 377){
      girl.velocityY = -8;
    }
  
  if (background1.x<0){
    background1.x = background1.width /2;
     
   }    
  
  if (FoodGroup.isTouching(girl)){
    if(girl.scale<0.4) {
      girl.scale+=0.1;
    }
    
    FoodGroup.destroyEach();
    score = score+2;
    }
  
  if (obstacleGroup.isTouching(girl)){
      girl.scale = 0.2;
      girl.x = 200;
      life = life-1;
      obstacleGroup.destroyEach();
  }
 
  girl.setCollider("circle",0,0,250);
  
  switch(score){
    case 10:girl.scale = 0.3;
            break;
            
    case 20:girl.scale = 0.4;
            break;
            
    case 30:girl.scale = 0.5;
            break;
            
    case 40:girl.scale = 0.6;
            break;        
  }
    girl.velocityY = girl.velocityY + 0.4;
    
    spawnFood();
  
   spawnObstacles();
  
  
  if (life === 0){
    gameState = END;
  }
  }
  else if(gameState===END){
    background1.velocityX = 0;
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    background1.velocityX= 0;
    girl.changeAnimation ("collided",girl_collided);
  }
  
    girl.collide(ground);
  
   drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,500,50);
 }

function spawnFood(){
  if (frameCount%180 == 0){
    banana = createSprite(600,200,55,55);
    banana.addImage("banana",goldCoinImage);
    banana.scale = 0.1;
    banana.velocityX = - 3;
    banana.lifetime = 400/3;
    
    rand = Math.round(random(200,380));
    banana.y = rand;
    banana.x = rand;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount%235 == 0){
    obstacles = createSprite(600,450,35,35);
    obstacles.addImage ("obtacles",obstacleImage);
    obstacles.lifetime = 400;
    obstacles.scale = 0.15;
    obstacles.velocityX = -3;
    obstacleGroup.add(obstacles);
  }
}
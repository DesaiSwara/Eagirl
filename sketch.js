var grandma, girl_running;
var banana ,bananaImage, obstacle, obstacleImage;
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
  
  girl_collided = loadAnimation("sprite_7.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(600,600);
  
  girl = createSprite(80,500,50,50);
  girl.addImage("girl",girl_running);
  girl.addAnimation("collided",girl_collided);
  girl.scale = 0.2;
  
  ground = createSprite(250,575,1200,20);
  ground.velocityX = -3;
  ground.x = ground.width /2;
  
  background1 = createSprite(700,300,1500,1500);
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
    
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if (keyDown("e")) {
       image(girl_running,50,50);
    }
  
    if(keyDown("space") && girl.y >= 500&&girl.scale ==0.2){
      girl.velocityY = -12;
    }
  
  if(keyDown("space") && girl.y >= 470&&girl.scale ==0.3){
      girl.velocityY = -12;
    }
  
  if(keyDown("space") && girl.y >= 438&&girl.scale ==0.4){
      girl.velocityY = -12;
    }
  
  if(keyDown("space") && girl.y >= 408&&girl.scale ==0.5){
      girl.velocityY = -12;
    }
  
   if(keyDown("space") && girl.y >= 377&&girl.scale ==0.6){
      girl.velocityY = -12;
    }
  
  if (background1.x<0){
    background1.x = background1.width /2;
     
   }    
  
  if (FoodGroup.isTouching(girl)){
    FoodGroup.destroyEach();
    score = score+2;
    }
  
  if (obstacleGroup.isTouching(girl)){
      girl.scale = 0.2;
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
    banana = createSprite(600,200,40,40);
    banana.addImage("banana",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = - 3;
    banana.lifetime = 400/3;
    
    rand = Math.round(random(250,380));
    banana.y = rand;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount%300 == 0){
    obstacles = createSprite(600,530,50,50);
    obstacles.addImage ("obtacles",obstacleImage);
    obstacles.lifetime = 400;
    obstacles.scale = 0.2;
    obstacles.velocityX = -3;
    obstacleGroup.add(obstacles);
  }
}
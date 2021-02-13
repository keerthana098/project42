var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana, bananaImage;
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var gameOver, gameOverImage;
var score;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  gameOverImage = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  backgr.depth = backgr.depth - 1;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(390,200,40,10);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  gameOver.depth = backgr.depth + 1;

  FoodGroup = new Group();
  obstacleGroup = new Group();
  score = 0;
  
}

function draw() { 
  //background(0);

  if(gameState===PLAY)
  {
      if(backgr.x<100){
        backgr.x=backgr.width/2;
      }
      if(keyDown("space")) {
          player.velocityY = -12;
        }
        player.velocityY = player.velocityY + 0.8;



      if(FoodGroup.isTouching(player)){
        FoodGroup.destroyEach();
        score = score + 2;
        player.scale += 0.05;
      }
  

      if(obstacleGroup.isTouching(player)){
        gameState = END;
      }

      gameOver.visible = false;
      
    spawnFood();
    spawnObstacles();
}
  else if(gameState === END)
{
      backgr.velocityX = 0;
      player.visible = false;

      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();

      gameOver.visible = true;

      textSize(30);
      fill("black");
      text("Game Over!",390,200);

  }
    player.collide(ground);
  
    fill("white");
    text("score: "+score,50,50);

  drawSprites();
}

function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 80 === 0){
    var obstacle = createSprite(500,500,40,10);
    obstacle.y = random(300,350);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;

    obstacle.lifetime = 300;
    player.depth = obstacle.depth + 1;
    obstacleGroup.add(obstacle);
  }
}


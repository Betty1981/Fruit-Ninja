var PLAY = 1;
var END = 0;
var gameState = 1;

var sword, enemy, fruitGroup, enemyGroup;
var swordImage, monsterImage, fruit1, fruit2, fruit3, fruit4, gameoverImage;

function preload(){
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameoverImage = loadImage("gameover.png");
  gameOverSound=loadSound("gameover.mp3")
  knifeSwordSound=loadSound("knifeSwooshSound.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = height/1300;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();

  score = 0;
}

function draw() {
  background("skyblue")
   if(gameState === PLAY){
     fruits();
     Enemy();
     
     position = Math.round(random(1,2));
  
    if (position == 1) {
    fruits.x=width;
  }
     sword.y = World.mouseY;
     sword.x = World.mouseX;
     
      
     if (fruitGroup.isTouching(sword)) {
  fruitGroup.destroyEach();
    score=score+2;
    knifeSwordSound.play();
}
   }
   
     if (enemyGroup.isTouching(sword)) {
     gameState = END;
     fruitGroup.destroyEach();
     enemyGroup.destroyEach();
     fruitGroup.setVelocityXEach(0);
     enemyGroup.setVelocityXEach(0);
     sword.addImage(gameoverImage);
     sword.x = width/2;
     sword.y = height/2;
     gameOverSound.play();
   }
   
  drawSprites();
  
  text("Score: "+ score,width/2,height/10);
}

function fruits(){
    if(World.frameCount%80===0){ 
      fruit = createSprite(width,height/2);
      fruit.scale = 0.2;
      r=Math.round(random(1,4));
     if(r == 1) {
      fruit.x = width;
       fruit.addImage(fruit1);
     } else if (r == 2) {
       fruit.addImage(fruit2);
     } else if (r == 3) {
       fruit.addImage(fruit3);
     } else {
       fruit.addImage(fruit4);
     }
      
      fruit.y = Math.round(random(50,340));
      var set_position=Math.round(random(1,2));
  if (set_position==1){
    fruit.x = width;
    fruit.velocityX= -7
    }else{
      fruit.x = 0;
      fruit.velocityX= 7
    }
      fruit.lifetime = 100;
      fruitGroup.add(fruit);
    }
}
  
function Enemy(){
  if(World.frameCount %200 === 0){
    monster = createSprite(width,height/2);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100,300));
    var set_position=Math.round(random(1,2));
  if (set_position==1){
    monster.x = width;
    monster.velocityX = -(8+(score/10));
    }else{
      monster.x=0;
      monster.velocityX = 8+(score/10)
    }
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);
  }
}

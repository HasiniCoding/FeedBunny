const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var fruit_con;
var bunny
var balloon


function preload(){
  bgImage = loadImage("background.png")
  cbImage = loadImage("cut_button.png")
  melonImage = loadImage("melon.png")
  rabbitImage = loadImage("Rabbit-01.png")
  balloonImage = loadImage("balloon.png")
  muteImage = loadImage("mute.png")

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png")
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png")
  air = loadSound("air.wav")
  cut = loadSound("Cutting Through Foliage.mp3")
  eat = loadSound("eating_sound.mp3")
  rope_cut = loadSound("rope_cut.mp3")
  sad = loadSound("sad.wav")
  sound = loadSound("sound1.mp3")

  blink.playing = true
  eat.playing = true
  sad.playing = true

  eat.looping = false
  sad.looping = false
}


function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(isMobile){
    canW = displayWidth
    canH = displayHeight
    createCanvas(displayWidth + 80, displayHeight)
  }
  else{
    canW = windowWidth
    canH = windowHeight
    createCanvas(windowWidth, windowHeight)
  }
  frameRate(80);
  sound.play()
  sound.setVolume(0.1)
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canH,canW,20);
  rope = new Rope(6,{x: 245, y: 30})
  var options = {density:0.001}
  rope_2 = new Rope(7,{x: 370, y: 40})
  rope_3 = new Rope(7, {x:400, y:225})
  fruit = Bodies.circle(300,300,15, options)
  Matter.Composite.add(rope.body, fruit)
  fruit_con = new Link(rope, fruit)
  fruit_con_2 = new Link(rope_2, fruit)
  fruit_con_3 = new Link(rope_3, fruit)
  bunny = createSprite(170,canH-80)
  blink.frameDelay = 20
  bunny.addAnimation("blinking", blink)
  eat.frameDelay = 20
  //bunny.addAnimation("eating", eat)
  bunny.changeAnimation("blinking")
  sad.frameDelay = 20
  //bunny.addAnimation("sad", sad)
  bunny.scale  = 0.25

button = createImg('cut_button.png')
button.position(200,30)
button.size(50, 50)
button.mouseClicked(drop)

button_2 = createImg('cut_button.png')
button_2.position(330,35)
button_2.size(50, 50)
button_2.mouseClicked(drop_2)

button_3 = createImg('cut_button.png')
button_3.position(360,200)
button_3.size(50, 50)
button_3.mouseClicked(drop_3)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  //imageMode(CENTER)

  
 balloon = createImg('balloon.png')
 balloon.position(10,250) 
 balloon.size(150,100)
 balloon.mouseClicked(blow)


 mute = createImg('mute.png')
 mute.position(450,20)
 mute.size(50,50)
 mute.mouseClicked(muteSound)
}

function draw() 
{
  background(51);
  image(bgImage,0,0,windowWidth, windowHeight)
  ground.show();
  rope.show()
  rope_2.show()
  rope_3.show()
  if(fruit != null){
  image(melonImage,fruit.position.x, fruit.position.y, 70,70)
  }
  if(collide(fruit, bunny)===true){
    bunny.changeAnimation("eating")
    eat.play()
  }

  if(collide(fruit, ground.body)===true){
    bunny.changeAnimation("sad")
    sad.play()
  }
  
  Engine.update(engine);
  drawSprites()
  

 
   
}

function drop(){
  cut.play()
  rope.break()
  fruit_con.detach()
  fruit_con = null
  

}

function drop_2(){
  cut.play()
  rope_2.break()
  fruit_con_2.detach()
  fruit_con_2 = null
  

}

function drop_3(){
  cut.play()
  rope_3.break()
  fruit_con_3.detach()
  fruit_con_3 = null
  

}

function blow(){
  Matter.Body.applyForce(fruit, {x:0, y:0},{x:0.01, y:0})
  air.play()


}

function muteSound(){
  if(sound.isPlaying()){
    sound.stop()
  }
  else{
    sound.play()
  }

}


function collide(body, sprite){
if(fruit != null){
  var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
if(d<100 ){
  World.remove(world, fruit)
  fruit = null
  return true
  
}
else{
  return false
}
}
}
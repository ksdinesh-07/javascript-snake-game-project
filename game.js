let gameBoard=document.getElementById('gameboard')
let score_txt=document.getElementById('scoreval')
let context=gameBoard.getContext('2d')
let WIDTH=gameBoard.width;
let HEIGHT=gameBoard.height;
let score=0
let unit=25;
let foodx;
let foody;
let x_velocity=25;
let started=false;
let y_velocity=0;
let active=true;
let snake=[
  
    {x:unit*3,y:0},
    {x:unit*2,y:0},
    {x:unit,y:0},
    {x:0,y:0}


]

startgame()
function startgame(){
  context.fillStyle="#212121";
  context.fillRect(0,0,WIDTH,HEIGHT);
  createFood();
  displayFood();
  drawsnake();
  // movesnake();
  // clearboard();
  // drawsnake();
  //nextTick();
}

function clearboard(){
  context.fillStyle="#212121";
  context.fillRect(0,0,WIDTH,HEIGHT);
}

function displayFood(){
  context.fillStyle='#df3131ef';
  context.fillRect(foodx,foody,unit,unit);
}

function createFood(){
  foodx= Math.floor(Math.random()*WIDTH/unit)*unit
  foody=Math.floor(Math.random()*HEIGHT/unit)*unit
}

function drawsnake(){
  context.fillStyle='aqua'
  context.strokeStyle='#212121'
  snake.forEach((part)=>{
    context.fillRect(part.x,part.y,unit,unit)
    context.strokeRect(part.x,part.y,unit,unit)

  })
}

function movesnake(){
  const head={x:snake[0].x+x_velocity,y:snake[0].y+y_velocity}
  snake.unshift(head)
  if (snake[0].x==foodx && snake[0].y==foody){
    createFood()
    score+=1
    score_txt.innerHTML=score
  }
  else
    snake.pop();
}

function nextTick(){
  if (active) {
  setTimeout(()=>{
      clearboard()
      displayFood()
      movesnake()
      drawsnake()
      checkgameover()
      nextTick()
  },200)
}
else if(!active){
  clearboard();
  context.font='bold 50px serif'
  context.fillStyle="white";
  context.textAlign='center';
  context.fillText("Game Over!!",WIDTH/2,HEIGHT/2)
}
}

window.addEventListener('keydown',keypress)

function keypress(event){
  if (!started){
    started=true
    nextTick()
  }
  const left=37;
  const up=38;
  const right=39;
  const down=40;

  switch(true){
    case(event.keyCode==left && x_velocity!=unit):
      x_velocity=-unit;
      y_velocity=0;
      break;

    case(event.keyCode==right && x_velocity!=-unit):
      x_velocity=unit;
      y_velocity=0;
      break;

    case(event.keyCode==up && y_velocity!=unit ):
      x_velocity=0;
      y_velocity=-unit;
      break;
 
    case(event.keyCode==down && y_velocity!=-unit):
      x_velocity=0;
      y_velocity=unit;
      break;
  
  }
  
}

function checkgameover() {

  // Wall collision
  switch (true) {
    case (snake[0].x < 0):
    case (snake[0].x >= WIDTH):
    case (snake[0].y < 0):
    case (snake[0].y >= HEIGHT):
      active = false;
      break;
  }

  // Self collision
  for (let i = 1; i < snake.length; i++) {
    if (
      snake[0].x === snake[i].x &&
      snake[0].y === snake[i].y
    ) {
      active = false;
      break;
    }
  }
}
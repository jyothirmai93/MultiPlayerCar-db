var ball, db;
var ball_db_loc;  // for reffering location of ball in db
var position;

function setup(){
  createCanvas(500,500);

  //create data base
  db = firebase.database();
  console.log(db);

  //create sprite
  ball = createSprite(250,250,20,20);
  ball.shapeColor = "green";

  // linking nodes or childs in db
  ball_db_loc = db.ref('ball');
  ball_db_loc.on("value", readPosition, showError);
}

function draw(){
  background("white");

  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+1);
  }
  
  drawSprites();
  
}


function showError(){
  console.log("Error in writing to the database");
}

function readPosition(data){
  //getting position from data and updating in local
  position = data.val();
  console.log(position.x);

  ball.x = position.x;
  ball.y = position.y;
}

function writePosition(a,b){
  // changing x, y childs in db (which are in json format)
  ball_db_loc.set({
    'x': position.x + a,
    'y': position.y + b
  })
}


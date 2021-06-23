var ball;
var database;
var position;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    database = firebase.database();
    //create a refrence 
    var posRef = database.ref('ball/pos');
    //cretea a listener using .on()
    //call back
    posRef.on("value",readPos,showErr)
}
function readPos(data){
    position = data.val();
    console.log(position);
    ball.x = position.x;
    ball.y = position.y

}

function showErr(){
    console.log("Error");
}
function draw(){
    background("white");
    if(position  != undefined){
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
}
    drawSprites();
}

function changePosition(x,y){
    var posRef = database.ref('ball/pos');
    posRef.set({
        x: position.x + x ,
        y: position.y + y
    });
  
}

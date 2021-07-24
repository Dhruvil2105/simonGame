
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id"); //id of click button
  userClickedPattern.push(userChosenColour); // click button store in userClickPattern[].
 
  playSound(userChosenColour);
  animatePress(userChosenColour); 
  checkAnswer(userClickedPattern.length-1);//
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("sucess");

    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press any Key to restart.");

    startOver(); //for restart the game.

  }
}


function nextSequence() {
  userClickedPattern=[];//called function then reset pattern.
  level++; //incresce level for next sequencce.
  $("#level-title").text("Level " + level); //update lavel .

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // for flashh animation 
  $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // #red in html page.

 // for coloursound.
  playSound(randomChosenColour);  
}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed"); //from css.

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed"); //after 100ms remove class.
  }, 100);

}

function startOver(){

  level = 0;
  gamePattern = [];
  started = false;
}
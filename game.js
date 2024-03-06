var  gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var buttonColours = ["red" , "blue" , "green" , "yellow"];


//To start Game
$(document).keypress(function () {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//Gave generating colours : 
function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColour = buttonColours[randomNumber];   
    gamePattern.push(randomChoosenColour);

    $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour);
    level++;
    $("#level-title").text("Level " + level);   
    console.log("game pattern : " +gamePattern);

}

// User selecting colours:

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour)
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length -1 ); 
})

function playSound(name)  {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setInterval(function (){
        $("#"+currentColour).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);
        
        $("#level-title").text("Game Over, Press Any Key to Restart");   
        console.log("Wrong");
        startOver();
    } 
}

function startOver() { 
    level = 0;
    gamePattern = [];
    started = false;
}


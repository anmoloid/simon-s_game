var userClickedPattern=[]
var buttonColours=["red", "blue", "green", "yellow"]
var gamePattern=[]
var counter=0;
var level=0;

//code to find the user selected button and playsound and animate

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id")
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
})

//function to generate the next sequence

function nextSequence()
{
    userClickedPattern=[];
    level+=1;
    var randomNumber=Math.floor(Math.random()*4)
    var randomChosenColour=buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour) 
    $("#level-title").text("Level "+level);
}

//function to play sound

function playSound(name)
{
    switch(name)
    {
        case "red":
            var audio=new Audio('/Users/anmolagarwal/Documents/web development/Simon Game Challenge Starting Files/sounds/red.mp3');
            audio.play();
            break;
        case "blue":
            var audio=new Audio('/Users/anmolagarwal/Documents/web development/Simon Game Challenge Starting Files/sounds/blue.mp3');
            audio.play();
            break;
        case "green":
            var audio=new Audio('/Users/anmolagarwal/Documents/web development/Simon Game Challenge Starting Files/sounds/green.mp3');
            audio.play();
            break;
        case "yellow":
            var audio=new Audio('/Users/anmolagarwal/Documents/web development/Simon Game Challenge Starting Files/sounds/yellow.mp3');
            audio.play();
            break;
    }
}

//function to animate the button when its clicked 

function animatePress(currentColour)
{

  $("#"+ currentColour).addClass("pressed")
  setTimeout(function(){
  $("#"+ currentColour).removeClass("pressed");
  }, 100)
}


$(document).keypress(function(){
    counter+=1;
    $("#level-title").text("Level 0");
    if (counter === 1)
    {
     nextSequence();
    }
    console.log(counter);
    
})

function checkAnswer(currentLevel)
{
   if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
   {
    console.log("success")
    if(userClickedPattern.length === gamePattern.length)
    {
        setTimeout(nextSequence(),1000);
    }
 
   }
   else
   {
    var audio=new Audio('/Users/anmolagarwal/Documents/web development/Simon Game Challenge Starting Files/sounds/wrong.mp3');
    audio.play();
    $("body").addClass("game-over")
    setTimeout(function(){
        $("body").removeClass("game-over");
        }, 200)
    $("#level-title").text("Game Over, Press any key to restart")
    startOver()
   }
}
function startOver()
{
  counter=0;
  gamePattern=[];
  level=0;
}


var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var userChosenColour;
var userClickedPattern = [];
var level = 0;
var i = 0;
$(document).ready(function() {
    turnOn();
});

function nextSequence() {
    $(".btn").off("click");
    level++;
    setLevel();
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour)
        .fadeOut(100)
        .fadeIn(100);
    playsound(randomChosenColour);

    i = 0;
    userClickedPattern = [];
    buttonClick();
}

function buttonClick() {
    $(".btn").click(function(e) {
        animatePress(e.target.id);
        playsound(e.target.id);
        userChosenColour = e.target.id;
        userClickedPattern.push(userChosenColour);
        i++;
        if (i == level) {
            checkAnswer();
        } else {
            stepCheck(i);
        }
    });
}

function playsound(name) {
    var audio = new Audio("/Game/sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function setLevel() {
    $("h1").text("Level " + level);
}

function turnOn() {
    $(document).keypress(function(e) {
        if ((e.key == "a" || e.key == "A") && level == 0) {
            setLevel();
            nextSequence();
        }
    });
}

function checkAnswer() {
    $(".btn").off("click");
    if (JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern)) {
        setTimeout(function() {
            nextSequence();
        }, 1000);
    } else {
        gameOver();
    }
}

function gameOver() {
    $("h1").text("Game over press any key to restart");
    $(document.body).css("background-color", "red");
    playsound("wrong");
    setTimeout(function() {
        $(document.body).css("background-color", "#011F3F");
    }, 200);
    $(document).keypress(function(e) {
        startOver();
    });
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    i = 0;
    randomChosenColour = null;
    userChosenColour = null;
    $("h1").text("Press A Key to Start");
    $(document).off("keypress");
    turnOn();
}

function stepCheck(x) {
    console.log(userClickedPattern[x - 1]);
    if (userClickedPattern[x - 1] != gamePattern[x - 1]) {
        gameOver();
    }
}
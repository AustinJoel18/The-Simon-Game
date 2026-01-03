var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  var colorID = "#" + randomChosenColour;
  $(colorID).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").click(function () {
  if (started) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  }
});

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keydown(function () {
  if (!started) {
    started = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    $("#level-title").text("Correct! ");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("#level-title").text("Wrong Move! ");
    setTimeout(function () {
      $("#level-title").text("Game Over! Press any key to Restart...");
    }, 1000);

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 1000);

    setTimeout(function () {
      startOver();
    }, 1000);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

let popup = document.getElementById("popup");

function openPopup() {
  popup.classList.add("open-popup");
  popup.classList.add("body.popup-open");
}
function closePopup() {
  popup.classList.remove("open-popup");
}

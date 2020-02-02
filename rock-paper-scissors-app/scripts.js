/***/
/* Declare variables
/***/
// Content wrapper
const wrapperBody = document.getElementById("wrapper-body");

// Rules button variables
const btnRules = document.getElementById("btn-rules");
const btnCloseRules = document.getElementById("btn-close-modal");
const wrapperRulesModal = document.getElementById("wrapper-rules-modal");
const modalOverlay = document.getElementById("wrapper-modal-overlay");
const rulesVariables = [btnRules, btnCloseRules, wrapperRulesModal, modalOverlay];

// Rock, Paper, Scissors Buttons
const btnPaperStep1 = document.getElementById("paper-step-1-btn");
const btnScissorsStep1 = document.getElementById("scissors-step-1-btn");
const btnRockStep1 = document.getElementById("rock-step-1-btn");

// Wrapper div's for buttons
const wrapperStep1 = document.getElementsByClassName("wrapper-rps-btns")[0];
const wrapperStep2 = document.getElementsByClassName("wrapper-step-two")[0];

const wrapperRockStep2 = document.getElementsByClassName("wrapper-rock-icon-2")[0];
const wrapperPaperStep2 = document.getElementsByClassName("wrapper-paper-icon-2")[0];
const wrapperScissorsStep2 = document.getElementsByClassName("wrapper-scissors-icon-2")[0];

const wrapperBlankHouse = document.getElementsByClassName("wrapper-blank-house-2")[0];

const wrapperRockStep3 = document.getElementsByClassName("wrapper-rock-icon-house-3")[0];
const wrapperPaperStep3 = document.getElementsByClassName("wrapper-paper-icon-house-3")[0];
const wrapperScissorsStep3 = document.getElementsByClassName("wrapper-scissors-icon-house-3")[0];

// Wrapper for animations
const animationDivPaper = document.getElementsByClassName("animated")[0];
const animationDivScissors = document.getElementsByClassName("animated")[1];
const animationDivRock = document.getElementsByClassName("animated")[2];

const transitionYouPicked = document.getElementsByClassName("wrapper-you-picked")[0];
const transitionHousePicked = document.getElementsByClassName("wrapper-house-picked")[0];

// Who won heading text
const youWin = document.getElementsByClassName("win")[0];
const youLose = document.getElementsByClassName("lose")[0];
const youDraw = document.getElementsByClassName("draw")[0];
const playAgainBtn = document.getElementsByClassName("play-again")[0];
let winLoseDrawText = '';

// Array of custom animation class names
const animations = ['bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'swing', 'tada', 'wobble', 'jello', 'heartBeat', 'bounceInRight', 'bounceIn', 'fadeInRight', 'flipInX', 'flipInY', 'rotateInDownRight', 'zoomInRight', 'jackInTheBox'];
//
let randomNum2 = 0;
let randomAnimationClass = null;

// Save the users Pick - Either Rock, Paper, or Scissors
let playerPick = '';
// Save the house Pick - Either Rock, Paper, or Scissors
let housePick = '';
// Variable to hold a random number that will be generated to determine the house pick
let randomNum = 0;

// Player Score
const playerScoreHTML = document.getElementsByClassName("score-number")[0];
let playerScoreNum = 0;

/***/
/* Useful Functions
/***/
// 1 > Toggles "display:none" css class
displayNoneToggle = (elChange1, elChange2, elChange3) => {
  elChange1.classList.toggle('close');
  if (elChange2) {
    elChange2.classList.toggle('close');
  }
  if (elChange3) {
    elChange3.classList.toggle('close');
  }
};

// 2 > Toggles Rules modal open/close
toggleModal = (elClick, elChange1, elChange2) => {
  elClick.addEventListener("click", () => {
    displayNoneToggle(elChange1, elChange2);
  });
};

// 3 > Decide the house pick
randomHousePick = () => {
  // Random number generator between 1 and 3
  randomNum = Math.floor(Math.random() * 3) + 1;
  // House Picked: 1 = Rock, 2 = Paper, 3 = Scissors
  if (randomNum === 1) {
    housePick = "rock";
  } else if (randomNum === 2) {
    housePick = "paper";
  } else {
    housePick = "scissors";
  }
}

// 4 > Random custom animation for House Pick
randomAnimation = () => {
  if (randomAnimationClass) {
    resetRandomAnimationClass(animationDivPaper, animationDivScissors, animationDivRock);
  }

  randomNum2 = Math.floor(Math.random() * animations.length);
  randomAnimationClass = animations[randomNum2];
  addRandomAnimationClass(animationDivPaper, animationDivScissors, animationDivRock);
}

// 5 > Apply random animation to elements
addRandomAnimationClass = (elChange, elChange2, elChange3) => {
  elChange.classList.add(randomAnimationClass);
  if (elChange2) {
    elChange2.classList.add(randomAnimationClass);
  }
  if (elChange3) {
    elChange3.classList.add(randomAnimationClass);
  }
}

// 6 > Reset random animation to elements
resetRandomAnimationClass = (elChange, elChange2, elChange3) => {
  elChange.classList.remove(randomAnimationClass);
  if (elChange2) {
    elChange2.classList.remove(randomAnimationClass);
  }
  if (elChange3) {
    elChange3.classList.remove(randomAnimationClass);
  }
}

// 7 > Winner background effect
addWinnerBackgroundCircles = (playerOutcome, elWinner) => {
  // Save playerOutcome for later use
  winLoseDrawText = playerOutcome;
  // Change the result heading text to Win / Lose / Draw
  if (playerOutcome === "win") {
    displayNoneToggle(youWin);
  } else if (playerOutcome === "lose") {
    displayNoneToggle(youLose);
  } else {
    displayNoneToggle(youDraw);
  }
  displayNoneToggle(playAgainBtn);
  // Check if there is a winner - If so show winner background circles
  if (elWinner) {
    elWinner.classList.add("win-background");
  }
}

// 8 > Checks who won then calls function to show win/lose/draw text and background effect
whoWon = () => {
  if (playerPick === housePick) {
    addWinnerBackgroundCircles("draw");
  } else if (playerPick === "paper") {
    if (housePick === "scissors") {
      addWinnerBackgroundCircles("lose", wrapperScissorsStep3);
    } else {
      addWinnerBackgroundCircles("win", wrapperPaperStep2);
      addOneToScore();
    } 
  } else if (playerPick === "scissors") {
    if (housePick === "paper") {
      addWinnerBackgroundCircles("win", wrapperScissorsStep2);
      addOneToScore();
    } else {
      addWinnerBackgroundCircles("lose", wrapperRockStep3);
    }
  } else if (playerPick === "rock") {
    if (housePick === "paper") {
      addWinnerBackgroundCircles("lose", wrapperPaperStep3);
    } else {
      addWinnerBackgroundCircles("win", wrapperRockStep2);
      addOneToScore();
    }
  }
}

// 9 > Add one point to players score
addOneToScore = () => {
  playerScoreNum++;
  playerScoreHTML.innerHTML = playerScoreNum;
  // Save score to local storage
  window.localStorage.setItem("score", playerScoreNum);
}

// Check local storage for player score, if a previous score exists update HTML
if (window.localStorage.length > 0) {
  playerScoreNum = window.localStorage.getItem("score");
  playerScoreHTML.innerHTML = playerScoreNum;
}

// 10 > Toggle transition to seperate wrappers on step 3
transitionToggle = () => {
  transitionYouPicked.classList.toggle("transition-you-picked");
  transitionHousePicked.classList.toggle("transition-house-picked");
}


/***/ 
/* Proceed to step 2
/***/
// Click event listener to proceed to step 2
nextStep2 = (elClick, elChange1, elChange2) => {
  elClick.addEventListener("click", () => {
    displayNoneToggle(elChange1, elChange2);

    // After player picks - House randomly picks
    randomHousePick();

    // Add a random animation to House Pick
    randomAnimation();
   
    // If Paper is chosen
    if (elClick === btnPaperStep1) {
      playerPick = "paper";
      displayNoneToggle(wrapperPaperStep2);
    } 
    
    // If Scissors is chosen
    if (elClick === btnScissorsStep1) {
      playerPick = "scissors";
      displayNoneToggle(wrapperScissorsStep2);
    }
    
    // If Rock is chosen
    if (elClick === btnRockStep1) {
      playerPick = "rock";
      displayNoneToggle(wrapperRockStep2);
    }

    // Proceed to Step 3 - Show what the House picked
    nextStep3();
  });
};


/***/ 
/* Proceed to step 3
/***/
nextStep3 = () => {
  // Delay showing house pick by 0.5 sec for dramatic effect 
  setTimeout(function() {
    if (housePick === "rock") {
      // Hide blank circle and show house pick with animation
      displayNoneToggle(wrapperBlankHouse, animationDivRock);
    } else if (housePick === "paper") {
      displayNoneToggle(wrapperBlankHouse, animationDivPaper);
    } else {
      displayNoneToggle(wrapperBlankHouse, animationDivScissors);
    }
  }, 0.50 * 1000);
  // Create small animation transition
  setTimeout(function() {
    transitionToggle();
  }, 1.5 * 1000);
  // Show text of who won with 1.5 sec delay
  setTimeout(function() {
    whoWon();
  }, 2 * 1000);
}


/***/
/* Rules Modal
/***/
// Close modal on page load
displayNoneToggle(wrapperRulesModal, modalOverlay);

// Bottom right Rules button - Opens rules modal
toggleModal(btnRules, wrapperRulesModal, modalOverlay);

// Top right 'X' close button - Closes ruels modal
toggleModal(btnCloseRules, wrapperRulesModal, modalOverlay)

// Clicking outside of modal closes modal
toggleModal(modalOverlay, wrapperRulesModal, modalOverlay)


/***/
/* Step 1 - Choose Rock, Paper or Scissors buttons
/***/
// On page load - show step 1
displayNoneToggle(wrapperStep2);

// On page load - Hide all step 2 & step 3
displayNoneToggle(wrapperRockStep2, wrapperPaperStep2, wrapperScissorsStep2);
displayNoneToggle(animationDivPaper, animationDivScissors, animationDivRock);

// Selecting a choice proceeds to step 2
nextStep2(btnPaperStep1, wrapperStep1, wrapperStep2)
nextStep2(btnScissorsStep1, wrapperStep1, wrapperStep2)
nextStep2(btnRockStep1, wrapperStep1, wrapperStep2)


/***/
/* Step 5 - Play again
/***/
playAgainBtn.addEventListener("click", () => {
  // Save winner background element if it exists
  let winningElement = document.getElementsByClassName("win-background")[0];
  // hide winner background
  if (winningElement) {
    winningElement.classList.toggle("win-background");
  }

  // Hide house pick
  if (housePick === 'scissors') {
    displayNoneToggle(animationDivScissors);
  } else if (housePick === 'paper') {
    displayNoneToggle(animationDivPaper);
  } else {
    displayNoneToggle(animationDivRock);
  }

  // Hide player pick
  if (playerPick === 'scissors') {
    displayNoneToggle(wrapperScissorsStep2);
  } else if (playerPick === 'paper') {
    displayNoneToggle(wrapperPaperStep2);
  } else {
    displayNoneToggle(wrapperRockStep2);
  }

  // Show step 1 and hide step 2 and blank house
  displayNoneToggle(wrapperStep1, wrapperStep2, wrapperBlankHouse);

  // Hide Win / Lose / Draw text and play again button
  if (winLoseDrawText === "win") {
    displayNoneToggle(youWin);
  } else if (winLoseDrawText === "lose") {
    displayNoneToggle(youLose);
  } else {
    displayNoneToggle(youDraw);
  }
  displayNoneToggle(playAgainBtn);

  // Reset transition animation of wrappers
  transitionToggle();
})
let toss = document.querySelector(".toss");
let option = document.querySelector(".options");
let compTossWin = document.querySelector(".computer-win-toss")
let compTossWinMessage = document.querySelector(".computer-toss-win-message");
let tossOption = document.querySelectorAll(".toss-option");
let userChoice = document.querySelectorAll(".bat-bowl-option");

let tossArray = ["head", "tail"];

tossOption.forEach((option) => {
    option.addEventListener("click", (event) => {
        let userTossChoice = event.target.id;
        console.log(userTossChoice);
        toss.style.display = "none";
        randomTossResult(userTossChoice);
    })
})

let userChoiceBatBowl = "";
let compChoiceBatBowl = "";

function randomTossResult(userTossChoice) {
    let index = Math.floor(Math.random() * 2);
    let computerTossChoice = tossArray[index];
    console.log(computerTossChoice);

    if (userTossChoice != computerTossChoice) {

        option.style.display = "none";
        compTossWin.style.display = "flex";

        if (computerTossChoice == 'head') {
            compTossWinMessage.innerHTML = "Computer Won the Toss, Choose to Bat First";
            compChoiceBatBowl += "bat";
            userChoiceBatBowl += "bowl";
            // console.log(compChoiceBatBowl);
        }
        else {
            compTossWinMessage.innerHTML = "Computer Won the Toss, Choose to Bowl First";
            compChoiceBatBowl += "bowl";
            userChoiceBatBowl += "bat";
            // console.log(compChoiceBatBowl);
        }
    }
    else {
        option.style.display = "flex";
        compTossWin.style.display = "none";
    }
}
let playing = document.querySelector(".playground")
userChoice.forEach((choice) => {
    choice.addEventListener("click", (e) => {
        userChoiceBatBowl = e.target.id;
        // console.log(userChoiceBatBowl);
        if (userChoiceBatBowl === "bat") {
            compChoiceBatBowl += "bowl";
        }
        else {
            compChoiceBatBowl += "bat";
        }
        option.style.display = "none";
        playing.style.display = "flex";
        playground(compChoiceBatBowl, userChoiceBatBowl);
    })
})

let play = document.querySelector(".play-start");
function startPlay(){
    playing.style.display = "flex";
    compTossWin.style.display = "none";
    playground(compChoiceBatBowl, userChoiceBatBowl);
}

let bat = document.querySelector(".batter");
let message = document.querySelector(`.message`);
let target = 0;
let win = false;

async function playground(compChoiceBatBowl, userChoiceBatBowl) {
    let firstBatter = "";
    let secondBatter = "";

    // Determine which side is batting first
    if (compChoiceBatBowl === "bat") {
        firstBatter = "COMPUTER";
        secondBatter = "USER";
        bat.innerHTML = "COMPUTER";
    }
    if (userChoiceBatBowl === "bat") {
        firstBatter = "USER";
        secondBatter = "COMPUTER";
        bat.innerHTML = "USER";
    }

    // First innings
    target = await firstInnings(firstBatter);
    message.innerHTML = `${secondBatter} needs ${target} runs to Win`;
    // bat.innerHTML = `${secondBatter}`;

    // Second innings
    win = await secondInnings(secondBatter, target);

    // Update message based on the result
    if (win) {
        message.innerHTML = `${secondBatter} Wins!`;
    } else {
        message.innerHTML = `${firstBatter} Wins!`;
    }
}

//update user Picture
let userPic = document.querySelector(".user-img");
function updateUserHandPic(strike){
    switch(strike){
        case 0:
            userPic.src = "0.jpg";
            break;
        case 1:
            userPic.src = "1.jpg";
            break;
        case 2:
            userPic.src = "2.jpg";
            break;
        case 3:
            userPic.src = "3.jpg";
            break;
        case 4:
            userPic.src = "4.jpg";
            break;
        case 5:
            userPic.src = "5.jpg";
            break;
        case 6:
            userPic.src = "6.jpg";
            break;
    }
}

//update computer Picture
let computerPic = document.querySelector(".comp-img");
function updateComputerHandPic(strike){
    switch(strike){
        case 0:
            computerPic.src = "0.jpg";
            break;
        case 1:
            computerPic.src = "1.jpg";
            break;
        case 2:
            computerPic.src = "2.jpg";
            break;
        case 3:
            computerPic.src = "3.jpg";
            break;
        case 4:
            computerPic.src = "4.jpg";
            break;
        case 5:
            computerPic.src = "5.jpg";
            break;
        case 6:
            computerPic.src = "6.jpg";
            break;
    }
}

let ballCount = 0;
let runCount = 0;
let wicketCount = 0;

//Select the elements which update runs, wickets, balls
let runsInfo = document.querySelector(".runs");
let ballsInfo = document.querySelector(".balls");
let wicketsInfo = document.querySelector(".wickets");

//Select User Input from buttons
let keypad = document.querySelectorAll(".keypad");
function userChoiceKey() {
    return new Promise((resolve) => {
        // Add click event listeners to number keys
        keypad.forEach((key) => {
            key.addEventListener("click", (btn) => {
                // Extract the clicked number from the button's ID
                const pressKey = parseInt(btn.target.id);
                console.log(pressKey);

                // Remove event listeners to prevent multiple clicks
                keypad.forEach((key) => {
                    key.removeEventListener("click", clickHandler);
                });

                // Resolve the promise with the selected key
                resolve(pressKey);
            });
        });

        // Define click handler function
        function clickHandler() {
            // Extract the clicked number from the button's ID
            const pressKey = parseInt(this.id);
            console.log(pressKey);

            // Remove event listeners to prevent multiple clicks
            keypad.forEach((key) => {
                key.removeEventListener("click", clickHandler);
            });

            // Resolve the promise with the selected key
            resolve(pressKey);
        }

        // Add the click event listener to all number keys for next round
        keypad.forEach((key) => {
            key.addEventListener("click", clickHandler);
        });
    });
}

async function firstInnings(batter) {
    let userStrike = null;

    while (wicketCount !== 1 && userStrike === null) {
        // Wait for user to select a key
        userStrike = await userChoiceKey();
    }

    while (wicketCount !== 1) {
        // Update user's photo according to selected key
        updateUserHandPic(userStrike);

        // Generate computer's strike
        let computerStrike = Math.floor(Math.random() * 7);

        // Update computer's photo
        updateComputerHandPic(computerStrike);

        // Check if it's a wicket
        if (computerStrike === userStrike) {
            wicketCount++;
            wicketsInfo.innerHTML = `${wicketCount}`;
        } else {
            // Update runs 
            if (batter === "COMPUTER") {
                runCount += computerStrike;
            } else {
                runCount += userStrike;
            }
            runsInfo.innerHTML = `${runCount}`;
        }

        // Increase ball count
        ballCount++;
        ballsInfo.innerHTML = `${ballCount}`;

        // Reset userStrike for the next strike
        userStrike = null;

        // Wait for the user to select the next key
        while (wicketCount !== 1 && userStrike === null) {
            userStrike = await userChoiceKey();
        }
    }

    // Return the target
    return runCount + 1;
}

//to start a fresh scoreboard
function updateInformations(runsInfo, ballsInfo, wicketsInfo) {
    runsInfo.innerHTML = `${0}`;
    wicketsInfo.innerHTML = `${0}`;
    ballsInfo.innerHTML = `${0}`;
    ballCount = 0;
    runCount = 0;
    wicketCount = 0;
}

async function secondInnings(batter, target) {
    // Update the information
    bat.innerHTML = `${batter}`;
    updateInformations(runsInfo, ballsInfo, wicketsInfo);

    let userStrike = null;

    while (wicketCount !== 1 && userStrike === null) {
        // Wait for user to select a key
        userStrike = await userChoiceKey();
    }

    while (wicketCount !== 1) {
        if(runCount >= target){
            //Target Achieved update return win = true
            return true;
        }
        // Update user's photo
        updateUserHandPic(userStrike);

        // Generate computer's strike
        let computerStrike = Math.floor(Math.random() * 7);

        // Update computer's photo
        updateComputerHandPic(computerStrike);

        // Check if it's a wicket
        if (computerStrike === userStrike) {
            wicketCount++;
            wicketsInfo.innerHTML = `${wicketCount}`;
        } else {
            // Update runs
            if (batter === "COMPUTER") {
                runCount += computerStrike;
            } else {
                runCount += userStrike;
            }
            runsInfo.innerHTML = `${runCount}`;
        }

        // Increase ball count
        ballCount++;
        ballsInfo.innerHTML = `${ballCount}`;

        // Reset userStrike for the next iteration
        userStrike = null;

        // Wait for the user to select the next key
        while (wicketCount !== 1 && userStrike === null) {
            userStrike = await userChoiceKey();
        }
    }
    
    // Return true if the batter wins, false otherwise
    return target <= runCount;
}

//Start New Game
let newBtn = document.querySelector(".new-btn");
newBtn.addEventListener("click", () => {
    location.reload();
})

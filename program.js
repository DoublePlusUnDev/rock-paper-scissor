const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function loadFile(file){
    let currentPage = window.location.pathname.split("/").pop()
    let newLocation = window.location.pathname.replace(currentPage, file)
    window.location.replace(newLocation)
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function main_button_pressed(){
    currentPage = window.location.pathname.split("/").pop()

    switch (currentPage){
        case "index.html":
            loadFile("ready.html")
            break

        case "ready.html":
            loadFile("sure.html")
            break

        case "sure.html":
            loadFile("absolutely.html")
            break

        case "absolutely.html":
            loadFile("lets-play.html")
            break

        case "lets-play.html":
            loadFile("game.html")
            break

        case "won.html":
            loadFile("sure.html")
            break

        case "lost.html":
            loadFile("sure.html")
            break

        default:
            loadFile("index.html")
            break
    }
}

function game_button_pressed(playerChoice){
    let enemyChoice = ["rock", "paper", "scissor"][randInt(0, 2)]
    document.cookie = `enemyChoice=${enemyChoice}; path=/; max-age=${60*60*24}`

    //win
    if (playerChoice == "rock" && enemyChoice === "scissor" || 
        playerChoice == "paper" && enemyChoice === "rock" ||
        playerChoice == "scissor" && enemyChoice === "paper"){
        
        loadFile("won.html")
    }
    
    //tie
    else if (enemyChoice === playerChoice){
        const title = document.querySelector(".title")
        title.textContent = `Tie: ${enemyChoice.toUpperCase()}`
    }

    //lose
    else{
        loadFile("lost.html")
    }
}

const mainButton = document.getElementById("main-button");
if (mainButton != null)
    mainButton.addEventListener("click", main_button_pressed)

const rockButton = document.getElementById("rock");
if (rockButton != null)
    rockButton.addEventListener("click", () => { game_button_pressed("rock") })

const paperButton = document.getElementById("paper");
if (paperButton != null)
    paperButton.addEventListener("click", () => { game_button_pressed("paper") })

const scissorButton = document.getElementById("scissor");
if (scissorButton != null)
    scissorButton.addEventListener("click", () => { game_button_pressed("scissor") })

 

//if win or lost page load last state from cookie
let currentPage = window.location.pathname.split("/").pop()
   
let enemyChoiceText = document.getElementById("enemy-choice")
if (currentPage == "won.html" || currentPage == "lost.html"){
    let enemyChoice = getCookie("enemyChoice")
    if (enemyChoice != null)
        enemyChoiceText.textContent = `Enemy Chose: ${enemyChoice.toUpperCase()}`
}
// Define Vars 
const colorBlock = document.getElementById("colorBlock");
const answerBlock = document.getElementById("answerBlock");
const mainButtons = document.getElementsByClassName("mainButtons");
const prevGuesses = document.getElementsByClassName("prevGuesses");
const submitButton = document.getElementById("submit");
const deleteButton = document.getElementById("delete");
const hexcodeGuess = document.getElementById("hexcodeGuess"); 
const subHexCode = "FF0000";
let attemptCounter = 0;
const keypadStorage = ["F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0"];
const hexCode = [];
const guessStorage = [];
const prevHexCode = [];

/*
// Define Letter Buttons
const fButton = document.getElementById("F");
const eButton = document.getElementById("E");
const dButton = document.getElementById("D");
const cButton = document.getElementById("C");
const bButton = document.getElementById("B");
const aButton = document.getElementById("A");

// Define Number Buttons
const nineButton = document.getElementById("9");
const eightButton = document.getElementById("8");
const sevenButton = document.getElementById("7");
const sixButton  = document.getElementById("6");
const fiveButton = document.getElementById("5");
const fourButton = document.getElementById("4");
const threeButton = document.getElementById("3");
const twoButton = document.getElementById("2");
const oneButton = document.getElementById("1");
const zeroButton = document.getElementById("0");
// Define Vars End

/*
fButton.addEventListener("click", displayDate);
eButton.addEventListener("click", displayDate);
dButton.addEventListener("click", displayDate);
cButton.addEventListener("click", displayDate);
bButton.addEventListener("click", displayDate);
aButton.addEventListener("click", displayDate);

nineButton.addEventListener("click", displayDate);
eightButton.addEventListener("click", displayDate);
sevenButton.addEventListener("click", displayDate);
sixButton.addEventListener("click", displayDate);
fiveButton.addEventListener("click", displayDate);
fourButton.addEventListener("click", displayDate);
threeButton.addEventListener("click", displayDate);
twoButton.addEventListener("click", displayDate);
oneButton.addEventListener("click", displayDate);
zeroButton.addEventListener("click", displayDate);
*/


randomizeColor();
function attemptCheck (){
  answerBlock.innerHTML="";
  for(let i = 0; i < 6; i++){
    if(prevHexCode[i] == hexCode[i]){
      answerBlock.innerHTML += "✅";
        }
    else{
      answerBlock.innerHTML += "❌"
    }
    
  }
}

function attemptAdd (){
  attemptCounter+=1;
  for(let i = 0; i < 6; i++){
    prevHexCode.push(guessStorage[i]);
  }
  colorBlock.style.backgroundColor = "#"+ prevHexCode.join("");
  prevGuesses[attemptCounter-1].innerHTML="#"+ prevHexCode.join("");
  attemptCheck();
  for(let i = 0; i < 6; i++){
    prevHexCode.pop();
    guessStorage.pop();
  }
}

function attemptCounterAlert (){
  attemptAdd();
  if (attemptCounter > 5){
    answerBlock.style.backgroundColor="white";
    }
}

submitButton.addEventListener("click", function(){
  if (guessStorage.length == 6){
    hexcodeGuess.innerHTML = "#";
    attemptCounterAlert();
  }
  
})
deleteButton.addEventListener("click", function() {
  guessStorage.pop();
  hexcodeGuess.innerHTML=("#"+ guessStorage.join(""));
})


function randomizeColor(){
  for(let i = 0; i < 6; i++) {
    const curNum = Math.floor(Math.random() * 15);

    hexCode.push(keypadStorage[curNum]);
    
  }
  answerBlock.style.backgroundColor = "#"+ hexCode.join("");
}


for(let i = 0; i < mainButtons.length; i++) {
  mainButtons[i].addEventListener("click", function() {   
    if (guessStorage.length < 6){
      guessStorage.push(mainButtons[i].innerHTML);
      hexcodeGuess.innerHTML=("#"+ guessStorage.join(""));
    }
  })
}

document.addEventListener("keydown", function(fl){
  const key = fl.key;
  if (guessStorage.length < 6 && attemptCounter <= 5){
    for(let i = 0; i < keypadStorage.length; i++) {
      if (key.toUpperCase() == mainButtons[i].innerHTML){
        guessStorage.push(key.toUpperCase());
    hexcodeGuess.innerHTML=("#"+ guessStorage.join(""));
      }
    }
    

  }
  if (key == "Backspace" && attemptCounter < 5){
    guessStorage.pop();
    hexcodeGuess.innerHTML=("#"+ guessStorage.join(""));
  }

  if (key == "Enter"){
    if (guessStorage.length == 6){
      hexcodeGuess.innerHTML = "#";
      attemptCounterAlert();
    }
  }
})



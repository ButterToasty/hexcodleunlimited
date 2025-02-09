// Define Vars 
const colorBlock = document.getElementById("colorBlock");
const answerBlock = document.getElementById("answerBlock");
const mainButtons = document.getElementsByClassName("mainButtons");
const prevGuesses = document.getElementsByClassName("prevGuesses");
const resultGuesses = document.getElementsByClassName("resultGuesses");
const submitButton = document.getElementById("submit");
const deleteButton = document.getElementById("delete");
const hexcodeGuess = document.getElementById("hexcodeGuess"); 
const resultsScreen = document.getElementById("resultsScreen");
const resultText = document.getElementById("resultText");
let rowTracker = 0;
let attemptCounter = 0;
let correctCounter = 0;
const keypadStorage = ["0" ,"1" ,"2" ,"3" ,"4" ,"5" ,"6" ,"7" ,"8" ,"9" ,"A" ,"B" ,"C" ,"D" ,"E" ,"F"];
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

function attemptAdd (){
  
  correctCounter=0;
  answerBlock.innerHTML="";
  colorBlock.style.backgroundColor = "#";
  
  for(let i = 0; i < 6; i++){
    prevHexCode.push(guessStorage[i]);
    prevGuesses[i+rowTracker].innerHTML= prevHexCode.join("");
    colorBlock.style.backgroundColor += prevHexCode.join("");
    if(prevGuesses[i+rowTracker].innerHTML == hexCode[i]){
      prevGuesses[i+rowTracker].style.backgroundColor = "lime";
      correctCounter +=1;
        }

        else if(Math.abs(keypadStorage.indexOf(prevGuesses[i+rowTracker].innerHTML) - keypadStorage.indexOf(hexCode[i])) < 3 ){
          prevGuesses[i+rowTracker].style.backgroundColor = "yellow";
            }
   
    else{
      prevGuesses[i+rowTracker].style.backgroundColor = "red";

    }
    
    if(correctCounter==6){
      resultText.innerHTML="I'M LOCKED IN";
      resultsScreen.style.visibility="visible";
    }
    else{
      resultText.innerHTML = "Sorry, The Correct Hex Code Was" +" #" + hexCode.join("");
    }
    resultGuesses[attemptCounter].innerHTML += prevGuesses[i+rowTracker].innerHTML;
    
    prevHexCode.pop();

  prevGuesses[i+rowTracker].style.visibility="visible";
  prevGuesses[i+rowTracker].style.opacity="1";
  }
  attemptCounter+=1;
  /*
  for(let i = 0; i < 6; i++){
  prevGuesses[i].innerHTML="#"+ prevHexCode.join("");
  prevGuesses[i].style.visibility="visible";
  prevGuesses[i].style.visibility="1";
  }
  */
 
  for(let i = 0; i < 6; i++){
    guessStorage.pop();
  }
  rowTracker+=6;
}


function attemptCounterAlert (){
  attemptAdd();
  if (attemptCounter > 5){
    answerBlock.style.backgroundColor="white";
    resultsScreen.style.visibility="visible";
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
  if (key == "Backspace" && attemptCounter < 6){
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



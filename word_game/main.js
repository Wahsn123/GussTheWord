let gameName="Guess The Word";
document.title=gameName;
document.querySelector("h1").innerHTML=gameName;
document.querySelector("footer").innerHTML=`${gameName} Game Created by eng/warda hassan `;

// setting game options

let numberOfTries= 6;
let numberOfLitters= 6;
let currentTry= 1;
let numberOfHints=2;
//manage words
let wordToGuess="";
const words=["create","update","delete","master","branch","mainly","elzero","school"];
wordToGuess=words[Math.floor(Math.random()*words.length)].toLowerCase();
let message=document.querySelector(".message");
// manage hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton=document.querySelector(".hint"); 
getHintButton.addEventListener("click",getHint);

function getHint(){
  if(numberOfHints>0){
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if(numberOfHints === 0){
    getHintButton.disabled=true;
  }
  const enableInput=document.querySelectorAll("input:not([disabled])");
  //console.log(enableInput);
  const emptyEnaple=Array.from(enableInput).filter((input) => input.value === "");
 // console.log(emptyEnaple);
  if(emptyEnaple.length > 0){
    const randomIndex = Math.floor(Math.random()*emptyEnaple.length);
    //console.log(randomIndex);
    const randomInput = emptyEnaple[randomIndex];
   // console.log(randomInput);
    const indexToFill = Array.from(enableInput).indexOf(randomInput);
    //console.log(indexToFill);
    if(indexToFill != -1){
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }

  }
}
 
 
function generateInput() {
    const inputsContaner=document.querySelector(".inputs");
    for(let i = 1 ;i <= numberOfTries; i++ ){
        const tryDiv = document.createElement("div");
         
        tryDiv.classList.add( `try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;
        if(i != 1) tryDiv.classList.add("disabled-inputs");
        for(let j=1;j <= numberOfLitters ; j++){
            const inputLetter = document.createElement("input"); 
            inputLetter.type="text";
            inputLetter.id=`guess-${i}-letter-${j}`;
            inputLetter.setAttribute("maxlength","1");
            tryDiv.appendChild(inputLetter);
        }

        inputsContaner.appendChild(tryDiv);
    }
    inputsContaner.children[0].children[1].focus();
    const inputDisabled=document.querySelectorAll(".disabled-inputs input")
    inputDisabled.forEach((inputLetter) =>(inputLetter.disabled =true));
    const inputs =document.querySelectorAll("input")
    inputs.forEach((inputLetter ,index)=>{
        inputLetter.addEventListener("input",function(){
            this.value=this.value.toUpperCase();
             
            const nextIndex=inputs[index + 1];
            if(nextIndex) nextIndex.focus();

        });
          inputLetter.addEventListener("keydown",function(event){
            const currentIndex=Array.from(inputs).indexOf(event.target);
             
            if(event.key === "ArrowRight"){
                const nextInput=currentIndex + 1;
                if(nextInput < inputs.length) inputs[nextInput].focus();
            }
             if(event.key === "ArrowLeft"){
                const prevInput=currentIndex -1;
                if(prevInput >=0) inputs[prevInput].focus();
            }
        });
    });
  
}
 console.log(wordToGuess)
const guessButton=document.querySelector(".check");
guessButton.addEventListener("click",handleGuesses);
function handleGuesses() {
  let successGuess = true;
  //console.log(wordToGuess);
  for (let i = 1; i <= numberOfLitters; i++) {
    const inputField = document.getElementById(`guess-${currentTry}-letter-${i}`);
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    // Game Logic
    if (letter === actualLetter) {
      // Letter Is Correct And In Place
      inputField.classList.add("inplace");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      // Letter Is Correct And Not In Place
      inputField.classList.add("notinplace");
      successGuess = false;
    } else {
      inputField.classList.add("letterwrong");
      successGuess = false;
    }
  }
  // check user win or lose
  if(successGuess){

    message.innerHTML=`you win the word is <span>${wordToGuess}</span>`;

    if(numberOfHints === 2){
       message.innerHTML=`<p> Congratz You Didn't Use Hints </p>`;
    }
    // disabled all class
    let alltries = document.querySelectorAll(".inputs > div");
    alltries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"))

    guessButton.disabled = true;
    getHintButton.disabled = true;
     
  }
  else{
     document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
     const CurrentTryInput = document.querySelectorAll(`.try-${currentTry} input`);
     CurrentTryInput.forEach((inputLetter) => (inputLetter.disabled = true));
     //document.querySelector(`.try-${currentTry+1}`).classList.remove("disabled-inputs");
     currentTry++;
     
     const nextTryInput = document.querySelectorAll(`.try-${currentTry} input`);
     nextTryInput.forEach((inputLetter) => (inputLetter.disabled = false));

     let el =document.querySelector(`.try-${currentTry}`);
     if(el){
       document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
       el.children[1].focus();
     }
     else{
      message.innerHTML=`you lose the word is <span>${wordToGuess}</span>`
       guessButton.disabled = true;
       getHintButton.disabled = true;
     }

  }
     

}
document.addEventListener("keydown",HandleBackSpace)

function HandleBackSpace(event){
  if(event.key === "Backspace" ){
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    
    if(currentIndex > 0){
      const currentInput =inputs[currentIndex];
      const prevusInput=inputs[currentIndex - 1];
      currentInput.value = "";
      prevusInput.value = "";
      prevusInput.focus();
    }

  }

}

window.onload=function(){
    generateInput();
};
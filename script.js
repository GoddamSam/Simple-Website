let currGuess=Math.floor(Math.random*101);
let guessArr=[];
let totalGuesses=10;
let mssg='';
const input=document.getElementById('numinput');
const prevGuesses=document.getElementById('prevguesses');
const guessesRem=document.getElementById('remguesses');
const submitBtn=document.getElementById('submitbtn');
const displayMssg=document.getElementById('message');
const newGameBtn=document.getElementById('newgamebtn');

let isGame=true;



window.addEventListener('load',()=>{
    
    guessArr=JSON.parse(localStorage.getItem('Array'))||[];
    totalGuesses=JSON.parse(localStorage.getItem('totalGuesses'))||10;
    mssg=JSON.parse(localStorage.getItem('message'))||'';
    isGame=JSON.parse(localStorage.getItem('isGame'));


    prevGuesses.innerHTML=` ${guessArr}`;
    guessesRem.innerHTML=` ${totalGuesses}`;
    displayMssg.textContent=mssg;
     
    
   if(mssg=='Well Done!! Your guess is absolutely right &#128540;'||mssg=='Game Over!')
    newGameBtn.style.display='block';
    
    
});

if(isGame)
{
localStorage.setItem("isGame", true);
submitBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    
    if(input.value=='')
    {
        alert('Please, guess a number');
    }
    else if(input.value<0||input.value>100)
    {
        alert('Please, guess a number between 0 and 100');
    }
    else{
        
        
        checkNum();
        guessUpdate(input.value);
        remGuessUpdate();
        if(totalGuesses==0)
        endgame();

        localStorage.setItem('Array',JSON.stringify(guessArr));
        localStorage.setItem( 'totalGuesses', JSON.stringify(totalGuesses)) ;
        mssg=displayMssg.textContent;
        localStorage.setItem( 'message', JSON.stringify(mssg)) ;

        input.value='';
    }
});
}



//checking the entered number with the random number generated
function checkNum(){
    if(input.value==currGuess)
    {
    displayMssg.innerHTML='Well Done!! Your guess is absolutely right &#128540;';
    endgame();
    }
    else if (input.value < currGuess) {
        displayMssg.innerHTML = 'Nice try, but aim a little higher! &#129320;';
    } else {
        displayMssg.innerHTML = 'Going big, huh? Try a smaller number! &#128517;';
    }
}

//updating the guesses list
function guessUpdate(currentGuess){
    guessArr.push(currentGuess);
    prevGuesses.innerHTML=` ${guessArr}`;
}

//decreasing the no. of guesses
function remGuessUpdate(){
    totalGuesses--;
    guessesRem.innerHTML=` ${totalGuesses}`;
}

//ending the game
function endgame(){
    if (totalGuesses == 0) {
        displayMssg.innerHTML = 'Game Over!';
    }

    input.setAttribute('disabled', '');
    submitBtn.setAttribute('disabled', '');

    newGameBtn.style.display='block';

    isGame = false;
    localStorage.setItem('isGame','false')
}

//starting the game
function newgame(){

    localStorage.clear();

    currGuess=undefined;
    guessArr=[];
    totalGuesses=10; 
    
    newGameBtn.style.display='none';

    input.removeAttribute('disabled');
    submitBtn.removeAttribute('disabled');
        

    // Update the remaining guesses display
    guessesRem.innerHTML = ` ${totalGuesses}`;
    prevGuesses.innerHTML=` ${guessArr}`;
    displayMssg.innerHTML='';

    // Update the game status
    isGame = true;

    currGuess=Math.floor(Math.random()*101);
}
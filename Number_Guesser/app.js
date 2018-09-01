const min = 1,
      max = 10,
      winnigNumber = getRandom(min, max);

let guessLeft = 3;


const minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      game = document.querySelector('#game'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input');
      message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

function getRandom(min, max){
    return Math.floor(Math.random()*(max - min +1) + min);
}

game.addEventListener('mousedown', function(e){

    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

guessBtn.addEventListener('click', function(e){

    let guess = parseInt(guessInput.value);

    if(isNaN(guess) || guess > max || guess < min){

        console.log(guess);
        showMessage(`Enter a valid number b/w ${min} and ${max}`, 'red');
    }
    else{

        if(guess === winnigNumber){
        
            gameOver('You Win', 'green',  true, true);
        }
        else{
    
            guessLeft -= 1;
    
            if(guessLeft === 0){
    
                gameOver(`You Lost, the correct number was ${winnigNumber}`, 'red', true, true);
            }
            else{
    
                gameOver(`Wrong Guess!, ${guessLeft} guesses left.`, 'red', false, false);
            }
        }
    }
});

function gameOver(msg, color, disable, playAgain){

    guessInput.value = '';
    guessInput.disabled = disable;
    message.textContent = msg;
    message.style.color = color;
    guessInput.style.borderColor = color;

    if(playAgain === true){

        guessBtn.value = 'Play Again';
        guessBtn.className += 'play-again';
    }
}

function showMessage(msg, color){

    message.textContent = msg;
    message.style.color = color;
}
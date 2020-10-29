const dice1 = document.querySelector(".dice--1");
const dice2 = document.querySelector(".dice--2");

var scores,roundScore,activePlayer,dice, playState,target;
init();
document.querySelector(".inp-final-score").addEventListener('keypress',function(inputKey){
    if(!playState){
        target = parseInt(document.querySelector(".inp-final-score").value);
        console.log(target);
        if(inputKey.key === 'Enter')
            playState = true;
    }
});
var rollBtn = document.querySelector('.btn--roll');
rollBtn.addEventListener('click', function () {
    if(!target){
        alert("Enter the final score and press Enter");
    }
    else{
        if(playState){
            var val1 = Math.ceil(Math.random()*6);
            var val2 = Math.ceil(Math.random()*6);
            dice1.style.display = 'block';
            dice2.style.display = 'block';
            dice1.src = 'dice-'+val1+'.png';
            dice2.src = 'dice-'+val2+'.png';
    
            if(val1 !== 1 && val2 !== 1 ){
                if(val1 === 6 && val2 === 6){
                    scores[activePlayer] = 0;
                    document.getElementById('score--'+activePlayer).textContent = scores[activePlayer];
                    nextPlayer();
                }
                else{
                    roundScore += val1 + val2;
                    document.getElementById('current--'+activePlayer).textContent = roundScore;
                }
            }
            else{
                nextPlayer();
            }
        }
    }
});

document.querySelector('.btn--hold').addEventListener('click', function() {
    if(playState)
    {
        scores[activePlayer] += roundScore;
        document.getElementById('score--'+activePlayer).textContent = scores[activePlayer];
        if(scores[activePlayer]>=target){
            target = NaN;
            playState = false;
            document.getElementById('name--'+activePlayer).textContent = 'Winner!!!';
            dice1.style.display = 'none';
            dice2.style.display = 'none';
            document.querySelector('.player--'+activePlayer).classList.add('player--winner');
            document.querySelector('.player--'+activePlayer).classList.remove('player--active');
        }
        else{
            nextPlayer();
        }
    } 
});

function nextPlayer(){
    roundScore = 0;
    document.getElementById('current--'+activePlayer).textContent = 0;
    document.querySelector('.player--'+activePlayer).classList.remove('player--active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player--'+activePlayer).classList.add('player--active');

    dice1.style.display = 'none';
    dice2.style.display = 'none';
}

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
    document.querySelector(".inp-final-score").value = "";
    if(target)
        playState = true;
    else
        playState = false;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';

    dice1.style.display = 'none';
    dice2.style.display = 'none';

    document.getElementById('name--'+0).textContent = 'Player 1';
    document.getElementById('name--'+1).textContent = 'Player 2';

    document.querySelector('.player--'+0).classList.remove('player--winner');
    document.querySelector('.player--'+1).classList.remove('player--winner');
    document.querySelector('.player--'+0).classList.remove('player--active');
    document.querySelector('.player--'+1).classList.remove('player--active');
    document.querySelector('.player--'+0).classList.add('player--active');
}
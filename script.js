var scores,roundScore,activePlayer,dice, playState;
init();

var rollBtn = document.querySelector('.btn--roll');
rollBtn.addEventListener('click', function () {
    if(playState){
        var dice = Math.ceil(Math.random()*6);
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-'+dice+'.png';

        if(dice !== 1){
            if(dice === 6){
                if(alreadyGotSix){
                    nextPlayer();
                    alreadyGotSix = false;
                }
                else{
                    alreadyGotSix = true;
                    roundScore += dice;
                    document.getElementById('current--'+activePlayer).textContent = roundScore;
                }
            }
            else{
                roundScore += dice;
                document.getElementById('current--'+activePlayer).textContent = roundScore;
            }
        }
        else{
            nextPlayer();
        }
    }
});

document.querySelector('.btn--hold').addEventListener('click', function() {
    if(playState)
    {
        scores[activePlayer] += roundScore;
        document.getElementById('score--'+activePlayer).textContent = scores[activePlayer];
        if(scores[activePlayer]>=20){
            playState = false;
            document.getElementById('name--'+activePlayer).textContent = 'Winner!!!';
            document.querySelector('.dice').style.display = 'none';
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

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    playState = true;
    alreadyGotSix = false;

    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('name--'+0).textContent = 'Player 1';
    document.getElementById('name--'+1).textContent = 'Player 2';

    document.querySelector('.player--'+0).classList.remove('player--winner');
    document.querySelector('.player--'+1).classList.remove('player--winner');
    document.querySelector('.player--'+0).classList.remove('player--active');
    document.querySelector('.player--'+1).classList.remove('player--active');
    document.querySelector('.player--'+0).classList.add('player--active');
}
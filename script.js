'use strict';
let RandNum, temp, play = 1;
let p2totalscore, p1totalscore, currscore = [0, 0];
let highscore = 0;
let activeplayer = 0,wonplayer=0;

function intialiseGame() {
    currscore[0] = 0;
    p1totalscore = 0
    currscore[1] = 0;
    p2totalscore = 0;
    activeplayer = 0;
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.dice').classList.add('hidden');
    document.querySelector('#score--1').textContent = 0;
    document.querySelector('#score--0').textContent = 0;
    document.querySelector(`#current--0`).textContent = 0;
    document.querySelector(`#current--1`).textContent = 0;
    document.querySelector(`.player--${wonplayer}`).classList.remove('player--winner');
    play = 1;
}

intialiseGame();

function playerTurn(){
    document.querySelector('.dice').src = `dice-${7}.jpg`;
}

function result() {
    if (currscore[0] > currscore[1]) {
        document.querySelector('.player--0').classList.add('player--winner');
        document.querySelector('#name--0').textContent='Player 1 Won!';
        wonplayer=0;
       // alert("Player 1 Won!!!");
    }
    else if (currscore[0] < currscore[1]) {
        document.querySelector('.player--1').classList.add('player--winner');
        document.querySelector('#name--1').textContent='Player 2 Won!';
        wonplayer=1;
        //alert("Player 2 Won!!!");
    }
    else {
        alert("Game Draw");
    }
    document.querySelector('.dice').classList.add('hidden');
    play = 0;
}

document.querySelector('.btn--roll').addEventListener('click', () => {
    if (play) {
        RandNum = Math.trunc(Math.random() * 6) + 1;
        document.querySelector('.dice').classList.remove('hidden');
        //console.log(RandNum);
        document.querySelector('.dice').src = `dice-${RandNum}.png`;
        if (RandNum !== 1) {
            currscore[activeplayer] += RandNum;
            document.querySelector(`#current--${activeplayer}`).textContent = currscore[activeplayer];
        }
        else {
            currscore[activeplayer] =0;
            document.querySelector(`#current--${activeplayer}`).textContent = currscore[activeplayer];
            document.querySelector(`#score--${activeplayer}`).textContent = currscore[activeplayer];
            document.querySelector('.player--0').classList.toggle('player--active');
            document.querySelector('.player--1').classList.toggle('player--active');
            activeplayer = activeplayer === 0 ? 1 : 0;
            if (activeplayer === 0) {
                result();
            }else{
                playerTurn();
            }
            
        }
    }
});
document.querySelector('.btn--hold').addEventListener('click', () => {
    if (play == 1) {
        // temp=document.querySelector(`p${activeplayer}currscore`).textContent;
        // document.querySelector(`p${activeplayer}totalscore`).textContent=temp;
        document.querySelector(`#score--${activeplayer}`).textContent = currscore[activeplayer];
        document.querySelector('.player--0').classList.toggle('player--active');
        document.querySelector('.player--1').classList.toggle('player--active');
        activeplayer = activeplayer === 0 ? 1 : 0;
        if (activeplayer === 0) {
            result();
        }
        else{
            playerTurn();
        }
    }
});


document.querySelector('.btn--new').addEventListener('click', intialiseGame);

//Modal-Instructions
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
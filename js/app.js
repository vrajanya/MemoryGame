'use strict';

//to display the cards on page load
document.addEventListener('DOMContentLoaded', (event) => {
	shuffle(cards);
	createHtmlDeck(cards);
	welcome();
});

//list that holds all of your cards - all global variables
const cards = [	'fa-diamond','fa-diamond',
				'fa-paper-plane-o','fa-paper-plane-o',
				'fa-anchor','fa-anchor',
				'fa-bolt','fa-bolt',
				'fa-cube','fa-cube',
				'fa-leaf','fa-leaf',
				'fa-bicycle','fa-bicycle',
				'fa-bomb','fa-bomb'];

let moves = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let matchedCards = 0;
let timerOn = false;
let timeCounter;

//the Deck container
const containerDiv = document.querySelector('.container');
const hrtag = document.querySelector('hr');

//score panel
const starsUl = document.querySelector('.stars');
const starsLi = starsUl.children;

const spanMoves = document.querySelector('.moves');

const timerHours = document.querySelector('.hours');
const timerMinutes = document.querySelector('.minutes');
const timerSeconds = document.querySelector('.seconds');
const timerUl = document.querySelector('.timer');

const repeatElement = document.querySelector('.restart');
repeatElement.addEventListener('click',function() {
	playAgain();
});

// Welcome Modal
const modalStartDiv = document.querySelector('#startModal');
const startBtn = document.querySelector('#startButton');
startBtn.addEventListener('click',function() {
	modalStartDiv.style.display = 'none';
	playAgain();
});

//End Modal
const modalEndDiv = document.querySelector('#endModal');
const playAgainBtn = document.querySelector('#playAgainButton');

/* Functions */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

//to activate welcome modal
function welcome() {
    modalStartDiv.style.display = 'block';
}

//to restart the game
function playAgain() {
	for (let starLi of starsLi) {
    		starLi.firstElementChild.classList.add('fa','fa-star','greystar');
    		starLi.firstElementChild.classList.remove('fa-star-half-o');
		};

	clearInterval(timeCounter);
	spanMoves.innerHTML = '0 moves';
	timerHours.innerHTML = '00:';
	timerMinutes.innerHTML = '00:';
	timerSeconds.innerHTML = '00';
	moves = 0;
	seconds = 0;
	minutes = 0;
	hours = 0;
	matchedCards = 0;
	timerOn = false;
	shuffle(cards);
	createHtmlDeck(cards);
	startPlaying();
};

//to create the deck of cards
function createHtmlDeck(array) {
	document.querySelector('#mainContent').innerHTML ="";
	const createUlTag = document.createElement('ul');
	createUlTag.setAttribute('class', 'deck');

	array.forEach(function(element) {
		const createLiTag = document.createElement('li');
		const createITag = document.createElement('i');
		createLiTag.setAttribute('class','card');
		createLiTag.setAttribute('data-icon',element);
		createITag.classList.add('fa',element);
		createLiTag.appendChild(createITag);
		createUlTag.appendChild(createLiTag);
	});

	document.querySelector('#mainContent').appendChild(createUlTag);
};

//to start the game
function startPlaying() {
	const allCards = document.querySelectorAll('.card');
	let openCard =[];

	allCards.forEach(function(card) {
		card.addEventListener('click', function(e) {
			if (timerOn === false) {
				startTimer();
				timerOn = true;
			}
			if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
				card.classList.add('open','show');
				openCard.push(card);
				if (openCard.length ==2) {
					setTimeout(function(){
						if(openCard[0].getAttribute("data-icon") ===openCard[1].getAttribute("data-icon")) {
							openCard.forEach(function(card){
								card.classList.add('match');
							});
							matchedCards++;
						} else {
							openCard.forEach(function(card){
								card.classList.remove('open','show');
							});
						};
						openCard =[];
						movesCounter();
						if (matchedCards === 8) {
								wonGame();
						};
					},500);
				};
			};
		});
	});
};

//no.of moves to complete the game
function movesCounter() {
	moves++;
	if (moves === 1) {
        spanMoves.innerHTML = `1  Move`;
    } else {
        spanMoves.innerHTML = `${moves}  Moves`;
    }
    starRating();
};

// Star rating based on the no.of moves
function starRating() {
	if (moves<=10) {
		//3 star
		for (let starLi of starsLi) {
    		starLi.firstElementChild.classList.remove('greystar');
		};
	} else if(moves>10 && moves<=14) {
		//21/2 stars
		starsLi[0].firstElementChild.classList.remove('greystar');
		starsLi[1].firstElementChild.classList.remove('greystar');
		starsLi[2].firstElementChild.classList.replace('fa-star', 'fa-star-half-o');
	} else if(moves>14 && moves<=16) {
		//2 star
		starsLi[0].firstElementChild.classList.remove('greystar');
		starsLi[1].firstElementChild.classList.remove('greystar');
		starsLi[2].firstElementChild.classList.remove('fa-star-half-o');
		starsLi[2].firstElementChild.classList.add('fa-star','greystar');
	} else if(moves>16 && moves<=18) {
		// 11/2 star
		starsLi[0].firstElementChild.classList.remove('greystar');
		starsLi[1].firstElementChild.classList.replace('fa-star', 'fa-star-half-o');
		starsLi[1].firstElementChild.classList.remove('greystar');
	} else if(moves>18 && moves<=20) {
		// 1 star
		starsLi[0].firstElementChild.classList.remove('greystar');
		starsLi[1].firstElementChild.classList.remove('fa-star-half-o');
		starsLi[1].firstElementChild.classList.add('fa-star','greystar');
		starsLi[2].firstElementChild.classList.remove('fa-star-half-o');
	} else if(moves>20) {
		// 1/2 star
		starsLi[0].firstElementChild.classList.replace('fa-star', 'fa-star-half-o');
		starsLi[1].firstElementChild.classList.add('fa-star','greystar');
	};
};

function startTimer() {

    timeCounter = setInterval(function () {
    	seconds++;
        timerHours.innerHTML = hours<10 ? `0${hours}:` : ` ${hours}: `;
        timerMinutes.innerHTML = minutes<10 ? `0${minutes}:` : ` ${minutes}: `;
        timerSeconds.innerHTML = seconds<10 ? `0${seconds}` : ` ${seconds} `;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        } else if (minutes == 60) {
            hours++;
            minutes = 0;
        }
    }, 500);
};

//Game complete & activate the end modal
function wonGame() {
	modalEndDiv.style.display = 'block';
	clearInterval(timeCounter);

	const movesModal = document.querySelector('.movesModal');
	const timeModal = document.querySelector('.timeModal');
	const ratingModal = document.querySelector('.ratingModal');

	movesModal.innerHTML = spanMoves.innerHTML;
	timeModal.innerHTML = minutes>0 && seconds>0  ? (minutes>1 ? `${minutes} minutes  ${seconds} seconds` : `${minutes} minute ${seconds} seconds`) : ` ${seconds} seconds` ;
	ratingModal.innerHTML = starsUl.innerHTML;
};

playAgainBtn.addEventListener('click', function () {
    modalEndDiv.style.display = 'none';
    playAgain();
});
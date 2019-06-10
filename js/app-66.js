'use strict';

//list that holds all of your cards
const cards = [	'fa-diamond','fa-diamond',
				'fa-paper-plane-o','fa-paper-plane-o',
				'fa-anchor','fa-anchor',
				'fa-bolt','fa-bolt',
				'fa-cube','fa-cube',
				'fa-leaf','fa-leaf',
				'fa-bicycle','fa-bicycle',
				'fa-bomb','fa-bomb'];

//to display the cards on page load
document.addEventListener('DOMContentLoaded', (event) => {
    shuffle(cards);
    createHtmlDeck(cards);
});

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

//loop through each card and create its HTML
const containerDiv = document.querySelector('.container');

function createHtmlDeck(array) {
	const createUlTag = document.createElement('ul');
	createUlTag.setAttribute('class', 'deck');

	array.forEach(function(element) {
		// console.log(element);
		const createLiTag = document.createElement('li');
		const createITag = document.createElement('i');
		createLiTag.setAttribute('class','card');
		createLiTag.setAttribute('data-icon',element);
		createITag.classList.add('fa',element);
		createLiTag.appendChild(createITag);
		createUlTag.appendChild(createLiTag);
	});

	containerDiv.appendChild(createUlTag);
};

function startPlaying() {
	const allCards = document.querySelectorAll('.card');
	let openCard =[];
	allCards.forEach(function(card) {
		card.addEventListener('click', function(e) {
			if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
				card.classList.add('open','show');
				openCard.push(card);
				console.log(openCard);
				if (openCard.length ==2) {
					setTimeout(function(){
						if(openCard[0].getAttribute("data-icon") ===openCard[1].getAttribute("data-icon")) {
							openCard.forEach(function(card){
								card.classList.add('match');
							});
						}
						else {
							openCard.forEach(function(card){
								card.classList.remove('open','show');
							});
						};
						openCard =[];
					},500);
				};
			};
		});
	});
};

//no.of moves to complete the game
function movesCounter() {

};

// Star rating based on the no.of moves
function starRating() {
	if(moves <= 30) {


	}

};
function timer() {

};

const repeatElement = document.querySelector('.restart');
repeatElement.addEventListener('click',function(){startPlaying();});


// const newElement2 = document.createElement('li');
// document.querySelector('.deck').appendChild(newElement2);


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

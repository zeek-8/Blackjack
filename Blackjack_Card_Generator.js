const cards = {};

// Generate cards;
var numberToString = {
    "11": "Ace",
    "2": "Two",
    "3": "Three",
    "4": "Four",
    "5": "Five",
    "6": "Six",
    "7": "Seven",
    "8": "Eight",
    "9": "Nine",
    "10": "Ten"
};

var figures = ["Jack", "Queen", "King"];

var ace = ["Ace Of Clubs", "Ace Of Spades", "Ace Of Hearts", "Ace Of Diamonds"]

var deck = [];

function giveBack() {
    deck.push(ace[1]);
    for (let i = 2; i < 11; i++) {
        deck.push(`${numberToString[i]} Of Spades`)
    };

    for (let i = 0; i < figures.length; i++) {
        deck.push(`${figures[i]} Of Spades`)
    }

    return deck

}

window.alert(giveBack());

const completeDeck = ['Ace Of Clubs', 'Two Of Clubs', 'Three Of Clubs', 'Four Of Clubs', 'Five Of Clubs', 'Six Of Clubs', 'Seven Of Clubs', 'Eight Of Clubs', 'Nine Of Clubs', 'Ten Of Clubs', 'Jack Of Clubs', 'Queen Of Clubs', 'King Of Clubs', 'Ace Of Diamonds', 'Two Of Diamonds', 'Three Of Diamonds', 'Four Of Diamonds', 'Five Of Diamonds', 'Six Of Diamonds', 'Seven Of Diamonds', 'Eight Of Diamonds', 'Nine Of Diamonds', 'Ten Of Diamonds', 'Jack Of Diamonds', 'Queen Of Diamonds', 'King Of Diamonds', 'Ace Of Hearts', 'Two Of Hearts', 'Three Of Hearts', 'Four Of Hearts', 'Five Of Hearts', 'Six Of Hearts', 'Seven Of Hearts', 'Eight Of Hearts', 'Nine Of Hearts', 'Ten Of Hearts', 'Jack Of Hearts', 'Queen Of Hearts', 'King Of Hearts', 'Ace Of Spades', 'Two Of Spades', 'Three Of Spades', 'Four Of Spades', 'Five Of Spades', 'Six Of Spades', 'Seven Of Spades', 'Eight Of Spades', 'Nine Of Spades', 'Ten Of Spades', 'Jack Of Spades', 'Queen Of Spades', 'King Of Spades']






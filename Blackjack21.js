deck_Object = {
    "Ace Of Clubs": 11,
    "Two Of Clubs": 2,
    "Three Of Clubs": 3,
    "Four Of Clubs": 4,
    "Five Of Clubs": 5,
    "Six Of Clubs": 6,
    "Seven Of Clubs": 7,
    "Eight Of Clubs": 8,
    "Nine Of Clubs": 9,
    "Ten Of Clubs": 10,
    "Jack Of Clubs": 10,
    "Queen Of Clubs": 10,
    "King Of Clubs": 10,
    "Ace Of Diamonds": 11,
    "Two Of Diamonds": 2,
    "Three Of Diamonds": 3,
    "Four Of Diamonds": 4,
    "Five Of Diamonds": 5,
    "Six Of Diamonds": 6,
    "Seven Of Diamonds": 7,
    "Eight Of Diamonds": 8,
    "Nine Of Diamonds": 9,
    "Ten Of Diamonds": 10,
    "Jack Of Diamonds": 10,
    "Queen Of Diamonds": 10,
    "King Of Diamonds": 10,
    "Ace Of Hearts": 11,
    "Two Of Hearts": 2,
    "Three Of Hearts": 3,
    "Four Of Hearts": 4,
    "Five Of Hearts": 5,
    "Six Of Hearts": 6,
    "Seven Of Hearts": 7,
    "Eight Of Hearts": 8,
    "Nine Of Hearts": 9,
    "Ten Of Hearts": 10,
    "Jack Of Hearts": 10,
    "Queen Of Hearts": 10,
    "King Of Hearts": 10,
    "Ace Of Spades": 11,
    "Two Of Spades": 2,
    "Three Of Spades": 3,
    "Four Of Spades": 4,
    "Five Of Spades": 5,
    "Six Of Spades": 6,
    "Seven Of Spades": 7,
    "Eight Of Spades": 8,
    "Nine Of Spades": 9,
    "Ten Of Spades": 10,
    "Jack Of Spades": 10,
    "Queen Of Spades": 10,
    "King Of Spades": 10,
};

// ---------------------------- PLAYER CLASS ---------------------------- // 

class Player {

    constructor() {
        this.cards = {};
        this.balance = 10000;
        this.points = 0;
        this.status;
    };

    receiveCards(cards) {
        for (let x in cards) {
            this.cards[x] = cards[x];
            this.points += cards[x];
        };
    };

    calculatePoints() {
        let aces = 0;
        let cards = 0;

        for (let x in this.cards) {
            cards += 1;
            if (x.includes("Ace")) {
                aces += 1;

                if (this.points > 21 && this.cards[x] === 11) {
                    this.points -= 10;
                    this.cards[x] = 1;
                };
            };
        };

        if (this.points === 21 && cards === 2 && aces === 1) {
            this.status = "blackjack";
        };

        if (this.points > 21) {
            return "bust";
        };
    };
};

// ---------------------------- CROUPIER CLASS ---------------------------- // 

class Croupier {

    constructor() {
        this.cards = {};
        this.points = 0;
        this.deck;
        this.status;
        this.gambleAmount;
    };

    shuffleDeck() {
        var keys = Object.keys(deck_Object); // Array with keys waiting to be shuffled
        var randomKeys = []; // Used to store shuffled keys

        // Shuffling the keys and storing it
        while (randomKeys.length !== 52) {
            var num = Math.floor(Math.random() * keys.length);
            randomKeys.push(keys[num]);
            keys.splice(num, 1);
        };

        this.deck = randomKeys;
    };

    promptPlayerGambleAmount(player) {
        while (true) {
            window.alert(`You can gamble: $${player.balance}`);
            var num = prompt("input gamble amount");
            this.gambleAmount = Number(num);

            if (this.gambleAmount > player.balance) {
                window.alert("Insufficient Funds!")
            };

            if (this.gambleAmount <= player.balance) {
                player.balance -= this.gambleAmount;
                return false;
            };
        };

    };

    giveOneCard() {
        var card = {};
        for (let i = 0; i < 1; i++) {
            var num = Math.floor(Math.random() * this.deck.length);
            card[this.deck[num]] = deck_Object[this.deck[num]];
            this.deck.splice(num, 1);
        };

        return card
    };

    giveTwoCards() {
        var cards = {};
        for (let i = 0; i < 2; i++) {
            var num = Math.floor(Math.random() * this.deck.length);
            cards[this.deck[num]] = deck_Object[this.deck[num]];
            this.deck.splice(num, 1);
        };

        return cards
    };

    receiveCards(cards) {
        for (let x in cards) {
            this.cards[x] = cards[x];
            this.points += cards[x];
        };
    };

    calculatePoints() {
        let aces = 0;
        let cards = 0;

        for (let x in this.cards) {
            cards += 1;
            if (x.includes("Ace")) {
                aces += 1;

                if (this.points > 21 && this.cards[x] === 11) {
                    this.points -= 10;
                    this.cards[x] = 1;
                };
            };
        };

        if (this.points === 21 && cards === 2 && aces === 1) {
            return "blackjack";
        };

        if (this.points >= 17 && this.points < 22) {
            return "until_or_upto"
        };

        if (this.points > 21) {
            return "bust";
        };
    };

    untilOrUpTo() {
        this.receiveCards(this.giveTwoCards());

        while (true) {

            if (this.calculatePoints(this.cards) === "blackjack") {
                this.status = "blackjack";
                return false;
            };

            if (this.calculatePoints(this.cards) === "until_or_upto") {
                this.status = "until_or_upto";
                return false;
            };

            if (this.calculatePoints(this.cards) === "bust") {
                this.status = "bust";
                return false;
            };

            this.receiveCards(this.giveOneCard());
        };
    };

    untilOrUpToNotBlackjack() {
        while (true) {

            if (this.calculatePoints(this.cards) === "blackjack") {
                this.status = "blackjack";
                return false;
            };

            if (this.calculatePoints(this.cards) === "until_or_upto") {
                this.status = "until_or_upto";
                return false;
            };

            if (this.calculatePoints(this.cards) === "bust") {
                this.status = "bust";
                return false;
            };

            this.receiveCards(this.giveOneCard());
        };
    };

    hitStandDouble(player, display) {
        this.receiveCards(this.giveTwoCards());
        this.calculatePoints()

        while (true) {

            display.logHitStandDouble(player, this)

            var response = prompt("HIT, STAND or DOUBLE?");
            response = response.toLowerCase()

            //HIT
            //------------------------------------------------
            if (response === "hit") {
                player.receiveCards(this.giveOneCard());
                player.status = player.calculatePoints();
            };

            if (player.status === "bust") {
                display.logPlayerLose(player, this);
                return false;
            }
            //--------------------------------------------------

            //STAND
            //--------------------------------------------------

            if (response === "stand") {
                this.untilOrUpToNotBlackjack();

                if (this.status === "bust") {
                    player.balance = player.balance + (this.gambleAmount * 2);
                    display.logPlayerWins(player, this);
                    return false;
                }

                if (this.status === "until_or_upto") {
                    if (player.points < this.points) {
                        display.logPlayerLose(player, this);
                        return false;
                    };

                    if (player.points > this.points) {
                        player.balance = player.balance + (this.gambleAmount * 2);
                        display.logPlayerWins(player, this);
                        return false;
                    };

                    if (player.points === this.points) {
                        player.balance = player.balance + this.gambleAmount;
                        display.logDraw(player, this);
                        return false;
                    };

                };

                if (this.status === "blackjack") {
                    display.logPlayerLose(player, this);
                    return false;

                }
            };

            // Double
            //--------------------------------------------------

            if (response === "double" && player.balance < this.gambleAmount) {
                window.alert(`Insufficient funds`)
                window.alert(`Balance: $${player.balance}`);
            };

            if (response === "double" && player.balance >= this.gambleAmount) {
                player.receiveCards(this.giveOneCard());
                player.status = player.calculatePoints();
                player.balance -= this.gambleAmount;
                this.gambleAmount = this.gambleAmount * 2;
                this.untilOrUpToNotBlackjack();

                if (player.status === "bust") {
                    display.logPlayerLose(player, this);
                    return false;
                };


                if (this.status === "bust") {
                    player.balance = player.balance + (this.gambleAmount * 2);
                    display.logPlayerWins(player, this);
                    return false;
                }


                if (this.status === "until_or_upto") {
                    if (player.points < this.points) {
                        display.logPlayerLose(player, this);
                        return false;
                    };

                    if (player.points > this.points) {
                        player.balance = player.balance + (this.gambleAmount * 2);
                        display.logPlayerWins(player, this);
                        return false;
                    };

                    if (player.points === this.points) {
                        player.balance = player.balance + this.gambleAmount;
                        display.logDraw(player, this);
                        return false;
                    };
                };

                if (this.status === "blackjack") {
                    display.logPlayerLose(player, this);
                    return false;
                };
            };
        };
    };
};

// ---------------------------- GAME CLASS ---------------------------- //

class Game {

    playerWinsByBlackjack(player, croupier) {
        player.balance += croupier.gambleAmount * 2.5;
    };

    resetData(player, croupier) {
        croupier.cards = {};
        croupier.points = 0;

        croupier.status = "";
        croupier.gambleAmount = 0;


        player.cards = {};
        player.points = 0;
        player.status = "";
    };
};

// ---------------------------- DISPLAY ---------------------------- //

class Display {

    logPlayerWinsByBlackjack(player, croupier) {
        window.alert("BLACKJACK");
        window.alert(`You win +$${croupier.gambleAmount * 1.5}`);
        window.alert(`Total balance $${player.balance}`);
        window.alert(`Croupier cards: ${Object.keys(croupier.cards)}`);
        window.alert(`Croupier points ${croupier.points}`);
        window.alert(`Player cards: ${Object.keys(player.cards)}`);
        window.alert(`Player points ${player.points}`);
    };

    logDraw(player, croupier) {
        window.alert("PUSH")
        window.alert(`Croupier cards: ${Object.keys(croupier.cards)}`);
        window.alert(`Croupier points ${croupier.points}`);
        window.alert(`Player cards: ${Object.keys(player.cards)}`);
        window.alert(`Player points ${player.points}`);
        window.alert(`Total balance $${player.balance}`);
    };

    logPlayerLose(player, croupier) {
        window.alert(`HOUSE WINS`);
        window.alert(`You lost: -$${croupier.gambleAmount}`);
        window.alert(`Croupier cards: ${Object.keys(croupier.cards)}`);
        window.alert(`Croupier points ${croupier.points}`);
        window.alert(`Player cards: ${Object.keys(player.cards)}`);
        window.alert(`Player points ${player.points}`);
        window.alert(`Total balance $${player.balance}`);

    };

    logPlayerWins(player, croupier) {
        window.alert(`YOU WIN!`);
        window.alert(`You win +$${croupier.gambleAmount}`);
        window.alert(`Total balance $${player.balance}`);
        window.alert(`Croupier cards: ${Object.keys(croupier.cards)}`);
        window.alert(`Croupier points ${croupier.points}`);
        window.alert(`Player cards: ${Object.keys(player.cards)}`);
        window.alert(`Player points ${player.points}`);
    };

    logHitStandDouble(player, croupier) {
        window.alert(`Croupier cards: |XXX|,${Object.keys(croupier.cards)[1]}`);
        window.alert(`Croupier points ${croupier.points - croupier.cards[Object.keys(croupier.cards)[0]]}`);
        window.alert(`Player cards: ${Object.keys(player.cards)}`);
        window.alert(`Player points ${player.points}`);
    }
};

// -------------------------------------------------------- //

const croupier = new Croupier();
const player = new Player();
const game = new Game();
const display = new Display();

croupier.shuffleDeck();

while (croupier.deck.length > 15) {

    croupier.promptPlayerGambleAmount(player);
    player.receiveCards(croupier.giveTwoCards());
    player.calculatePoints();

    // If blackjack
    //--------------------------------------------------------------------

    if (player.status === "blackjack") {
        croupier.untilOrUpTo()
    };

    if (croupier.status === "blackjack") {

        player.balance += croupier.gambleAmount;
        display.logDraw(player, croupier);
    };

    if (croupier.status === "bust") {

        player.balance = player.balance + (croupier.gambleAmount * 2.5);
        display.logPlayerWinsByBlackjack(player, croupier);
    };

    if (croupier.status === "until_or_upto") {

        player.balance = player.balance + (croupier.gambleAmount * 2.5);
        display.logPlayerWinsByBlackjack(player, croupier);
    };

    //If NotBlackjack
    //--------------------------------------------------------------------

    if (player.status !== "blackjack") {
        croupier.hitStandDouble(player, display);
    };

    // GAME RESET DATA
    //--------------------------------------------------------------------

    game.resetData(player, croupier);

    //REFILL DECK
    //--------------------------------------------------------------------

    if (croupier.deck.length < 15) {
        croupier.shuffleDeck();
    }
};

var board = {
	gameBoard: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	boardDisplay: function(){
	return ' ' + this.gameBoard[0] + ' |'
	+ ' ' + this.gameBoard[1] + ' |'
	+ ' ' + this.gameBoard[2] +
	'\n===+===+===\n' +
	' ' + this.gameBoard[3] + ' |'
	+ ' ' + this.gameBoard[4] + ' |'
	+ ' ' + this.gameBoard[5] +
	'\n===+===+===\n' +
	' ' + this.gameBoard[6] + ' |'
	+ ' ' + this.gameBoard[7] + ' |'
	+ ' ' + this.gameBoard[8]
	},
	showDisplay: function(){
		game.lineSpacing();
		console.log(this.boardDisplay());
		game.lineSpacing();
	},
	initialDisplayMessage: function(){
		console.log("Enter a number from 0 to 8 to indicate where you'd like to place your player: \n HINT: 0 is the upper left-hand corner and 9 is the bottom right-hand corner.")
	},
	clearScreen: function(){
		console.log('\033[2J');
	}
}



var players = {
	humanPlayer: false,
	computerPlayer: true,
	humanValue: -1,
	computerValue: 1,
	turn: false,
	symbol: '',
	currentPlayer: false,
	move: function(move, player){
		var index = parseInt(move);
		if(isNaN(index)){
			console.log("Please enter a NUMBER.");
		}
		if(index < 0 || index > 8) {
			console.log("Please enter a number BETWEEN zero and eight :)");
		}
		if (game.boardState[index] != 0){
			console.log("Please choose a space that's not already taken.");
		}
		if (game.boardState[index] === 0) {
	        this.symbol = (player === false ? questionMaster.answers[2] : questionMaster.answers[3]);
	        game.boardState[index] = (player === false ? this.humanValue : this.computerValue);
	        board.gameBoard.splice(index, 1, this.symbol);
	        this.currentPlayer = !this.currentPlayer;
	        game.moveCount--;
	        if (game.winner(game.boardState, player) || game.checkFull(game.boardState)) {
	            for (var x = 0; x < 9; x++) {
	                game.exit();
	            }
	        }
	        return true;
	    }
	    return false;
	}
}



var game = {
	boardState: [0, 0, 0, 0, 0, 0, 0, 0, 0],
	tempValArray: ["", "", "", "","", "", "", "", ""],
	moveCount: 9,
	completedDepths: 0,
	possibleWins: [
			[0, 1, 2],
		    [3, 4, 5],
		    [6, 7, 8],
		    [0, 3, 6],
		    [1, 4, 7],
		    [2, 5, 8],
		    [0, 4, 8],
		    [2, 4, 6]
	],
	lineSpacing: function(){
		process.stdout.write("\n\n\n");
	},
	winner: function(state, player){
		var value = (player === false ? players.humanValue : players.computerValue);
		for(x = 0; x < 8; x++){
			var win = true;
			for(y = 0; y < 3; y++){
				if(state[this.possibleWins[x][y]] != value){
					win = false;
					break;
				}
			}
			if(win){
				return true;
			}
		}
		return false;
	},
	checkFull: function(state){
		for(x = 0; x < 9; x++){
			if(state[x] === 0){
				return false;
			}
		}
		return true;
	},
	computeMinimax: function(state, depth, player, turn){
		if(this.winner(state, !player)) {
			return -10 + depth;
		} 
		if(this.checkFull(state)){
			return 0;
		}
		var value = (player === false ? players.humanValue : players.computerValue);
		var max = -Infinity;
		var index = 0;
		for(var x = 0; x < 9; x++) {
			if (state[x] === 0) {
				var newBoard = state.slice();
				newBoard[x] = value;
				var moveValue = -this.computeMinimax(newBoard, depth + 1, !player, turn);
				if(depth === 0) {
					this.tempValArray.splice(x, 1, moveValue);
					this.completedDepths++;
					if(this.completedDepths === this.moveCount){
						turn = true;
						this.completedDepths = 0;
					}

				}
				if (moveValue > max) {
					max = moveValue;
					index = x;
				}
			}
		}
		if(turn){
			players.move(index, player);
			board.clearScreen();
			console.log("The computer just moved to square #" + index);
		}
		return max;
	},
	exit: function() {
		board.clearScreen();
		if(this.checkFull(this.boardState)) {
			console.log("Cat's game!");
		} else {
			console.log("The computer never loses!");
		}
	    console.log(board.boardDisplay());
	    process.exit();
	}
}



var questionMaster = {
	questions: ["Hi there! What's your name?",
			 "Please type 'C' if you'd like to play the computer and 'H' if you'd like to play another person.",
			 "What symbol would you like to use, if you're bored of X's and O's?",
			 "What symbol would you like Player 2 to use?",
			 "If you'd like to go first, type 1. If you'd like the computer to go first, type 2."
				],
	answers: [],
	askQuestions: function(i){
		if (this.answers.length === 1) {
			console.log("Hello, " + this.answers[0] + "!");
		}
		console.log(this.questions[i] + "\n");
		initializeGame(i);
	}
}



var initializeGame = function(i){
	process.stdin.on('readable', function(){
		var chunk = process.stdin.read();
		if(chunk != null){
			var response = chunk.toString().trim();
			if (questionMaster.answers.length < 5) {
				if((questionMaster.answers.length === 1) && ((response != 'H') && (response != 'C'))){
					console.log("Please try again")
					return false;
				} else {
					questionMaster.answers.push(response);
					if(questionMaster.answers.length === 5){
						if(questionMaster.answers[4] === '1'){
							board.clearScreen();
							board.initialDisplayMessage();
							board.showDisplay();
						} else if(questionMaster.answers[1] === 'H'){
							board.clearScreen();
							console.log("Let's go!")
							board.initialDisplayMessage();
							board.showDisplay();
						} else if(questionMaster.answers[1] === 'C' && questionMaster.answers[4] === '2'){
							board.clearScreen();
							console.log("Computer is moving first!");
							game.computeMinimax(game.boardState, 0, players.currentPlayer, false);
							board.initialDisplayMessage();
							board.showDisplay();
						} 
						return;
					}
				}
			}
			else {
				if(questionMaster.answers[1] === 'C'){
					if (players.move(response, players.currentPlayer)){
						if(game.winner(game.boardState, players.currentPlayer) || game.checkFull(game.boardState)){
							game.exit();
						} else {
							game.computeMinimax(game.boardState, 0, players.currentPlayer, this.turn)
							if(game.winner(game.boardState, players.currentPlayer) || game.checkFull(game.boardState)){
								game.exit();
							} else {
								console.log("Your turn again!");
								board.showDisplay();
								
							}
						}
					}
				} else if(questionMaster.answers[1] === 'H') {
					if(players.move(response, players.currentPlayer)){
						if(game.winner(game.boardState, players.currentPlayer) || game.checkFull(game.boardState)){
						game.exit();
						} else {
							board.clearScreen();
							console.log("Next player!");
							board.showDisplay();		
						}
					}
				}
			}

			if ((i === questionMaster.questions.length - 2) && ((questionMaster.answers[1] === 'H'))) {
				if (questionMaster.answers.length < 5){
					console.log("Are you ready??");
				}
				return;
			} else if ((i === questionMaster.questions.length - 1) && ((questionMaster.answers[1] === 'C'))) { 
				return;
			} else {
				i++;
				questionMaster.askQuestions(i);
			}
		} 
	});
}




questionMaster.askQuestions(0);



module.exports = {
	questionMaster: questionMaster,
	initializeGame: initializeGame,
	board: board,
	players: players,
	game: game
}



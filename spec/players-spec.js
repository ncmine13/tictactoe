var playGame = require('../js/game.js');

xdescribe("The player object", function() {

	it("has the correct value of human player", function(){
		var humanPlayer = playGame.players.humanPlayer;
		expect(humanPlayer).toBe(false);
	});

	it("has the correct value of computer player", function(){
		var computerPlayer = playGame.players.computerPlayer;
		expect(computerPlayer).toBe(true);
	});

	it("has the correct value of human value", function(){
		var humanValue = playGame.players.humanValue;
		expect(humanValue).toEqual(-1);
	});

	it("has the correct value of computer value", function(){
		var computerValue = playGame.players.computerValue;
		expect(computerValue).toEqual(1);
	});

	it("assigns the symbol correctly", function(){
		var answers = playGame.questionMaster.answers;
		answers.push('Naomi', 'C', 'M', 'C', '1');
		var move = playGame.players.move('2', false);

		if(move){
			var symbol = playGame.players.symbol;
			expect(symbol).toEqual('M');
		}
		playGame.players.currentPlayer = false;
	});

	it("checks currentPlayer at game onset", function(){
		var currentPlayer = playGame.players.currentPlayer;
		expect(currentPlayer).toBe(false);
	});

	it("checks the value of turn at game onset", function(){
		var turn = playGame.players.turn;
		expect(turn).toBe(false);
	});

});



var playGame = require('../js/game.js');
var intercept = require("intercept-stdout");

xdescribe("The game object", function(){
	it("knows when the board is full", function(){
		var gameState = [1, 1, 1, 1, 1, 1, 1, 1, 1];
		var checkFull = playGame.game.checkFull(gameState);

		expect(checkFull).toBe(true);
	});

	it("knows when there's a win", function(){
		var gameState = [1, 1, 1, -1, 0, -1, 0, 0, 0];
		var player = true;
		var possibleWins = playGame.game.possibleWins
		var winner = playGame.game.winner(gameState, player)

		expect(winner).toBe(true);
	});

	it("knows when there's not a win", function(){
		var gameState = [1, 1, 0, -1, 0, -1, 0, 0, 0];
		var player = true;
		var possibleWins = playGame.game.possibleWins
		var winner = playGame.game.winner(gameState, player);

		expect(winner).toBe(false);
	});
})
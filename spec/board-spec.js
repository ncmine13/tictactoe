var playGame = require('../js/game.js');
var intercept = require("intercept-stdout");


xdescribe("The board object", function() {

	it("shows the game board when the board display function is called", function(){
		var logInterceptor = intercept(function(txt){				
			expect(txt).toEqual('   |   |  \n===+===+===\n   |   |  \n===+===+===\n   |   |  \n');
		});

		console.log(playGame.board.boardDisplay());
		logInterceptor();
	});

	it("shows that the gameboard is initially an array of spaces", function(){
		var board = playGame.board.gameBoard;
		for(i=0; i<9; i++){
			expect(board[i]).toEqual(' ');
		}
	});

	it("shows that the game board at a given space changes when someone makes a move", function(){
		var board = playGame.board.gameBoard;
		board[5] = 'H';

		expect(board[5]).toEqual('H');
	})
});



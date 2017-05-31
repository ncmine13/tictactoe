var playGame = require('../js/game.js');
var intercept = require("intercept-stdout")

xdescribe("asks questions", function() {

	it("shows first question when called", function(){
		var logInterceptor = intercept(function(txt){
			expect(txt).toEqual('Hi there! What\'s your name?\n');
		});

		playGame.askQuestions(0);
		logInterceptor();
	});

	it("shows second question when called", function(){
		var logInterceptor = intercept(function(txt){
		expect(txt).toEqual("Please type 1 if you'd like to play the computer and 2 if you'd like to play another person.\n");
		});

		playGame.askQuestions(1);
		logInterceptor();
	});

	it("shows second question when called", function(){
		var logInterceptor = intercept(function(txt){
		expect(txt).toEqual("What symbol would you like to use, if you're bored of X's and O's?\n");
		});

		playGame.askQuestions(2);
		logInterceptor();
	});

	it("shows second question when called", function(){
		var logInterceptor = intercept(function(txt){
		expect(txt).toEqual("What symbol would you like player 2 to use?\n");
		});

		playGame.askQuestions(3);
		logInterceptor();
	});

	it("shows second question when called", function(){
		var logInterceptor = intercept(function(txt){
		expect(txt).toEqual("If you'd like to go first, type 1. If you'd like the computer to go first, type 2.\n");
		});

		playGame.askQuestions(4);
		logInterceptor();
	});

});
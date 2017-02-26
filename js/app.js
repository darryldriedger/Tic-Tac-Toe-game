//  (function () {
// // // use strict
//  'use strict'

//document.addEventListener('DOMContenetLoaded', () => {});

	//let body = document.getElementsByTagName("body");
	//body.innerHTML = "<h1>Tic Tac Toe</h1><input placeholder='Enter yourname'><button>Start Game</button>";
	// $("body").append("<div class='screen screen-start' id='start'><h1>Tic Tac Toe</h1><input class='players' placeholder='Enter yourname'><button class='button'>Start Game</button></div>");
	
	// const compPlay = false; 
	let player_name = "";//active = "", mover = "", player = "", 
	// let screenWin = "screen-win-one"
	let message = `${player_name } Wins`;
	let status = {active: "", mover: "", player: ""};
	let screenWin = "";
	// message= "You Win";
	// status.active = 1;
	// status.mover = "o";
	// status.player= "player1";
	//dar = nameOne;
	// "Its a Tie"

	//Appends the start screen 
	$('body').append(`<div class='screen screen-start' id='start'><header><h1>Tic Tac Toe</h1><input type='text' class='nameInput player1Name' id='player1Name' placeholder='Enter Player 1 Name'><br/><input type='text' class='nameInput player2Name' id='player2Name' placeholder='Enter Player 2 Name'><br/><a href='#' class='button' id='startButton'>Play Game</a><br><label><input type='checkbox' class='compChoice' /> Challenge the computer</label><br></header></div>`);
	//Appends the finish screen
	$('body').append( `<div class='screen' id='finish'><header><h1>Tic Tac Toe</h1><p class='message'>${message}</p><a href='#' class='button' id='finishButton'>New game</a></header></div>`);
	//Add CSS styling to the input fields referencing the text type
	$('.nameInput').css({"width": "15em","padding": "12px 20px","margin": "8px 0","box-sizing": "border-box","border-radius": "5px"});
	//Hide the board and finish on start
	$("#board, #finish").hide();
	//Name function retrieves the name values and appends them to the board
	const names = ()=>{
		if(!$('.nameLabel').val()){
			const nameOne = $('#player1Name').val().toUpperCase();
			const nameTwo = $('#player2Name').val().toUpperCase();
			$('#player1').append(`<label class="nameLabel">${nameOne}</label>`);
			$('#player2').append(`<label class="nameLabel">${nameTwo}</label>`);
		}
	};
	//Listen for click on the start game button
	$(".button").on('click',()=>{
		names();//calls names function
		playAlt();//Alternates players on start
		$("#board").show("slow");
		$("#start, #finish").hide("slow");
	});
	//Function that alternates between players
	const playAlt = ()=>{
   		if($('#player1').hasClass('active')){
			$('#player2').addClass('active');
			$('#player1').removeClass('active');
			//changes the status object information to player 2
			status.active = 2;
			status.mover = "x";
			status.player = "player2";
			return status;
		} else {
			$('#player2').removeClass('active');
			$('#player1').addClass('active');
			//changes the status object information to player 1
			status.active = 1;
			status.mover = "o";
			status.player = "player1";
			return status;
		}
   };
   	//Listens for mouseover and mouse out and adds/removes background image	
	$(".box").mouseover(function() {
		//Checks if box is occupied
		if(!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2') ){
			$(this).css("background-image", `url(./img/${status.mover}.svg)`);
		}}).mouseout(function(){
			$(this).css("background-image", "");
			})	
			
	//Listens for click on box and adds the coresponding live status (fills box)
    $(".box").click(function(){
    	//Checks if box is occupied
	   	if(!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2') ){
	   		$(this).addClass(`box-filled-${status.active}`);
	   		playAlt();
	   	}
	});
	// screenWin = screenWinn();
 //    const screenWinn = ()=>{
 //    	console.log("wins");
 //    	return "screen-win-one";
 //    };
//append the start and finish screen to the body
			
	//hide the board and the finish

//start screen includes the two name inputs the button and the computer check box
	//retrieve the names
	//retrive the status of the checkbox 'toggle'

//listen for button and log the info when clicked

//the board should append the names to the board 

//hover over blocks class

//switch back and forth between people
	//calculate the score and game finish

//when the game is finished show the finish screen and hide the board
				
	//listen to the start game button 
	//hide finish and show the board

// });
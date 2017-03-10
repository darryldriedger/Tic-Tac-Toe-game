 //Module Pattern
 // (function () {
 // 'use strict';
 	//Create status object to hold details of the active mover/player
	let status = {active: "", mover: "", player: ""};
	//An array to count the number of used boxes on the board
	let boxfillArr = [];
	//An object to hold players names information
	let playerNames = {one:"Player 2 wins!",two:"Player 1 wins!"};
	//Status of the computer challenge option
	let comPlay = "";
	//will hold the win screen message
	let message = "";
	//Array object for storing board results
	let arrObj = {arr1: "", arr2: ""};
	//Appends the start screen 
	$('body').append(`<div class='screen screen-start' id='start'><header><h1>Tic Tac Toe</h1><input type='text' class='nameInput player1Name' id='player1Name' placeholder='Enter Player 1 Name'><br/><input type='text' class='nameInput player2Name' id='player2Name' placeholder='Enter Player 2 Name'><br/><a href='#' class='button' id='startButton'>Play Game</a><br><label><input type='checkbox' id='compChoice' /> Challenge the computer</label><br></header></div>`);
	//Appends the finish screen
	$('body').append( `<div class='screen screen-win' id='finish'><header><h1>Tic Tac Toe</h1><p class='message'></p><a href='#' class='button' id='finishButton'>New game</a></header></div>`);
	//Add CSS styling to the input fields referencing the text type
	$('.nameInput').css({"width": "15em","padding": "12px 20px","margin": "8px 0","box-sizing": "border-box","border-radius": "5px"});
	//Hide the board and finish on start
	$("#board, #finish").hide();
	//Name function retrieves the name values and appends them to the board
	const names = ()=>{
		//Holds the name input value transformed to upper case
		const nameOne = $('#player1Name').val().toUpperCase();
		const nameTwo = $('#player2Name').val().toUpperCase();
		//Append the player names to the board
		$('#player1').append(`<label class="nameLabel" id="label1">${nameOne}</label>`);
		$('#player2').append(`<label class="nameLabel" id="label2">${nameTwo}</label>`);
		//Adds the name and message to the name object	
		playerNames.one = `${nameOne} WINS!`;
		playerNames.two = `${nameTwo} WINS!`;
		//Changes player 2 name if computer is engaged
		if(comPlay === true){
			const nameThree = "COMPUTER";
			$('#label2').remove();
			$('#player2').append(`<label class="nameLabel">${nameThree}</label>`);
			//Adds the name and message to the name object
			playerNames.two = `${nameThree} WINS!`;
		};
		return playerNames;
	};
	//Listen for click on the start game button
	$(".button").on('click',()=>{
		$('.nameLabel').remove();
		names();//calls names function
		playAlt();//Alternates players on start
		$('.box').removeClass('box-filled-1 box-filled-2');
		$("#board").show("slow");
		$("#start, #finish").hide("slow");
		//removes the classes from the win screen 
		$('#finish').removeClass("screen-win-one screen-win-two screen-win-tie winner");
		//clears the box count array 
		boxfillArr = [];
		//clears the message variable
		message = "";
		computer();
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
		//Checks if box is occupied adds and removes background image on mouse in then out
		if(!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2') ){
			$(this).css("background-image", `url(./img/${status.mover}.svg)`);
		}}).mouseout(function(){
			$(this).css("background-image", "");
			});
			
	//Listens for click on box and adds the coresponding live status (fills box)
    $(".box").click(function(){
    	//Checks if box is occupied
	   	if(!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2') ){
	   		$(this).addClass(`box-filled-${status.active}`);
	   		//pushes a 1 into the array to be counted later
	   		boxfillArr.push(1);
	   		winCheck();
	   		playAlt();
	   		return boxfillArr;
	   	}
	});
    //Function checks win scenarios; takes 3 args: an array, win class string, and a player number
	const winArrChk = (array, winScreen,player)=>{
		//win function constructs the win screen
		let win = ()=>{
			if(player === 1){
				message = playerNames.one;
			} else if (player === 2){
				message = playerNames.two;
			}
			$('.message').html(message);
			$("#board").hide("slow");
			$("#finish").addClass(winScreen).show("slow");
			return message;
		};//checks all possible win scenarios on the board
		if (array[0] && array[1] && array[2]){
			win();
		} else if (array[3] && array[4] && array[5]){
			win();
		} else if (array[6] && array[7] && array[8]){
			win();
		} else if (array[0] && array[3] && array[6]){
			win();
		} else if (array[1] && array[4] && array[7]){
			win();
		} else if (array[2] && array[5] && array[8]){
			win();
		} else if (array[0] && array[4] && array[8]){
			win();
		} else if (array[2] && array[4] && array[6]){
			win();
		} else if (message === "" && boxfillArr.length === 9) {
			message = "It's a Tie!";
			$('.message').html(message);
			$("#board").hide("slow");
			$("#finish").addClass("screen-win-tie").show("slow");
		}
	};
	//Function with  for loop that runs through the children to check for filled positions
	const winCheck = ()=>{
		let countArr1 = [];
		let countArr2 = [];
		//pushes the results into arrays to be checked
		for(let i=1; i<=9; i++){
			let boxCount1 = $(`.boxes :nth-child(${i})`).hasClass(`box-filled-1`);
			let boxCount2 = $(`.boxes :nth-child(${i})`).hasClass(`box-filled-2`);
			countArr1.push(boxCount1);
			countArr2.push(boxCount2);
		}
		winArrChk(countArr1,"screen-win-one",1);
		winArrChk(countArr2,"screen-win-two",2);
		arrObj.arr1 = countArr1;
		arrObj.arr2 = countArr2;
	};
	//Engages the computer option
	$('#compChoice').on("click",()=>{
		if($("input:checked").val() === "on"){
			comPlay = true;
		}
		return comPlay;
	});

	const computer = ()=>{
		if(comPlay === true && $("player2").hasClass("active")){
			// if statement arrObj.arr1[0]
			//employ a simple if strategy 
		};
	};
	// 	if(this.checked){
	// 		comPlay = true;
	// 	} else {
	// 		complay = false;
	// 	}
	// 	console.log(comPlay);
	// 	return comPlay;
	// });
	// const computerCheck = ()=>{

	// };
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

// }());
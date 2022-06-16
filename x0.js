let activePlayer = "X";
let nextPlayer = "0";
let msgBottomString = "The player " + activePlayer + " start the game";
let array3Cells = ["","",""];
const matrix = [["","",""], ["","",""],["","",""]];// multidimensional array
let winner = "";
let scoreX = 0, score0 = 0;
let countGame=0;

////////////////////////////////////////////////////////////
/////////////// Basic game functionality
////////////////////////////////////////////////////

//startup event
function onLoadPage() {	
	disableCells(false); 
	displayBottomMessage("The player " + activePlayer +" start the game")  
}

//Reset game and initialize matrix and messages
function btnReset() {
	initCellsContent();
	disableCells(false);
	firstPlayer();
	displayBottomMessage("The player " + activePlayer + " start the game")  	
}

function firstPlayer() {
	countGame ++;
	if (countGame % 2 == 0)
		activePlayer = "X";
	else 
		activePlayer = "0";
}


// Push cell event
function onCellPressed(cellNumber) {
	setCellContent(cellNumber);
	getMatrixStatus();//Get status of matrix
	analyzeMatrix();
	checkNullGameOver();
	toggleActivePlayer();
	if (winner == "")
		displayBottomMessage("It's turn to " + activePlayer + " to move")
}

//Set the letter X or 0 and toggle
function setCellContent(cellNumber) {
	cellId = "b" + cellNumber; //Get id cell
	document.getElementById(cellId).value = activePlayer;
	document.getElementById(cellId).disabled = true;
}

function toggleActivePlayer() {
	if (activePlayer == "X") {
		activePlayer = "0";	
	} else 
		activePlayer = "X";
}

//Get the actual letter in every cell.
function getMatrixStatus() {
	let k = 1;
	for (let i = 0; i <= 2; i ++)  
		for (let j = 0; j <= 2; j ++) {
			matrix[i][j]=document.getElementById("b" + k ).value;
			k += 1;
		}
}

//Look for XXX or 000 sequences in all direction : horizontal,vertical,diagonal
function analyzeMatrix() {
	 winner = "";
	 warningToLose = "";
	//Check all horizontal lines
	for (let i = 0; i <= 2; i ++) {
		for (let j = 0; j <= 2; j ++) 
			array3Cells[j] = matrix[i][j];
		analyzeArrayOf3Cells();
	}
	//Check all vertical columns	 
	for (let j = 0; j <= 2; j ++) { 	
		for (let i = 0; i <= 2; i ++)
		 	array3Cells[i] = matrix[i][j];	 	
		analyzeArrayOf3Cells();
	}

  //Check main diagonal
	for (let i = 0; i <= 2; i ++)
			array3Cells[i] = matrix[i][i];
	analyzeArrayOf3Cells();

	//Check auxiliary diagonal
	for (let i = 0; i <= 2; i ++)
		array3Cells[i] = matrix[i][2 - i];		  		 
	analyzeArrayOf3Cells();  
}

function analyzeArrayOf3Cells() {
	checkWinner();
}

function checkWinner() {
	countEqualCells=1;
	for (let i = 0; i <= 2; i ++) {
		if (i > 0)
			if (array3Cells[i] == array3Cells[i - 1] )
			  if (array3Cells[i] == "0" || array3Cells[i] == "X")
				countEqualCells ++
		if (countEqualCells == 3) {
			winner=array3Cells[0];
			disableCells(true);
			displayBottomMessage("Game over ! Player " + winner + " win ! ");
			score();
		}		 	
	}
}

function checkNullGameOver() {
	//check game over full
	countPressedCells = 0;
	for (let i = 0; i <= 2; i ++)
	   for (let j = 0; j <= 2; j ++) 
	      if (matrix[i][j]!="")
		  	countPressedCells ++;
	if (countPressedCells >= 9) {  //Game over
		disableCells(true);
		displayBottomMessage("Game NULL over ! ");
		winner="=";
	}	
}

function displayBottomMessage( stringToPrint ) {
	msgBottomString=stringToPrint;
	document.getElementById("msgBottom").innerHTML=msgBottomString;
}


function disableCells(action) {
//Disable all cells at game over
	for (let i = 1; i <= 9; i ++) 
		document.getElementById("b" + i).disabled = action; 
}

function initCellsContent() {
	let k = 1;
	for (let i = 0; i <= 2; i ++)
		for (let j = 0; j <= 2; j ++) {
			matrix[i][j] = "";
			document.getElementById("b" + k).value = "";
			k ++
		}
}

function score() {
	if (winner == "X")
		scoreX ++;
	if (winner == "0")
		score0 ++;
	document.getElementById("scoreX").innerHTML = scoreX;	
	document.getElementById("score0").innerHTML = score0;	
}

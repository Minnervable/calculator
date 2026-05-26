// these four functions are the basis of the computer

function add(firstNumber, secondNumber) {
	return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
	return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
	return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
	return firstNumber / secondNumber;
}
// global variables
const infinity = [
	"And then chaos ensued",
	"A black hole",
	"The end of the universe",
	"Cookies: 0 Friends: 0",
];
let infinityCounter = 0;
let initialNumber;
let operator;
let finalNumber;
let phaseTracker = "idle";
let newNumber = true;
// this function uses the other four functions inside it to make the computer do math
function operate(op, firstNumber, secondNumber) {
	switch (op) {
		case "+":
			return +add(firstNumber, secondNumber).toFixed(15);
		case "-":
			return +subtract(firstNumber, secondNumber).toFixed(15);
		case "*":
			return +multiply(firstNumber, secondNumber).toFixed(15);
		case "/":
			if (secondNumber === 0) {
				let currentJoke = infinity[infinityCounter];
				infinityCounter++;
				if (infinityCounter === infinity.length) {
					infinityCounter = 0;
				}
				return currentJoke;
			} else {
				return +divide(firstNumber, secondNumber).toFixed(15);
			}
	}
}
// this line create button array
const buttons = document.querySelectorAll(".button");
// this line creates the function to loop through the buttons
buttons.forEach(function (button) {
	// this block covers possible conditions the computer could encounter
	button.addEventListener("click", function () {
		// the blink function makes the calculator blink every time a button pressed
		function blink(screen = "0") {
			display.textContent = "";
			setTimeout(function () {
				display.textContent = screen;
			}, 32);
			return;
		}
		// this block controls most of the decimal functionality
		if (button.id === "decimal") {
			button.classList.add("disabled");
			if (newNumber === true) {
				display.textContent = "0" + button.textContent;
				newNumber = false;
				if (phaseTracker === "idle") {
					phaseTracker = "firstNumber";
				}
				return;
			}
		}
		// this block controls the number buttons and the decimal sometimes
		if (button.classList.contains("number") || button.id === "decimal") {
			if (newNumber === true) {
				display.textContent = "";
				newNumber = false;
			}
			// this snippet caps the screen so it doesnt overflow
			if (display.textContent.length < 16) {
				display.textContent = display.textContent + button.textContent;
			}
		}
		// this snippet refuses to let the decimal button be pressed at all if its disabled
		if (button.classList.contains("disabled")) {
			return;
		}

		// this block mainly controls the basic new number flag variable. it only triggers when a number is pressed
		if (
			newNumber === true &&
			!button.classList.contains("operator") &&
			button.id !== "equals" &&
			!button.classList.contains("clear")
		) {
			display.textContent = "";
			newNumber = false;
		}
		// this block controls the all clear button
		if (button.id === "all-clear") {
			if (display.textContent !== "") {
				display.textContent = "0";
				phaseTracker = "idle";
				newNumber = true;
				initialNumber = undefined;
				operator = undefined;
				finalNumber = undefined;
				document.querySelector("#decimal").classList.remove("disabled");
			}
		}
		// this block controls the backspace button
		if (button.id === "backspace") {
			if (display.textContent !== "") {
				display.textContent = display.textContent.slice(0, -1);
			}
			if (display.textContent === "") {
				display.textContent = "0";
				newNumber = true;
			}
			if (phaseTracker === "firstNumber") {
				initialNumber = display.textContent;
			} else if (phaseTracker === "secondNumber") {
				finalNumber = display.textContent;
			}
		}
		// this block controls the change sign button
		if (button.id === "change-sign") {
			display.textContent = display.textContent * -1;
			if (phaseTracker === "firstNumber") {
				initialNumber = display.textContent;
			} else if (
				phaseTracker === "secondNumber" &&
				finalNumber !== undefined
			) {
				finalNumber = display.textContent;
			}
		}
		// this block controls what state the calculator is in
		switch (phaseTracker) {
			// if the state is idle the screen is on 0 and no variables have been assigned
			case "idle":
				if (button.classList.contains("number")) {
					display.textContent = button.textContent;
					phaseTracker = "firstNumber";
				}
				// if the first button pressed is the decimal there will be a 0 placed in from of the decimal
				if (button.id === "decimal") {
					phaseTracker = "firstNumber";
					display.textContent = "0" + button.textContent;
				}
				break;

			// if the state is first number the initial number will be saved
			case "firstNumber":
				// if the operator is not undefined then the math will run on the screen
				if (button.classList.contains("operator")) {
					if (operator !== undefined) {
						display.textContent = operate(
							operator,
							+initialNumber,
							+display.textContent,
						);
					}
					// these next lines happen any time an operator is hit
					operator = button.textContent;
					phaseTracker = "secondNumber";
					initialNumber = display.textContent;
					document
						.querySelector("#decimal")
						.classList.remove("disabled");
					newNumber = true;
				}

				break;

			// this block controls the second number
			case "secondNumber":
				// if the first number pressed is equals
				if (button.id === "equals") {
					finalNumber = display.textContent;
					display.textContent = operate(
						operator,
						+initialNumber,
						+finalNumber,
					);
					phaseTracker = "firstNumber";
					initialNumber = display.textContent;
					finalNumber = "";
					operator = undefined;
					newNumber = true;
					document
						.querySelector("#decimal")
						.classList.remove("disabled");
					// if the fist button pressed is an operator
				} else if (button.classList.contains("operator")) {
					if (newNumber === true) {
						operator = button.textContent;
					} else {
						finalNumber = display.textContent;
						display.textContent = operate(
							operator,
							+initialNumber,
							+finalNumber,
						);
						newNumber = true;
						operator = button.textContent;
						initialNumber = display.textContent;
						phaseTracker = "secondNumber";
						document
							.querySelector("#decimal")
							.classList.remove("disabled");
					}
				}
				break;
		}
		// calling blink at the end of all the other code for this listener ensures that it runs for every button press
		blink(display.textContent);
	});
});
// this block is for the keyboard support. one of the cases triggers every time one of the assigned buttons is pressed
window.addEventListener("keydown", function (event) {
	let key = event.key;
	let buttonId;
	switch (key) {
		case "0":
			buttonId = "#zero";
			break;
		case "1":
			buttonId = "#one";
			break;
		case "2":
			buttonId = "#two";
			break;
		case "3":
			buttonId = "#three";
			break;
		case "4":
			buttonId = "#four";
			break;
		case "5":
			buttonId = "#five";
			break;
		case "6":
			buttonId = "#six";
			break;
		case "7":
			buttonId = "#seven";
			break;
		case "8":
			buttonId = "#eight";
			break;
		case "9":
			buttonId = "#nine";
			break;
		case "Enter":
			buttonId = "#equals";
			break;
		case "Backspace":
			buttonId = "#backspace";
			break;
		case "+":
			buttonId = "#add";
			break;
		case "-":
			buttonId = "#subtract";
			break;
		case "*":
			buttonId = "#multiply";
			break;
		case "/":
			buttonId = "#divide";
			break;
		case ".":
			buttonId = "#decimal";
			break;
		case "Delete":
			buttonId = "#all-clear";
			break;
		case "Shift":
			buttonId = "#change-sign";
			break;
	}
	// this controls the flashing of the buttons when the keyboard is being used
	if (buttonId !== undefined) {
		let buttonToClick = this.document.querySelector(buttonId);
		buttonToClick.classList.add("pressed");
		buttonToClick.click();
		setTimeout(function () {
			buttonToClick.classList.remove("pressed");
		}, 48);
	}
});

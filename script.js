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

const infinity = [
	"and then chaos ensued",
	"A black hole",
	"The end of the universe",
];
let infinityCounter = 0;
let initialNumber;
let operator;
let finalNumber;
let phaseTracker = "idle";
let newNumber = true;

function operate(op, firstNumber, secondNumber) {
	switch (op) {
		case "+":
			return add(firstNumber, secondNumber);
		case "-":
			return subtract(firstNumber, secondNumber);
		case "*":
			return multiply(firstNumber, secondNumber);
		case "/":
			if (secondNumber === 0) {
				let currentJoke = infinity[infinityCounter];
				infinityCounter++;
				if (infinityCounter === infinity.length) {
					infinityCounter = 0;
				}
				return currentJoke;
				// return "Slow your roll!";
			} else {
				return divide(firstNumber, secondNumber);
			}
	}
}
const buttons = document.querySelectorAll(".button");
buttons.forEach(function (button) {
	button.addEventListener("click", function () {
		function blink(screen = "0") {
			display.textContent = "";
			setTimeout(function () {
				display.textContent = screen;
			}, 50);
			return;
		}
		if (button.classList.contains("disabled")) {
			return;
		}
		if (button.id === "decimal") {
			button.classList.add("disabled");
			if (newNumber === true) {
				display.textContent = "0" + button.textContent;
				newNumber = false;
				// phaseTracker = "firstNumber";
				return;
			}
		}

		if (
			newNumber === true &&
			!button.classList.contains("operator") &&
			button.id !== "equals" &&
			!button.classList.contains("clear")
		) {
			display.textContent = "";
			newNumber = false;
		}
		if (button.classList.contains("number") || button.id === "decimal") {
			newNumber = false;
			display.textContent = display.textContent + button.textContent;
		}
		if (button.id === "all-clear") {
			// console.log(display.textContent);
			if (display.textContent !== "") {
				// 	blink();
				// return;
				display.textContent = "0";
				phaseTracker = "idle";
				newNumber = true;
				initialNumber = undefined;
				operator = undefined;
				finalNumber = undefined;
				document.querySelector("#decimal").classList.remove("disabled");
				// return;
			}
		}
		if (button.id === "backspace") {
			if (display.textContent !== "") {
				// 	blink();
				// return;
				display.textContent = display.textContent.slice(0, -1);
			}
			if (display.textContent === "") {
				display.textContent = "0";
				newNumber = true;
			}
			if (phaseTracker === "firsNumber") {
				initialNumber = display.textContent;
			} else if (phaseTracker === "secondNumber") {
				finalNumber = display.textContent;
			}
		}
		switch (phaseTracker) {
			case "idle":
				if (
					button.classList.contains("number")
					// button.id !== "equals" &&
					// !button.classList.contains("clear") &&
					// !button.classList.contains("operator") &&
					// button.id !== "decimal"
				) {
					// 	blink();
					// return;
					display.textContent = button.textContent;
					phaseTracker = "firstNumber";
					// newNumber = true;
				}
				if (button.id === "decimal") {
					phaseTracker = "firstNumber";
					display.textContent = "0" + button.textContent;
				}
				break;

			case "firstNumber":
				if (button.classList.contains("operator")) {
					if (newNumber === true) {
						operator = button.textContent;
					} else {
						if (operator !== undefined) {
							display.textContent = operate(
								operator,
								+initialNumber,
								+display.textContent,
							);
						}
						operator = button.textContent;
						phaseTracker = "secondNumber";
						initialNumber = display.textContent;
						// blink(display.textContent);
						document
							.querySelector("#decimal")
							.classList.remove("disabled");
						newNumber = true;
					}
				}
				// console.log(initialNumber, display.textContent);
				// if (button.id === "equals") {
				// 	// blink(display.textContent);
				// 	return;
				// } else if (
				// 	button.id === "equals" &&
				// 	display.textContent === initialNumber
				// ) {
				// 	// blink(display.textContent);
				// 	return;
				// }

				break;

			case "secondNumber":
				if (button.id === "equals") {
					finalNumber = display.textContent;
					// console.log(operator, initialNumber, finalNumber);
					display.textContent = operate(
						operator,
						+initialNumber,
						+finalNumber,
					);
					phaseTracker = "firstNumber";
					initialNumber = display.textContent;
					finalNumber = "";
					operator = "";
					newNumber = true;
					document
						.querySelector("#decimal")
						.classList.remove("disabled");
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
		blink(display.textContent);
	});
});

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

function operate(op, firstNumber, secondNumber) {
	switch (op) {
		case "+":
			return +add(firstNumber, secondNumber).toFixed(8);
		case "-":
			return +subtract(firstNumber, secondNumber).toFixed(8);
		case "*":
			return +multiply(firstNumber, secondNumber).toFixed(8);
		case "/":
			if (secondNumber === 0) {
				let currentJoke = infinity[infinityCounter];
				infinityCounter++;
				if (infinityCounter === infinity.length) {
					infinityCounter = 0;
				}
				return currentJoke;
			} else {
				return +divide(firstNumber, secondNumber).toFixed(8);
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
		if (button.classList.contains("number") || button.id === "decimal") {
			if (newNumber === true) {
				display.textContent = "";
				newNumber = false;
			}
			display.textContent = display.textContent + button.textContent;
		}
		if (button.classList.contains("disabled")) {
			return;
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
		switch (phaseTracker) {
			case "idle":
				if (button.classList.contains("number")) {
					display.textContent = button.textContent;
					phaseTracker = "firstNumber";
				}
				if (button.id === "decimal") {
					phaseTracker = "firstNumber";
					display.textContent = "0" + button.textContent;
				}
				break;

			case "firstNumber":
				if (button.classList.contains("operator")) {
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
					document
						.querySelector("#decimal")
						.classList.remove("disabled");
					newNumber = true;
				}

				break;

			case "secondNumber":
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

function add(a, b) {
  return +a + +b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, leftOperand, rightOperand) {
  if (operator === "+") return add(leftOperand, rightOperand);
  else if (operator === "-") return subtract(leftOperand, rightOperand);
  else if (operator === "*") return multiply(leftOperand, rightOperand);
  else if (operator === "/") return divide(leftOperand, rightOperand);
}

const display = document.querySelector("#calculator-display");

function updateDisplay(displayValue) {
  display.textContent = displayValue;
}

function displayErrorMessage() {
  updateDisplay("ERROR");
}

let expressionStr = "0";
let currentOperand = "0";

function resetExpression() {
  expressionStr = "0";
  currentOperand = "0";
}

// Operator mode is set to true when an operator has been selected,
// and then set to false when a number is selected or the clear button is pressed.
let operatorMode = false;

const clearBtn = document.querySelector("#pad-clear");
clearBtn.addEventListener("click", () => {
  operatorMode = false;
  resetExpression();
  updateDisplay(expressionStr);
});

const operandButtons = document.querySelectorAll(".operand-button");
operandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentOperand === "0") {
      currentOperand = `${button.textContent}`;
      expressionStr = `${expressionStr.slice(0, -1)}${button.textContent}`;
      currentOperand = `${button.textContent}`;
      updateDisplay(expressionStr);
    } else if (!operatorMode) {
      currentOperand = `${currentOperand}${button.textContent}`;
      expressionStr = `${expressionStr}${button.textContent}`;
      updateDisplay(expressionStr);
    } else if (operatorMode) {
      currentOperand = `${currentOperand}${button.textContent}`;
      expressionStr = `${expressionStr} ${button.textContent}`;
      operatorMode = false;
      updateDisplay(expressionStr);
    }
  });
});

const operatorButtons = document.querySelectorAll(".operator-button");
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (operatorMode) {
      expressionStr = `${expressionStr.slice(0, -1)}${button.textContent}`;
      updateDisplay(expressionStr);
    } else if (!operatorMode) {
      expressionStr = `${expressionStr} ${button.textContent}`;
      currentOperand = "";
      operatorMode = true;
      updateDisplay(expressionStr);
    }
  });
});

const equalsBtn = document.querySelector("#pad-equals");
equalsBtn.addEventListener("click", () => {
  const expressionArray = expressionStr.split(" ");
  if (expressionArray.length === 1 || expressionArray.length % 2 === 0) {
    return; //do nothing
  }
  leftOperand = expressionArray[0];
  for (let i = 1; i < expressionArray.length; i += 2) {
    operator = expressionArray[i];
    rightOperand = expressionArray[i + 1];
    const regex = /[\+\-\*\/]/g;
    if (
      isNaN(rightOperand) ||
      !operator.match(regex) ||
      (operator === "/" && rightOperand == 0)
    ) {
      resetExpression();
      displayErrorMessage();
      return;
    }
    leftOperand = operate(operator, leftOperand, rightOperand);
  }
  expressionStr = `${leftOperand}`;
  updateDisplay(expressionStr);
});

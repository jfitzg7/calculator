function add(a, b) {
  return a + b;
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

function operate(operator, operand1, operand2) {
  if (operator === "+") return add(operand1, operand2);
  else if (operator === "-") return subtract(operand1, operand2);
  else if (operator === "*") return multiply(operand1, operand2);
  else if (operator === "/") return divide(operand1, operand2);
}

const display = document.querySelector("#calculator-display");

function updateDisplay() {
  display.textContent = expressionStr;
}

let expressionStr = "0";
let currentOperand = "0";

function resetExpressionStr() {
  expressionStr = "0";
  currentOperand = "0";
}

// Operator mode is set to true when an operator has been selected,
// and then set to false when a number is selected or the clear button is pressed.
let operatorMode = false;

const clearBtn = document.querySelector("#pad-clear");
clearBtn.addEventListener("click", () => {
  operatorMode = false;
  resetExpressionStr();
  updateDisplay();
});

const operandButtons = document.querySelectorAll(".operand-button");
operandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentOperand === "0") {
      currentOperand = `${button.textContent}`;
      expressionStr = `${expressionStr.slice(0, -1)}${button.textContent}`;
      currentOperand = `${button.textContent}`;
      updateDisplay();
    } else if (!operatorMode) {
      currentOperand = `${currentOperand}${button.textContent}`;
      expressionStr = `${expressionStr}${button.textContent}`;
      updateDisplay();
    } else if (operatorMode) {
      currentOperand = `${currentOperand}${button.textContent}`;
      expressionStr = `${expressionStr} ${button.textContent}`;
      operatorMode = false;
      updateDisplay();
    }
  });
});

const operatorButtons = document.querySelectorAll(".operator-button");
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (operatorMode) {
      expressionStr = `${expressionStr.slice(0, -1)}${button.textContent}`;
      updateDisplay();
    } else if (!operatorMode) {
      expressionStr = `${expressionStr} ${button.textContent}`;
      currentOperand = "";
      operatorMode = true;
      updateDisplay();
    }
  });
});

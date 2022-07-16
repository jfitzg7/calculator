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

let expressionArray = ["0"];

function displayExpression() {
  updateDisplay(expressionArray.join(" "));
}

function resetExpressionArray(initialValue) {
  expressionArray = [initialValue];
}

const clearBtn = document.querySelector("#pad-clear");
clearBtn.addEventListener("click", () => {
  resetExpressionArray("0");
  displayExpression();
});

const operandButtons = document.querySelectorAll(".operand-button");
operandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (expressionArray.length % 2 == 0 && expressionArray.length > 0) {
      expressionArray.push(`${button.textContent}`);
    } else {
      currentOperand = expressionArray[expressionArray.length - 1];
      if (currentOperand === "0") {
        expressionArray[expressionArray.length - 1] = `${button.textContent}`;
      } else {
        expressionArray[
          expressionArray.length - 1
        ] = `${currentOperand}${button.textContent}`;
      }
    }
    displayExpression();
  });
});

const operatorButtons = document.querySelectorAll(".operator-button");
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (expressionArray.length < 1) {
      return; // do nothing
    }
    if (expressionArray.length % 2 == 0) {
      expressionArray[expressionArray.length - 1] = `${button.textContent}`;
    } else {
      expressionArray.push(`${button.textContent}`);
    }
    displayExpression();
  });
});

const equalsBtn = document.querySelector("#pad-equals");
equalsBtn.addEventListener("click", () => {
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
      resetExpressionArray("0");
      displayErrorMessage();
      return;
    }
    leftOperand = `${operate(operator, leftOperand, rightOperand)}`;
  }
  resetExpressionArray(leftOperand);
  displayExpression();
});

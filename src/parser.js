import { tokenize } from "./token.js";

export { evaluateExpression };

const precedence = {
  "^": "4",
  "*": "3",
  "/": "3",
  "+": "2",
  "-": "2",
}

const associativity = {
  "^": "Right",
  "*": "Left",
  "/": "Left",
  "+": "Left",
  "-": "Left",
}

const parse = (str) => {
  let tokens = tokenize(str);

  let queue = [];
  let stack = [];

  // Helper function to return last object or false
  let peek = (array) => {
    if (array.length) {
      return array[array.length - 1];
    } else {
      return false;
    }
  }

  // Iterate through all tokens and convert to RPN using shunting yard algorithm
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    switch (token.type) {
      case "Literal":
        queue.push(token);
        break;
      case "Function":
      case "Open Paranthesis":
        stack.push(token);
        break;
      case "Operator":
        while (peek(stack).type === "Operator" && precedence[peek(stack).value] > precedence[token.value] || precedence[peek(stack).value] === precedence[token.value] && associativity[token.value] === "Left") {
          queue.push(stack.pop());
        }
        stack.push(token);
        break;
      case "Close Paranthesis":
        while (peek(stack).type !== "Open Paranthesis") {
          if (stack.length) {
            queue.push(stack.pop());
          } else {
            console.error("mismatched paranthesis");
          }
        }
        if (peek(stack).type !== "Open Paranthesis") {
          console.error("mismatched paranthesis");
          break;
        }
        stack.pop();
        if (peek(stack).type === "Function") {
          queue.push(stack.pop());
        }
        break;
      default:
        console.error("not valid input");
        break;
    }
  }

  // Push remaining operators onto queue
  while (stack.length) {
    if (peek(stack).type !== "Open Paranthesis") {
      queue.push(stack.pop());
    } else {
      console.error("mismatched paranthesis");
    }
  }

  return queue;
}

const evaluateExpression = (str) => {
  let expression = parse(str);

  let stack = [];

  // Iterate through the expression when we encounter any
  // operator pop last two literals of stack and push result
  for (let i = 0; i < expression.length; i++) {
    const element = expression[i];

    switch (element.type) {
      case "Literal":
        stack.push(element.value);
        break;
      case "Operator":
        let a = Number(stack.pop());
        let b = Number(stack.pop());

        switch (element.value) {
          case "+":
            stack.push(b + a);
            break;
          case "-":
            stack.push(b - a);
            break;
          case "/":
            stack.push(b / a);
            break;
          case "*":
            stack.push(b * a);
            break;
          case "^":
            stack.push(b ** a);
            break;
          default:
            console.error("unknown operator");
            break;
        }
        break;
      case "Function":
        let x = Number(stack.pop());

        switch (element.value) {
          case "sin":
            stack.push(Math.sin(x));
            break;
          case "cos":
            stack.push(Math.cos(x));
            break;
          case "tan":
            stack.push(Math.tan(x));
            break;
          case "sqrt":
            stack.push(Math.sqrt(x));
            break;
          default:
            break;
        }
        break;
      default:
        console.error("type not found");
        break;
    }
  }

  return stack.pop();
}

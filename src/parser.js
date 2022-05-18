import { tokenize } from "./token.js";

export { parse };

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

  // Convert objects to values
  let result = [];
  for (let i = 0; i < queue.length; i++) {
    result.push(queue[i].value);
  }

  return result.toString();
}

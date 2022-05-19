export { tokenize };

function Token(type, value) {
  this.type = type;
  this.value = value;
}

const tokenize = (str) => {
  let result = [];
  // Remove spaces and convert to stream of chars
  str.replace(/\s+/g);
  str = str.split("");

  // Buffers for keeping track of multiple digits
  let numberBuffer = [];
  let letterBuffer = [];

  // Add corresponding token per character
  str.forEach((char, idx) => {
    if (isDigit(char)) {
      if (letterBuffer.length) {
        result.push(new Token("Function", letterBuffer.join("")));
        letterBuffer = [];
      }
      numberBuffer.push(char);
    } else if (isLetter(char)) {
      if (numberBuffer.length) {
        result.push(new Token("Literal", numberBuffer.join("")));
        result.push(new Token("Operator", "*"));
        numberBuffer = [];
      }
      letterBuffer.push(char);
    } else if (isOperator(char)) {
      if (numberBuffer.length) {
        result.push(new Token("Literal", numberBuffer.join("")));
        numberBuffer = [];
      }
      result.push(new Token("Operator", char));
    } else if (isLeftParanthesis(char)) {
      if (letterBuffer.length) {
        result.push(new Token("Function", letterBuffer.join("")));
        letterBuffer = [];
      }
      result.push(new Token("Open Paranthesis", char));
    } else if (isRightParanthesis(char)) {
      if (numberBuffer.length) {
        result.push(new Token("Literal", numberBuffer.join("")));
        numberBuffer = [];
      }
      result.push(new Token("Close Paranthesis", char));
    } else if (isDecimal(char)) {
      numberBuffer.push(char);
    }
  });

  // Push remaining numbers to end
  if (numberBuffer.length) {
    result.push(new Token("Literal", numberBuffer.join("")));
  }

  return result;
}

// Regex logic
const isDigit = (char) => {
  return /\d/.test(char);
}

const isLetter = (char) => {
  return /[a-z]/i.test(char);
}

const isOperator = (char) => {
  return /\+|-|\*|\/|\^/.test(char);
}

const isLeftParanthesis = (char) => {
  return char === "(";
}

const isRightParanthesis = (char) => {
  return char === ")";
}

const isDecimal = (char) => {
  return char === ".";
}

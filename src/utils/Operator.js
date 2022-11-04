export class Operator {
  static operators = [
    new Operator("-", 1, (x, y) => x - y),
    new Operator("+", 1, (x, y) => x + y),
    new Operator("*", 2, (x, y) => x * y),
    new Operator("/", 2, (x, y) => x / y),
    new Operator("(", 0),
    new Operator(")", 0),
  ];

  constructor(char, priority, action) {
    this.char = char;
    this.priority = priority;
    this.action = action;
  }

  toString() {
    return this.char;
  }

  static findOperator = (char) => {
    for (let i = 0; i < this.operators.length; i++)
      if (this.operators[i].char === char) return this.operators[i];
  };

  static isOperator = (char) =>
    this.operators.some((operator) => (operator.char === char ? true : false));
}
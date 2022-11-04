import { Operator, commandCases } from ".";

export class Calculator {
  constructor() {
    this.value = 0;
    this.operationsHistory = [];
    this.expHistory = [];
  }

  calculateRPN(output_stack) {
    try {
      if (!output_stack) return;

      const calculation_stack = [];

      output_stack.map((el) => {
        if (el instanceof Operator) {
          const [y, x] = [calculation_stack.pop(), calculation_stack.pop()];

          this.value = x;
          this.executeCommand(commandCases[el.char](y));

          return calculation_stack.push(el.action(x, y));
        }

        return calculation_stack.push(el);
      });

      return calculation_stack.pop();
    } catch (e) {
      console.log(e);
      return "INCORRECT INPUT";
    }
  }

  pushExpressionToHistory(exp) {
    this.expHistory.push(exp);
    return this.expHistory;
  }

  executeCommand(command) {
    this.value = command.execute(this.value);
    this.operationsHistory.push(command);
  }

  undoCommand() {
    if (this.operationsHistory.length >= 1) {
      const command = this.operationsHistory.pop();
      this.value = command.undo();
    } else {
      this.value = 0;
    }
  }

  clearAll() {
    this.value = 0;
    this.expHistory = [];
    this.operationsHistory = [];
  }

  clear() {
    this.value = 0;
  }
}

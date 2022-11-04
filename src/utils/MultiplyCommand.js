export class MultiplyCommand {
  constructor(valueToMultiply) {
    this.valueToMultiply = valueToMultiply;
  }

  execute(currentValue) {
    this.prevValue = currentValue;
    return this.currentValue = currentValue * this.valueToMultiply;
  }

  undo() {
    return this.prevValue;
  }
}

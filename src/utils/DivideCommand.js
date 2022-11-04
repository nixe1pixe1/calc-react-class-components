export class DivideCommand {
  constructor(valueToDivide) {
    this.valueToDivide = valueToDivide
  }

  execute(currentValue) {
    this.prevValue = currentValue;
    return this.currentValue = currentValue / this.valueToDivide
  }

  undo() {
    return this.prevValue;
  }
}
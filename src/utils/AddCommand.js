export class AddCommand {
  constructor(valueToAdd) {
    this.valueToAdd = valueToAdd
  }

  execute(currentValue) {
    this.prevValue = currentValue;
    return this.currentValue = currentValue + this.valueToAdd
  }

  undo() {
    return this.prevValue;
  }
}
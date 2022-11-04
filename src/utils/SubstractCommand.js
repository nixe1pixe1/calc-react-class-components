export class SubstractCommand {
  constructor(valueToSubstract) {
    this.valueToSubstract = valueToSubstract
  }

  execute(currentValue) {
    this.prevValue = currentValue;
    return this.currentValue = currentValue - this.valueToSubstract
  }

  undo() {
    return this.prevValue;
  }
}
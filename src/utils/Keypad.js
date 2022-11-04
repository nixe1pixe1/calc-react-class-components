import { Operator } from ".";
import { CALC_ACTIONS } from "../constants/calc-actions";

export class Keypad {
  value = "";

  #validateInput = (action) => {
    const value = this.value.trim();
    const prevChar = this.#getPrevCharacter();
    const beforePrevCharacter = this.#getBeforePrevCharacter();
    const isOperator = Operator.isOperator(action);
    const isLastOperator = this.#isLastOperator();

    if (
      action === CALC_ACTIONS.C ||
      action === CALC_ACTIONS.CE ||
      action === CALC_ACTIONS.EQUAL
    ) {
      return {
        action: action,
      };
    }

    if (prevChar === "." && isOperator) return value;

    if (
      (value === "" || prevChar === CALC_ACTIONS.L_BRACKET) &&
      action === CALC_ACTIONS.SUBSTRACT
    )
      return (this.value = (value + ` 0 ${action}`).trim());

    if (value === "") {
      if (
        action === CALC_ACTIONS.L_BRACKET ||
        action === CALC_ACTIONS.R_BRACKET ||
        !isOperator
      )
        return (this.value = `${action}`);

      return value;
    }

    if (action === CALC_ACTIONS.DOT && prevChar.includes(CALC_ACTIONS.DOT))
      return value;

    if (isLastOperator) {
      if (
        (prevChar === CALC_ACTIONS.MULTIPLY ||
          prevChar === CALC_ACTIONS.DIVIDE) &&
        action === CALC_ACTIONS.SUBSTRACT
      )
        return (this.value = (value + ` ${action}`).trim());

      if (
        action === CALC_ACTIONS.L_BRACKET ||
        action === CALC_ACTIONS.R_BRACKET ||
        prevChar === CALC_ACTIONS.R_BRACKET
      )
        return (this.value = (value + ` ${action}`).trim());

      if (prevChar === CALC_ACTIONS.L_BRACKET) {
        if (!isOperator) return (this.value = (value + ` ${action}`).trim());

        return value;
      }

      if (isOperator) {
        if (
          (beforePrevCharacter === CALC_ACTIONS.MULTIPLY ||
            beforePrevCharacter === CALC_ACTIONS.DIVIDE) &&
          action !== CALC_ACTIONS.SUBSTRACT
        )
          return (this.value = value.slice(0, value.length - 2).trim());

        return (this.value = (
          value.slice(0, value.length - 2) + ` ${action}`
        ).trim());
      }

      if (!isOperator) {
        if (
          beforePrevCharacter === CALC_ACTIONS.MULTIPLY ||
          beforePrevCharacter === CALC_ACTIONS.DIVIDE
        )
          return (this.value = (value + `${action}`).trim());

        return (this.value = (value + ` ${action}`).trim());
      }
    }

    if (!isLastOperator) {
      if (isOperator) return (this.value = (value + ` ${action}`).trim());

      return (this.value = (value + `${action}`).trim());
    }

    return this.value;
  };

  executeAction = (action) => this.#validateInput(action);

  #getArray = () => this.value.split(" ");

  #getPrevCharacter = () => this.#getArray().pop();

  #getBeforePrevCharacter = () => {
    const arr = this.#getArray();
    return arr[arr.length - 2];
  };

  #isLastOperator = () => Operator.isOperator(this.#getPrevCharacter());

  clear = () => (this.value = "");
}

import { Operator } from ".";
import { CALC_ACTIONS } from "../constants/calc-actions";

export class ReversePolishNotation {
  #operation_stack = [];
  #output_stack = [];
  #input = "";

  constructor(input) {
    this.#input = input;
  }

  #clearStacks = () => {
    this.#operation_stack = [];
    this.#output_stack = [];
  };

  getResult = (input) => {
    try {
      if (!input && !this.#input) throw new Error("Input string is Empty");

      this.#clearStacks();

      const input_array = input ? input.split(" ") : this.#input.split(" ");

      if (input_array.length < 3) throw new Error("Input string has no expressions")

      input_array.map((el, index) => {
        if (!isNaN(el)) return this.#output_stack.push(Number(el));

        if (isNaN(el)) {
          const current_operator = Operator.findOperator(el);

          if (
            this.#operation_stack.length === 0 &&
            index < input_array.length - 1
          )
            return this.#operation_stack.push(current_operator);

          if (current_operator.char === CALC_ACTIONS.L_BRACKET)
            return this.#operation_stack.push(current_operator);

          if (current_operator.char === CALC_ACTIONS.R_BRACKET) {
            for (let i = this.#operation_stack.length - 1; i >= 0; i--) {
              if (this.#operation_stack[i].char === CALC_ACTIONS.L_BRACKET)
                return this.#operation_stack.length--;
              this.#output_stack.push(this.#operation_stack[i]);
              this.#operation_stack.length--;
            }
            return 0;
          }

          if (
            current_operator.priority ===
            this.#operation_stack[this.#operation_stack.length - 1].priority
          ) {
            this.#output_stack.push(this.#operation_stack.pop());
            return this.#operation_stack.push(current_operator);
          }

          if (
            current_operator.priority >
            this.#operation_stack[this.#operation_stack.length - 1].priority
          )
            this.#operation_stack.push(current_operator);
          else {
            for (let i = this.#operation_stack.length - 1; i >= 0; i--) {
              if (this.#operation_stack[i].char !== CALC_ACTIONS.L_BRACKET) {
                this.#output_stack.push(this.#operation_stack[i]);
                this.#operation_stack.length--;
              } else break;
            }

            this.#operation_stack.push(current_operator);
          }
        }

        return 0;
      });

      if (this.#operation_stack.length > 0) {
        for (let i = this.#operation_stack.length - 1; i >= 0; i--)
          this.#output_stack.push(this.#operation_stack[i]);
      }

      return this.#output_stack;
    } catch (e) {
      return {
        text: "INCORRECT INPUT",
        err: e.message
      }
    }
  };
}
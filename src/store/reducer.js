import { ACTIONS } from "../constants/actions";
import { Calculator, Keypad, ReversePolishNotation } from "../utils";

const defaultState = {
  theme: "Light",
  display: "",
  history: [],
  calculator: new Calculator(),
  rpn: new ReversePolishNotation(),
  keypad: new Keypad(),
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.DISPLAY:
      state.keypad.value = action.payload.toString();
      return { ...state, display: action.payload };
    case ACTIONS.THEME:
      document.body.setAttribute("theme", action.payload);
      return { ...state, theme: action.payload };
    case ACTIONS.HISTORY:
      return { ...state, history: action.payload };
    case ACTIONS.CALC:
      const result = state.calculator.calculateRPN(
        state.rpn.getResult(state.display)
      );

      const display = Math.abs(result % 1) > 0 ? result.toPrecision(4) : result;

      const history = (state.calculator.expHistory = [
        ...state.calculator.expHistory,
        {
          expression: state.display,
          value: display,
        },
      ]);

      state.keypad.value = display.toString();

      return {
        ...state,
        display: display,
        history: history,
      };
    case ACTIONS.CLEAR:
      state.calculator.clear();
      state.keypad.clear();
      return { ...state, display: "" };
    case ACTIONS.CLEAR_WITH_HISTORY:
      state.calculator.clearAll();
      state.keypad.clear();
      return { ...state, display: "", history: state.calculator.expHistory };
    case ACTIONS.UNDO:
      state.calculator.undoCommand();
      const calcValue = state.calculator.value.toString();
      state.keypad.value = calcValue;
      return { ...state, display: calcValue };
    default:
      return state;
  }
};

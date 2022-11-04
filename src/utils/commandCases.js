import {
  AddCommand,
  DivideCommand,
  SubstractCommand,
  MultiplyCommand,
} from ".";

export const commandCases = {
  "+": (val) => new AddCommand(val),
  "-": (val) => new SubstractCommand(val),
  "*": (val) => new MultiplyCommand(val),
  "/": (val) => new DivideCommand(val),
};

export enum COLORS {
  RESET = 0,
  BLACK = 30,
  RED = 31,
  GREEN = 32,
  YELLOW = 33,
  BLUE = 34,
  MAGENTA = 35,
  CYAN = 36,
  WHITE = 37,
}

export const colorize = (text: string, color: COLORS) => {
  return `\x1b[1;${color}m ${text} \x1b[${COLORS.RESET}m`;
};

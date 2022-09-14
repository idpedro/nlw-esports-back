import { stdout } from "process";
import { colorize, COLORS } from "./utils/colorizer";

type LoggerLevel = "danger" | "warning" | "info" | "success" | "error";

type LoggerLevelColor = { [key in LoggerLevel]: COLORS };
const LoggerLevelColor: LoggerLevelColor = {
  danger: COLORS.RED,
  warning: COLORS.MAGENTA,
  info: COLORS.BLUE,
  success: COLORS.GREEN,
  error: COLORS.YELLOW,
};

const LoggerLevelEmoticon: { [key in LoggerLevel]: string } = {
  danger: "😱",
  warning: "🤔",
  info: "🖖",
  success: "😎",
  error: "🤕",
};

export interface Logger {
  danger: (message: any) => void;
  warning: (message: any) => void;
  info: (message: any) => void;
  success: (message: any) => void;
  error: (message: any) => void;
}

class LoggerImplementation implements Logger {
  private colorizeFn: (message: any, color: number) => string;
  constructor(colorize: (message: any, color: number) => string) {
    this.colorizeFn = colorize;
  }
  private prepareMessage(message: any): string {
    if (typeof message === "string") return message;
    if (typeof message === "object") return JSON.stringify(message, null, 2);

    return String(message);
  }
  private sendMessage(message: any, level: LoggerLevel) {
    console.log(
      this.colorizeFn(
        `[${LoggerLevelEmoticon[level]}]`,
        LoggerLevelColor[level]
      ),
      this.colorizeFn(this.prepareMessage(message), LoggerLevelColor[level])
    );
  }
  danger(message: any) {
    this.sendMessage(message, "danger");
  }
  warning(message: any) {
    this.sendMessage(message, "warning");
  }
  error(message: any) {
    this.sendMessage(message, "info");
  }
  info(message: any) {
    this.sendMessage(message, "info");
  }
  success(message: any) {
    this.sendMessage(message, "success");
  }
}

export default new LoggerImplementation(colorize);

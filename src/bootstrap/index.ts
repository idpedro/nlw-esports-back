import Logger from "./../logger/index";
import { ServerBuilder } from "./../builders/server-builder";
import express, { Router } from "express";
import logger from "../logger";
import { mainRouter } from "../router";

const ServerContants = {
  HOST: "localhost",
  PORT: 3333,
};

async function handlerShuntdown(callback: () => Promise<void>) {
  process.on("SIGINT", async (code: number) => {
    await callback();
    Logger.info(`👋`);
    process.exit(code);
  });

  if (process.env.NODE_ENV === "production")
    process.on("SIGKILL", async (code: number) => {
      await callback();
      Logger.info(`👋`);
      process.exit(code);
    });
}

export function bootstrap() {
  const app = new ServerBuilder(express, logger);

  app
    .createServer()
    .addRoute("/", mainRouter)
    .config()
    .start(ServerContants.HOST, ServerContants.PORT);
  handlerShuntdown(app.stop.bind(app));
}

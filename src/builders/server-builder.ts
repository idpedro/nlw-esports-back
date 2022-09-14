import express, { Router } from "express";
import { Server } from "http";
import logger, { Logger } from "../logger";

export class ServerBuilder {
  private app?: express.Express;
  private httpServerFactory: () => express.Express;
  private logger: Logger;
  private httpServer?: Server;
  constructor(express: () => express.Express, logger: Logger) {
    this.httpServerFactory = express;
    this.logger = logger;
  }
  createServer() {
    if (!this.httpServerFactory)
      throw Error(
        "Não foi possivel criar o servidor HTTP, a factory não é valida "
      );
    this.app = this.httpServerFactory();
    return this;
  }
  addRoute(endpoint: string, route: Router) {
    if (!this.app) throw Error(" o Servidor HTTP não foi iniciado");
    this.app.use(endpoint, route);
    return this;
  }
  config() {
    if (!this.app) throw Error(" o Servidor HTTP não foi iniciado");
    this.app.use(express.json());
    return this;
  }
  start(host: string, port: number) {
    if (!this.app) throw Error(" o Servidor HTTP não foi iniciado");
    this.httpServer = this.app.listen(port, host, () => {
      this.logger.info("👢 server started 🕺");
    });
  }
  private async stopHttpServer() {
    return new Promise((resolver) => {
      if (!this.httpServer) return;
      this.httpServer.close(() => {
        logger.info("😵 HTTP Server as stoped 😵");
        return resolver(true);
      });

      return resolver(true);
    });
  }
  async stop() {
    logger.warning("Shutdown App");
    await this.stopHttpServer();
  }
}

import { logger } from './common/Logging';
import { DEBUG_PORT, ExpressConfig, PORT } from './config';

export class Application {
  public server: any;
  public express: ExpressConfig;

  constructor() {
    this.express = new ExpressConfig();

    this.server = this.express.app.listen(PORT, () => {
      logger.info(`
      --------------------------------------------------
       Server Started! Express: http://localhost:${PORT}
       Health : http://localhost:${PORT}/ping
       Debugger: http:/${this.server.address().address}:${PORT}/?ws=${
        this.server.address().address
      }:${PORT}&port=${DEBUG_PORT}
      ------------------------------------------------------
      `);
    });

    process.on('unhandledRejection', (reason, p) => {
      logger.warn('system level exceptions at, Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
    });
  }
}

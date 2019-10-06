import * as config from 'config';

import { ExpressConfig } from './Express';

// import { logger } from '../common/Logging';
export class Application {
  server: any;
  express: ExpressConfig;

  constructor() {
    this.express = new ExpressConfig();

    const port = config.get("express.port");
    const debugPort = config.get("express.debug");

    this.server = this.express.app.listen(port, () => {
      // logger.info(`
      // --------------------------------------------------
      //  Server Started! Express: http://localhost:${port}
      //  Health : http://localhost:${port}/ping
      //  Debugger: http:/${this.server.address()}:${port}/?ws=${this.server.address()}:${port}&port=${debugPort}
      // ------------------------------------------------------
      // `);
    });
  }
}

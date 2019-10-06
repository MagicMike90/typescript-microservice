import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import health from 'express-ping';
import helmet from 'helmet';
import path from 'path';
import { useContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';

export class ExpressConfig {
  public app: express.Express;
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(health.ping());
    this.app.use(helmet());
    this.app.use(this.clientErrorHandler);
    this.setUpControllers();
  }

  public setUpControllers() {
    const controllersPath = path.resolve('dist', 'controllers');
    useContainer(Container);
    useExpressServer(this.app, {
      controllers: [controllersPath + '/*.js'],
      cors: true,
    });
  }

  public clientErrorHandler(err: any, req: Request, res: Response, next: Function): void {
    if (err.hasOwnProperty('thrown')) {
      res.status(err['status']).send({ error: err.message });
    }
  }
}

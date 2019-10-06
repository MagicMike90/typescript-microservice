import { Controller, Get } from 'routing-controllers';

@Controller("/hello-world")
export class HelloWorld {
  constructor() {}
  @Get("/")
  public async get(): Promise<any> {
    return { msg: "This is first Typescript Microservice" };
  }
}

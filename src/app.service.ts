import { Injectable } from "@nestjs/common";

import { Result } from "./app.controller";

@Injectable()
export class AppService {
  getHello(): Result {
    return {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote: "Jestem czajnikiem",
    };
  }
}

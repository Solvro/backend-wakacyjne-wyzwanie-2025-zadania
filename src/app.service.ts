import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello() {
    return {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote: "hominem te esse memento",
    };
  }
}

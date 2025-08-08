import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello() {
    const message = {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote: "ale z was sigiemki za takie kursy za free, dzieki",
    };
    return message;
  }
}

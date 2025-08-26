import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello() {
    const message = {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote: "Złota myśl.",
    };
    return message;
  }
}

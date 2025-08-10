import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello() {
    const message = {
      title: "Wakacyjne wyzwanie Solvro!!!",
      quote: "Moja złota myśl",
    };
    return message;
  }
}

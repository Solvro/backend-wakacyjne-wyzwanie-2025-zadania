import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello() {
    const message = {
      title: "Wakacyjne wyzwanie Solvro!!!",
      quote:
        "Pingwiny nie boją się ludzi, bo myślą, że ludzie są tylko dużymi pingwinami.",
    };
    return message;
  }
}

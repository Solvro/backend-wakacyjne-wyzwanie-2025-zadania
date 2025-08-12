import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello() {
    const message = {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote: '"Almost Christmas" means it wasn\'t Christmas!',
    };
    return message;
  }
}

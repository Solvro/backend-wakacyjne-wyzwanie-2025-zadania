import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello() {
    return {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote: "https://tinyurl.com/2c6dyhmr",
    };
  }
}

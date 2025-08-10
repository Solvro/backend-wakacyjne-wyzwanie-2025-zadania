import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello() {
    return {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote: "Kiedy wszyscy inni odejdą, zostanę tylko ja i mój kod.",
    };
  }
}

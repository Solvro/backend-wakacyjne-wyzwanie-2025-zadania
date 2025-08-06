import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello() {
    const hello_message = {
      title: "Wakacyjne wyzwanie Solvro!!!",
      quote: "Lepiej za dużo niż za mało",
    };
    return hello_message;
  }
}

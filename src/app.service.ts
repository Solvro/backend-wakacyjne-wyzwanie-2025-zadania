import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return JSON.stringify({
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote: "Jest tanio? Jest tanio! Jest dobrze? Jest tanio!",
    });
  }
}

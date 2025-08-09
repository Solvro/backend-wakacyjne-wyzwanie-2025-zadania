import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): any {
    return {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote: "Dziwne, u mnie działa ;)",
    };
  }
}

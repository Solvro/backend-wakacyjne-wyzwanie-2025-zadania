import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): { title: string; quote: string } {
    return {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote:
        "Bądź kim jesteś, a nie kim nie jesteś, bo kiedy nie jesteś tym, kim jesteś, stajesz się tym... kim nie jesteś.",
    };
  }
}

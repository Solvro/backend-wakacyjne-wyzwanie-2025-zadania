import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): { message: { title: string; quote: string } } {
    return {
      message: {
        title: "Wakacyjne Wyzwanie Solvro!!!",
        quote: "Many! Skasowałem windowsa!",
      },
    };
  }
}

import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  Task1(): object {
    return {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote: "Ten co ZSE skończył w cyrku się nie śmieje...",
    };
  }
}

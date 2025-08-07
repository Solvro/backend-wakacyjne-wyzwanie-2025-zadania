import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    const response = {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote: "Co zrobić z tą białą kulką po wypiciu całej mozzarelli??",
    };
    return JSON.stringify(response);
  }
}

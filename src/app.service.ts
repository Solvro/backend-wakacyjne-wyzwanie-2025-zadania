import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello() {
    return {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote:
        "Why do frontend developers eat lunch alone? Because they don't know how to join tables",
    };
  }
}

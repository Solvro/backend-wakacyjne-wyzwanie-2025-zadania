import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): object {
    return {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote: "To mały krok dla człowieka, ale dla karła - normalny",
    };
  }
}

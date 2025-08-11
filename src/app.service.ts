import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): object {
    return {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote: "Unikanie wyzwań sprawia, że stoimy w miejscu",
    };
  }
}

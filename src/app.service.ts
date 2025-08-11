import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): object {
    return {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote:
        "Unikwanie wyzwań sprawia, że stoimy w miejscu. Chyba, że chodzi o walkę z Solvro Configiem",
    };
  }
}

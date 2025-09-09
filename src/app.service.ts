import { Injectable } from "@nestjs/common";

export interface HelloResponse {
  title: string;
  quote: string;
}

@Injectable()
export class AppService {
  getHello(): HelloResponse {
    const response = {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote: "Wakacje to dobra okazja na rozwój",
    };
    return response;
  }
}

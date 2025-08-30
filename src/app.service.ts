import { Injectable } from "@nestjs/common";

export interface ResponseIntrf {
  title: string;
  quote: string;
}

@Injectable()
export class AppService {
  getHello(): ResponseIntrf {
    const response = {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote: "Wakacje to dobra okazja na rozwój",
    };
    return response;
  }
}

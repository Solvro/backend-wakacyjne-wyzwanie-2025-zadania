import { Injectable } from "@nestjs/common";

import { JsonRequest } from "./interfaces/json-request.interface";

const jsonRequest: JsonRequest = {
  title: "Wakacyjne Wyzwanie Solvro!!!",
  quote: "Jakaś twoja złota myśl - liczę na kreatywność",
};

@Injectable()
export class AppService {
  getHello(): JsonRequest {
    return jsonRequest;
  }
}

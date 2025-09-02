import { Injectable } from "@nestjs/common";

import { JsonRequest } from "./interfaces/json-request.interface";

const jsonRequest: JsonRequest = {
  title: "Wakacyjne Wyzwanie Solvro!!!",
  quote: "Ludzie z natury są mało kreatywni",
};

@Injectable()
export class AppService {
  getHello(): JsonRequest {
    return jsonRequest;
  }
}

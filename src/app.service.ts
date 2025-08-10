import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): JSON {
    const returnValue: unknown = {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote:
        "Mieszany dla najsptyrtniejszych zawodników, bo są trzy w cenie jegnego",
    };
    return JSON.stringify(returnValue) as unknown as JSON;
  }
}

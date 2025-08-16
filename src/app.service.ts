import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello() {
    const returnValue = {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote:
        "Mieszany dla najsptyrtniejszych zawodników, bo są trzy w cenie jegnego",
    };
    return returnValue;
  }
}

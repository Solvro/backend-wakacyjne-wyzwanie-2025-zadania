import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): Record<string, string> {
    return {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote:
        "This is like, the thing, you know the thing that thing thing, no, not this thing, that thing, yeah that, that exact thing, that thingy thing that things the thing.",
    };
  }
}

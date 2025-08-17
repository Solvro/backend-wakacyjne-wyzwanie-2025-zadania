import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello() {
    //return "Hello World!";
    const object = {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote:
        "The Egyptians believed the most significant thing to do in your life was to die",
    };
    return object;
  }
}

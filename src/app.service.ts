import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello() {
    const message = {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote:
        "W tym kraju nie ma pracy dla ludzi z moim wykształceniem - Ferdynand Kiepski/ja po informatyce stosowanej",
    };
    return message;
  }
}

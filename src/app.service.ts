import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): JSON {
    const title: any = {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote:
        "There is a rumour going around that I have found God. I think this is unlikely because I have enough difficulty finding my keys, and there is empirical evidence that they exist. - Sir Terry Pratchett",
    };
    return title;
  }
}

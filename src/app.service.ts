import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): { title: string; quote: string } {
    const message = {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote:
        "francesinha (tost kiełbasa kotlet boczek parówki jakieś smażone mięso ser tost jajko sadzone - frytki i wszystko ratuje tłusty sos) :)",
    };
    return message;
  }
}

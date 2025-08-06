import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): {
    title: string;
    quote: string;
    author: string;
    randomanimalfact: string;
  } {
    return {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote:
        "Znowu drugi. Całe życie ciągle drugi. Nawet jak gdzieś pierwszy byłem, czułem się jak drugi, kurwa. W życiu wiecznym także drugi? Ciągle we wszystkim byłem drugi. Na 1500 drugi, z polskiego drugi, w nogę drugi, z zielnika drugi...",
      randomanimalfact: "Wieloryby śpią pionowo",
      author: "Marcin Lutnia",
    };
  }
}

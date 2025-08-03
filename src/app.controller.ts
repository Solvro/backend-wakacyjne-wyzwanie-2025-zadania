import { Controller, Get, HttpCode } from "@nestjs/common";

import { AppService } from "./app.service";

@Controller("wakacyjne")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("backend")
  @HttpCode(418)
  getHello(): { title: string; quote: string; author: string } {
    return {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote:
        "Moja złota myśl to robic pierwsze co ci przyjdzie na myśl, a nie myśleć o złotej myśli przez parę godzin. Płatki z mlekiem to też zupa hotdog to kanapka. Thank you for listening to my Ted Talk.",
      author: "Marcin Lutnia",
    };
  }
}

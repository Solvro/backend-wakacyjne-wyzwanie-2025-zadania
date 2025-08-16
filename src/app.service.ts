import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): { title: string; quote: string } {
    return {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote: "Gdzie kucharek sześć, tam nie ma co jeść",
    };
  }
}

import { Injectable } from "@nestjs/common";

export type HelloResponseDTO = {
  title: string;
  quote: string;
};

@Injectable()
export class AppService {
  getHello(): HelloResponseDTO {
    return {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote: "Dziwne, u mnie działa ;)",
    };
  }
}

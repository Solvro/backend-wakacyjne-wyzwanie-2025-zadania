import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getBackend(): { title: string; quote: string; } {
    return {
      title: "Wakacyjne Wyzwanie Solvro!!!",
      quote: "Śruba się kręci.",
    };
  }
}
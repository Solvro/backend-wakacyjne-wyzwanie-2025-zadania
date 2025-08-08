import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { title: string; quote: string } {
    return {
      title: 'Wakacyjne Wyzwanie Solvro!!!',
      quote: 'Jakaś twoja złota myśl - liczę na kreatywność',
    };
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  

  getHello(): {title: string, quote: string} {
    const message = {
      title : "Wakacyjne Wyzwanie Solvro!!!",
      quote : "Pewnego dnia twoje kolana ugną się pod ciężarem twoich nieskończonych grzechów"
    } 
    return message;
  }
}
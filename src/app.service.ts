import { Injectable } from '@nestjs/common';
import { json } from 'stream/consumers';

@Injectable()
export class AppService {
  getHello(): JSON {
    
    const ret: any = {
    title : 'Wakacyjne Wyzwanie Solvro!!!',
    quote : 'Mieszany dla najsptyrtniejszych zawodników, bo są trzy w cenie jegnego'
    };
    return ret;
  }
}

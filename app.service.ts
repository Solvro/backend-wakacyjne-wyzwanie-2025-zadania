import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): JSON {
  	      var title: any = {
    "title" : "Wakacyjne Wyzwanie Solvro!!!",
    "quote" : "Nothing is eternal, except death and taxes"
    	      	     	   	 } 
return title;
  }
}

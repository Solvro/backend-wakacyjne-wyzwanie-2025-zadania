import { AppService } from './service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getBackend(): {
        title: string;
        quote: string;
    };
}

import { Module } from "@nestjs/common";

import { ScrapperService } from "./scrapper.service";

@Module({
  providers: [ScrapperService],
  exports: [ScrapperService],
})
export class ScrapperModule {}

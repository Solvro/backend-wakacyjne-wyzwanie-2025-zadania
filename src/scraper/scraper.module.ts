import { DatabaseModule } from "src/database/database.module";

import { Module } from "@nestjs/common";

import { ScraperController } from "./scraper.controller";
import { ScraperService } from "./scraper.service";

@Module({
  controllers: [ScraperController],
  providers: [ScraperService],
  imports: [DatabaseModule],
})
export class ScraperModule {}

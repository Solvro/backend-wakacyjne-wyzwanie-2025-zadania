import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseController } from './database/database.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, DatabaseController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}

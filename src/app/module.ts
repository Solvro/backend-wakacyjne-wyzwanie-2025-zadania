import { Module } from '@nestjs/common';
import { AppController } from './controller';
import { AppService } from './service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}

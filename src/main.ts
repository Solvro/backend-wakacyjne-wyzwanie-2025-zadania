import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppModule } from './app/module';

@Module({
  imports: [AppModule],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class MainModule {}

async function main() {
  const app = await NestFactory.create(MainModule);
  await app.listen(process.env.PORT ?? 80);
}

main();

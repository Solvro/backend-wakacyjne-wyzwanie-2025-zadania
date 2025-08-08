import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('assignment #1')
    .setDescription('assignment #1 api')
    .setVersion('1.0')
    .addTag('solvro')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger',app, documentFactory)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Vali for DITTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
    }),
  );

  //Swagger
  const config = new DocumentBuilder()
    .setTitle("Budget API")
    .setDescription("Trips / Participants / Expenses")
    .setVersion("1.0")
    .addTag("participants")
    .addTag("expenses")
    .addTag("trips")
    .build();

  const document_swagger = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document_swagger);

  await app.listen(3000);
}
bootstrap();

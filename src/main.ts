import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("Wakacyjne Wyzwanie 2025")
    .setDescription("API do budżetownika")
    .setVersion("1.0")
    .addTag("trip", "Zarządzanie wycieczkami")
    .addTag("participant", "Zarządzanie uczestnikami")
    .addTag("expense", "Zarządzanie wydatkami")
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      "access-token",
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

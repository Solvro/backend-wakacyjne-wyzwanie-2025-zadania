import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    origin: /^http:\/\/localhost:5[0-5][0-9][0-9]$/,
    preflightContinue: false,
  });

  const config = new DocumentBuilder()
    .setTitle("Wakacyjne API")
    .setDescription("Wakacyjne API description")
    .setVersion("1.0")
    .addTag("API")
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

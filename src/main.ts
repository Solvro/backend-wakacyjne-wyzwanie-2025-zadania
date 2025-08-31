import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle("Budżetownik")
    .setDescription("Aplikacja do zarządzania budżetem wakacyjnych wyjazdów")
    .setVersion("1")
    .addBearerAuth()
    .build();

  const document_ = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document_);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Wakacyjne Wyzwanie 2025")
    .setDescription("The Wakacyjne Wyzwanie 2025 API description")
    .setVersion("1.0")
    .addTag("wakacyjne-wyzwanie-2025")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { RequestMethod } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Wakacyjne wyzwanie")
    .setDescription("Budzetownik backend API documentation")
    .setVersion("1.0")
    .setOpenAPIVersion("3.1.1")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, documentFactory);

  app.setGlobalPrefix("api/v1/", {
    exclude: [
      {
        path: "/wakacyjne/backend",
        method: RequestMethod.GET,
      },
    ],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

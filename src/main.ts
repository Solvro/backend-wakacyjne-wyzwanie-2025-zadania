import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  app.enableCors({
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    origin: (
      origin: string | undefined,
      callback: (error: Error | null, allow?: boolean) => void,
    ) => {
      if (origin == null) {
        callback(null, true);
        return;
      }
      const localhostPattern = /^https?:\/\/localhost:(50\d{2}|5[1-5]\d{2})$/;
      if (localhostPattern.test(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"), false);
    },
    preflightContinue: false,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle("Wakacyjne API")
    .setDescription("Budżetownik API")
    .setVersion("1.0")
    .addTag("API")
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      "access-token",
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  await app.listen(process.env.PORT ?? 5001);
}
bootstrap();

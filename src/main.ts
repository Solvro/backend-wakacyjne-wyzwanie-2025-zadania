import { RequestMethod } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

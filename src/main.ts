import { configDotenv } from "dotenv";

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { CurrencyScraperService } from "./currency/currency-scraper.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const currencyScraper = app.get(CurrencyScraperService);

  configDotenv();

  const config = new DocumentBuilder()
    .setTitle("Wakacyjne API")
    .setDescription("Wakacyjne API description")
    .setVersion("1.0")
    .addTag("API")
    .addBearerAuth(
      {
        description: `Please enter token sign in returned`,
        name: "Authorization",
        bearerFormat: "Bearer",
        scheme: "Bearer",
        type: "http",
        in: "Header",
      },
      "access-token",
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  const validationOptions = {
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  };

  app.useGlobalPipes(new ValidationPipe(validationOptions));

  await currencyScraper.scrape();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

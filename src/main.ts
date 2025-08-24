import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle("Budżetownik API")
    .setDescription("API for managing trips, participants, and expenses")
    .setVersion("1.0")
    .addTag("trips", "Trip management endpoints")
    .addTag("participants", "Participant management endpoints")
    .addTag("expenses", "Expense management endpoints")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

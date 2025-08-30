import { ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/guards/auth.guard";
import { RolesGuard } from "./auth/guards/roles.guard";

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

  const reflector = app.get(Reflector);
  const authService = app.get(AuthService);

  // Apply AuthGuard globally
  app.useGlobalGuards(
    new AuthGuard(reflector, authService),
    new RolesGuard(reflector),
  );

  await app.listen(3000);
}
bootstrap();

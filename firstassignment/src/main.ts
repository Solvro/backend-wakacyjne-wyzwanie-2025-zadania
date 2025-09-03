import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe())
    app.enableCors({
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        origin: 'http://localhost:5500',
        preflightContinue: false,
    });
    const config = new DocumentBuilder()
        .setTitle("Wakacyjne API")
        .setDescription("Wakacyjne API description")
        .setVersion("1.0")
        .addTag("API")
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header', description: 'Wklej sam token (bez "Bearer ")' })
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("swagger", app, documentFactory);

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
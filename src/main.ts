import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error'],
    cors: true,
  });

  const options = new DocumentBuilder()
    .setTitle('MissionLobby API')
    .setDescription('API for MissionLobby')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/doc', app, document, {
    customSiteTitle: 'MissionLobby API',
  });

  await app.listen(3000);
  console.log('Server ready');
}
bootstrap();

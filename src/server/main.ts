import { NestApplication, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = Number(process.env.PORT ?? 3000)

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule, {
    forceCloseConnections: true,
  });

  await app.listen(PORT);
  console.log('Listening to Port: ', PORT)
}

bootstrap();
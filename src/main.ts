import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { I18nService } from 'nestjs-i18n';
import { I18nValidationPipe } from './common/i18n-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const i18nService = app.get<I18nService<Record<string, unknown>>>(I18nService);
  app.useGlobalPipes(new I18nValidationPipe(i18nService));

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER)
  app.useLogger(logger)

  app.enableCors({
    origin:[
      'https://www.jejakdualangkah.com',
      'https://jejakdualangkah.com',
      'http://localhost:3000'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })

  await app.listen(3000);
}
bootstrap();

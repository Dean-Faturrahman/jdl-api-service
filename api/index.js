const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');

let cachedNestApp;

async function bootstrap() {
  const expressApp = express();
  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  nestApp.enableCors({
    origin: [
      'https://www.jejakdualangkah.com',
      'https://jejakdualangkah.com',
      'http://localhost:3000'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await nestApp.init();
  return expressApp;
}

module.exports = async (req, res) => {
  if (!cachedNestApp) {
    cachedNestApp = await bootstrap();
  }
  cachedNestApp(req, res);
};
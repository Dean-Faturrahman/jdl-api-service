"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const nest_winston_1 = require("nest-winston");
const nestjs_i18n_1 = require("nestjs-i18n");
const i18n_validation_pipe_1 = require("./common/i18n-validation.pipe");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const i18nService = app.get(nestjs_i18n_1.I18nService);
    app.useGlobalPipes(new i18n_validation_pipe_1.I18nValidationPipe(i18nService));
    const logger = app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER);
    app.useLogger(logger);
    app.enableCors({
        origin: [
            'https://www.jejakdualangkah.com',
            'https://jejakdualangkah.com',
            'http://localhost:3000'
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
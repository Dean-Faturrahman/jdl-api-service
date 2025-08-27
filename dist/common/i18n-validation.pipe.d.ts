import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
export declare class I18nValidationPipe extends ValidationPipe {
    private readonly i18n;
    constructor(i18n: I18nService);
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
    private translateErrorMessages;
    private formatErrors;
}

import {
  Injectable,
  ArgumentMetadata,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { ValidationError } from 'class-validator';

@Injectable()
export class I18nValidationPipe extends ValidationPipe {
  constructor(private readonly i18n: I18nService) {
    super({
      exceptionFactory: (errors) => new BadRequestException(errors),
    });
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        const errors = e.getResponse() as any;

        for (const error of errors.message) {
          await this.translateErrorMessages(error);
        }

        const simplifiedErrors = this.formatErrors(errors.message);
        throw new BadRequestException(simplifiedErrors);
      }
      throw e;
    }
  }

  private async translateErrorMessages(error: ValidationError): Promise<void> {
    if (error.children?.length > 0) {
      for (const childError of error.children) {
        await this.translateErrorMessages(childError);
      }
      return;
    }

    if (error.constraints) {
      for (const key in error.constraints) {
        const translationKey = error.constraints[key];
        try {
          const propertyName = await this.i18n.translate(`validation.field.${error.property}`);
          error.constraints[key] = await this.i18n.translate(translationKey, {
            args: { property: propertyName || error.property },
          });
        } catch (err) {
          error.constraints[key] = translationKey;
        }
      }
    }
  }

  private formatErrors(errors: ValidationError[]) {
    if (errors.length === 0) {
      return 'Terjadi kesalahan validasi.';
    }

    let error = errors[0];

    while (error.children && error.children.length > 0) {
      error = error.children[0];
    }

    if (error.constraints) {
      return Object.values(error.constraints)[0];
    }

    return 'Something went wrong.';
  }
}
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
        const propertyName = await this.i18n.translate(`validation.field.${error.property}`);

        error.constraints[key] = await this.i18n.translate(translationKey, {
          args: { property: propertyName || error.property },
        });
      }
    }
  }

  private formatErrors(errors: ValidationError[]) {
    const result: Record<string, string> = {};

    const flatten = (errs: ValidationError[], parentPath = '') => {
      errs.forEach((err) => {
        const path = parentPath ? `${parentPath}.${err.property}` : err.property;

        if (err.children && err.children.length > 0) {
          flatten(err.children, path);
        } else if (err.constraints) {
          result[path] = Object.values(err.constraints)[0];
        }
      });
    };

    flatten(errors);
    return result;
  }
}
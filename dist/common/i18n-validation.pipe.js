"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
let I18nValidationPipe = class I18nValidationPipe extends common_1.ValidationPipe {
    constructor(i18n) {
        super({
            exceptionFactory: (errors) => new common_1.BadRequestException(errors),
        });
        this.i18n = i18n;
    }
    async transform(value, metadata) {
        try {
            return await super.transform(value, metadata);
        }
        catch (e) {
            if (e instanceof common_1.BadRequestException) {
                const errors = e.getResponse();
                for (const error of errors.message) {
                    await this.translateErrorMessages(error);
                }
                const simplifiedErrors = this.formatErrors(errors.message);
                throw new common_1.BadRequestException(simplifiedErrors);
            }
            throw e;
        }
    }
    async translateErrorMessages(error) {
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
                }
                catch (err) {
                    error.constraints[key] = translationKey;
                }
            }
        }
    }
    formatErrors(errors) {
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
};
exports.I18nValidationPipe = I18nValidationPipe;
exports.I18nValidationPipe = I18nValidationPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_i18n_1.I18nService])
], I18nValidationPipe);
//# sourceMappingURL=i18n-validation.pipe.js.map
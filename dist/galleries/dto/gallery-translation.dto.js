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
exports.GalleryTranslationDto = void 0;
const class_validator_1 = require("class-validator");
class GalleryTranslationDto {
}
exports.GalleryTranslationDto = GalleryTranslationDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'validation.isString' }),
    (0, class_validator_1.Length)(2, 5, { message: 'validation.language_code.length' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'validation.isNotEmpty' }),
    __metadata("design:type", String)
], GalleryTranslationDto.prototype, "language_code", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Description cannot be empty' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GalleryTranslationDto.prototype, "description", void 0);
//# sourceMappingURL=gallery-translation.dto.js.map
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
exports.StoryTranslationDto = void 0;
const class_validator_1 = require("class-validator");
class StoryTranslationDto {
}
exports.StoryTranslationDto = StoryTranslationDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'validation.isString' }),
    (0, class_validator_1.Length)(2, 5, { message: 'validation.language_code.length' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'validation.isNotEmpty' }),
    __metadata("design:type", String)
], StoryTranslationDto.prototype, "language_code", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Title cannot be empty' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StoryTranslationDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Content cannot be empty' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StoryTranslationDto.prototype, "content", void 0);
//# sourceMappingURL=story-translation.dto.js.map
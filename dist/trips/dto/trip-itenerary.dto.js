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
exports.CreateTripItineraryDto = void 0;
const class_validator_1 = require("@nestjs/class-validator");
const class_transformer_1 = require("class-transformer");
const trip_itenerary_translation_dto_1 = require("./trip-itenerary-translation.dto");
class CreateTripItineraryDto {
}
exports.CreateTripItineraryDto = CreateTripItineraryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTripItineraryDto.prototype, "time", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => trip_itenerary_translation_dto_1.CreateTripItineraryItemTranslationDto),
    __metadata("design:type", Array)
], CreateTripItineraryDto.prototype, "translations", void 0);
//# sourceMappingURL=trip-itenerary.dto.js.map
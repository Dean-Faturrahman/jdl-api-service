"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTestimonyDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_testimony_dto_1 = require("./create-testimony.dto");
class UpdateTestimonyDto extends (0, mapped_types_1.PartialType)(create_testimony_dto_1.CreateTestimonyDto) {
}
exports.UpdateTestimonyDto = UpdateTestimonyDto;
//# sourceMappingURL=update-testimony.dto.js.map
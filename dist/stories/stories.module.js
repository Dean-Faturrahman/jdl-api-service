"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoriesModule = void 0;
const common_1 = require("@nestjs/common");
const stories_service_1 = require("./admin/stories.service");
const stories_controller_1 = require("./admin/stories.controller");
const stories_controller_2 = require("./public/stories.controller");
const stories_service_2 = require("./public/stories.service");
let StoriesModule = class StoriesModule {
};
exports.StoriesModule = StoriesModule;
exports.StoriesModule = StoriesModule = __decorate([
    (0, common_1.Module)({
        controllers: [stories_controller_1.AdminStoriesController, stories_controller_2.StoriesController],
        providers: [stories_service_1.AdminStoriesService, stories_service_2.StoriesService],
    })
], StoriesModule);
//# sourceMappingURL=stories.module.js.map
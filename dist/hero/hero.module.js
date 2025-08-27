"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroModule = void 0;
const common_1 = require("@nestjs/common");
const hero_service_1 = require("./admin/hero.service");
const hero_controller_1 = require("./admin/hero.controller");
const hero_service_2 = require("./public/hero.service");
const hero_controller_2 = require("./public/hero.controller");
let HeroModule = class HeroModule {
};
exports.HeroModule = HeroModule;
exports.HeroModule = HeroModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            hero_controller_2.HeroController,
            hero_controller_1.AdminHeroController,
        ],
        providers: [
            hero_service_2.HeroService,
            hero_service_1.AdminHeroService,
        ],
    })
], HeroModule);
//# sourceMappingURL=hero.module.js.map
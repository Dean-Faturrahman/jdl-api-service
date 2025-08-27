"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const common_module_1 = require("./common/common.module");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const hero_module_1 = require("./hero/hero.module");
const quotes_module_1 = require("./quotes/quotes.module");
const testimonies_module_1 = require("./testimonies/testimonies.module");
const trips_module_1 = require("./trips/trips.module");
const company_module_1 = require("./company/company.module");
const team_module_1 = require("./team/team.module");
const app_controller_1 = require("./app.controller");
const stories_module_1 = require("./stories/stories.module");
const galleries_module_1 = require("./galleries/galleries.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [common_module_1.CommonModule, user_module_1.UserModule, auth_module_1.AuthModule, hero_module_1.HeroModule, quotes_module_1.QuotesModule, testimonies_module_1.TestimoniesModule, trips_module_1.TripsModule, company_module_1.CompanyModule, team_module_1.TeamModule, stories_module_1.StoriesModule, galleries_module_1.GalleriesModule],
        controllers: [app_controller_1.AppController],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
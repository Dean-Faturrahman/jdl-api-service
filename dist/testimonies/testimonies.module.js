"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimoniesModule = void 0;
const common_1 = require("@nestjs/common");
const testimonies_controller_1 = require("./admin/testimonies.controller");
const testimonies_service_1 = require("./admin/testimonies.service");
const testimonies_controller_2 = require("./public/testimonies.controller");
const testomonies_service_1 = require("./public/testomonies.service");
let TestimoniesModule = class TestimoniesModule {
};
exports.TestimoniesModule = TestimoniesModule;
exports.TestimoniesModule = TestimoniesModule = __decorate([
    (0, common_1.Module)({
        controllers: [testimonies_controller_1.AdminTestimoniesController, testimonies_controller_2.TestimoniesController],
        providers: [testimonies_service_1.AdminTestimoniesService, testomonies_service_1.TestimoniesService],
    })
], TestimoniesModule);
//# sourceMappingURL=testimonies.module.js.map
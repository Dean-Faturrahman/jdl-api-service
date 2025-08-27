"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleriesModule = void 0;
const common_1 = require("@nestjs/common");
const galleries_service_1 = require("./admin/galleries.service");
const galleries_controller_1 = require("./admin/galleries.controller");
const galleries_controller_2 = require("./public/galleries.controller");
const galleries_service_2 = require("./public/galleries.service");
let GalleriesModule = class GalleriesModule {
};
exports.GalleriesModule = GalleriesModule;
exports.GalleriesModule = GalleriesModule = __decorate([
    (0, common_1.Module)({
        controllers: [galleries_controller_1.AdminGalleriesController, galleries_controller_2.GalleriesController],
        providers: [galleries_service_1.AdminGalleriesService, galleries_service_2.GalleriesService],
    })
], GalleriesModule);
//# sourceMappingURL=galleries.module.js.map
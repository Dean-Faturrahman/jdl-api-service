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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminTripsController = void 0;
const common_1 = require("@nestjs/common");
const trips_service_1 = require("./trips.service");
const create_trip_dto_1 = require("../dto/create-trip.dto");
const update_trip_dto_1 = require("../dto/update-trip.dto");
let AdminTripsController = class AdminTripsController {
    constructor(tripsService) {
        this.tripsService = tripsService;
    }
    async create(createTripDto) {
        const result = await this.tripsService.create(createTripDto);
        return {
            status_code: common_1.HttpStatus.CREATED,
            message: 'Successfully created a trip',
            data: result,
        };
    }
    async findAll(page, limit) {
        const result = await this.tripsService.findAll(page, limit);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully retrieved all trips',
            data: result,
        };
    }
    async findOne(id) {
        const trip = await this.tripsService.findOne(id);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully retrieved trip',
            data: trip,
        };
    }
    async update(id, updateTripDto) {
        const result = await this.tripsService.update(id, updateTripDto);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully updated trip',
            data: result,
        };
    }
    async remove(id) {
        await this.tripsService.remove(id);
        return {
            status_code: common_1.HttpStatus.OK,
            message: 'Successfully removed trip',
        };
    }
};
exports.AdminTripsController = AdminTripsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_trip_dto_1.CreateTripDto]),
    __metadata("design:returntype", Promise)
], AdminTripsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdminTripsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminTripsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_trip_dto_1.UpdateTripDto]),
    __metadata("design:returntype", Promise)
], AdminTripsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminTripsController.prototype, "remove", null);
exports.AdminTripsController = AdminTripsController = __decorate([
    (0, common_1.Controller)('api/v1/admin/trips'),
    __metadata("design:paramtypes", [trips_service_1.AdminTripsService])
], AdminTripsController);
//# sourceMappingURL=trips.controller.js.map
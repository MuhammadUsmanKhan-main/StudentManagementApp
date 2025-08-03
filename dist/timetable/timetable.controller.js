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
exports.TimetableController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../auth/guard/role.guard");
const timetable_service_1 = require("./timetable.service");
let TimetableController = class TimetableController {
    constructor(timetableService) {
        this.timetableService = timetableService;
    }
    getAll() {
        return this.timetableService.findAllTeachersTimetable();
    }
    getOne(id) {
        return this.timetableService.findOne(id);
    }
};
exports.TimetableController = TimetableController;
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)("getTeachersTimetable"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TimetableController.prototype, "getAll", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)('getTimetableById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TimetableController.prototype, "getOne", null);
exports.TimetableController = TimetableController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), role_guard_1.RolesGuard),
    (0, common_1.Controller)("timetable"),
    __metadata("design:paramtypes", [timetable_service_1.TimetableService])
], TimetableController);
//# sourceMappingURL=timetable.controller.js.map
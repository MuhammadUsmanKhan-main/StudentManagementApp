"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeworkModule = void 0;
const common_1 = require("@nestjs/common");
const homework_controller_1 = require("./homework.controller");
const homework_service_1 = require("./homework.service");
const timetable_service_1 = require("../timetable/timetable.service");
const timetable_module_1 = require("../timetable/timetable.module");
let HomeworkModule = class HomeworkModule {
};
exports.HomeworkModule = HomeworkModule;
exports.HomeworkModule = HomeworkModule = __decorate([
    (0, common_1.Module)({
        imports: [timetable_module_1.TimetableModule],
        controllers: [homework_controller_1.HomeworkController],
        providers: [homework_service_1.HomeworkService, timetable_service_1.TimetableService],
    })
], HomeworkModule);
//# sourceMappingURL=homework.module.js.map
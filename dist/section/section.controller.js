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
exports.SectionController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
const role_guard_1 = require("../auth/guard/role.guard");
const role_enum_1 = require("../common/enums/role.enum");
const section_service_1 = require("./section.service");
const createSection_dto_1 = require("./dto/createSection.dto");
let SectionController = class SectionController {
    constructor(sectionService) {
        this.sectionService = sectionService;
    }
    createSection(createSectionDto) {
        return this.sectionService.createSection(createSectionDto);
    }
};
exports.SectionController = SectionController;
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Post)("createSection"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createSection_dto_1.CreateSectionDto]),
    __metadata("design:returntype", void 0)
], SectionController.prototype, "createSection", null);
exports.SectionController = SectionController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Controller)("admin"),
    __metadata("design:paramtypes", [section_service_1.SectionService])
], SectionController);
//# sourceMappingURL=section.controller.js.map
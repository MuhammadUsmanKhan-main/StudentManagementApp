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
exports.SubjectController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
const role_guard_1 = require("../auth/guard/role.guard");
const role_enum_1 = require("../common/enums/role.enum");
const subject_service_1 = require("./subject.service");
const createSubject_dto_1 = require("./dto/createSubject.dto");
const updateSubject_dto_1 = require("./dto/updateSubject.dto");
let SubjectController = class SubjectController {
    constructor(subjectService) {
        this.subjectService = subjectService;
    }
    createCourse(createSubjectDto) {
        return this.subjectService.createSubject(createSubjectDto);
    }
    getAllSubjects() {
        return this.subjectService.getAllSubjects();
    }
    getSubjectById(id) {
        return this.subjectService.getSubjectById(id);
    }
    updateSubject(id, updateSubjectDto) {
        return this.subjectService.updateSubject(id, updateSubjectDto);
    }
    deleteSubject(id) {
        return this.subjectService.deleteSubject(id);
    }
};
exports.SubjectController = SubjectController;
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Post)("createSubject"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createSubject_dto_1.CreateSubjectDto]),
    __metadata("design:returntype", void 0)
], SubjectController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Get)("getAllSubjects"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubjectController.prototype, "getAllSubjects", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Get)("getSubjectById/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubjectController.prototype, "getSubjectById", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Put)("updateSubject/:id"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateSubject_dto_1.UpdateSubjectDto]),
    __metadata("design:returntype", void 0)
], SubjectController.prototype, "updateSubject", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Delete)("deleteSubject/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubjectController.prototype, "deleteSubject", null);
exports.SubjectController = SubjectController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Controller)("admin"),
    __metadata("design:paramtypes", [subject_service_1.SubjectService])
], SubjectController);
//# sourceMappingURL=subject.controller.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAttendanceDto = exports.StudentAttendanceDto = void 0;
const class_validator_1 = require("class-validator");
const attendance_entities_1 = require("../entities/attendance.entities");
const attendance_status_enum_1 = require("../../common/enums/attendance-status.enum");
const class_transformer_1 = require("class-transformer");
class StudentAttendanceDto {
}
exports.StudentAttendanceDto = StudentAttendanceDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], StudentAttendanceDto.prototype, "studentId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(attendance_status_enum_1.AttendanceStatus),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StudentAttendanceDto.prototype, "status", void 0);
class CreateAttendanceDto extends attendance_entities_1.AttendanceEntity {
}
exports.CreateAttendanceDto = CreateAttendanceDto;
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], CreateAttendanceDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAttendanceDto.prototype, "markedById", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAttendanceDto.prototype, "subjectId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAttendanceDto.prototype, "sectionId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => StudentAttendanceDto),
    __metadata("design:type", Array)
], CreateAttendanceDto.prototype, "students", void 0);
//# sourceMappingURL=createAttendance.dto.js.map
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
exports.HomworkDto = void 0;
const class_transformer_1 = require("class-transformer");
const homework_entities_1 = require("../entities/homework.entities");
let HomworkDto = class HomworkDto extends homework_entities_1.HomeworkEntity {
};
exports.HomworkDto = HomworkDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], HomworkDto.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], HomworkDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], HomworkDto.prototype, "dueDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], HomworkDto.prototype, "assignedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], HomworkDto.prototype, "assignedById", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], HomworkDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], HomworkDto.prototype, "studentId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], HomworkDto.prototype, "subjectId", void 0);
exports.HomworkDto = HomworkDto = __decorate([
    (0, class_transformer_1.Exclude)()
], HomworkDto);
//# sourceMappingURL=homework.dto.js.map
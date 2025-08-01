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
exports.SignInUserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const role_enum_1 = require("../../common/enums/role.enum");
class SignInUserDto {
}
exports.SignInUserDto = SignInUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The email of the user',
        example: 'johndoe@gmail.com',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SignInUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Enter new minimum 8 digit password following the pattern shown in example',
        example: '12345678Aa@',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignInUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(role_enum_1.Role),
    __metadata("design:type", String)
], SignInUserDto.prototype, "role", void 0);
//# sourceMappingURL=signin-user.dto.js.map
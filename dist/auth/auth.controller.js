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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const public_decorator_1 = require("./decorator/public.decorator");
const admin_service_1 = require("../admin/admin.service");
let AuthController = class AuthController {
    constructor(userService, adminService) {
        this.userService = userService;
        this.adminService = adminService;
    }
    signin(request, res) {
        const user = request.user;
        return this.userService.signin(user, res);
    }
    logout(res) {
        return this.userService.logout(res);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Post)("signin"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("local")),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signin", null);
__decorate([
    (0, swagger_1.ApiBody)({
        description: "Logout User from the App",
    }),
    (0, common_1.Version)("1"),
    (0, common_1.Get)("logout"),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiTags)("Authentication"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [user_service_1.UserService,
        admin_service_1.AdminService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
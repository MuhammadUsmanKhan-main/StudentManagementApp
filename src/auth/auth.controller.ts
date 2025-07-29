import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
  Version,
  HttpCode,
  UseGuards,
  Request,
  // Response,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Public } from "./decorator/public.decorator";
import { Response } from "express";
import { SignUpAdminDto } from "src/admin/dto/signup-admin.dto";
import { AdminService } from "src/admin/admin.service";
import { AdminDto } from "src/admin/dto/admin.dto";
import { RolesGuard } from "./guard/role.guard";
import { Role } from "src/common/enums/role.enum";
import { Roles } from "./decorator/roles.decorator";

@Public()
@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService
  ) {}

  // sign up swagger

  // sign up controller
  

  // signin swagger

  // signin controller
  @Version("1")
  @Post("signin")
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard("local"))
  signin(@Request() request: any, @Res({ passthrough: true }) res: Response) {
    const user = request.user;
    return this.userService.signin(user, res);
  }

  // account verification swagger

  @ApiBody({
    description: "Logout User from the App",
  })
  @Version("1")
  @Get("logout")
  logout(@Res({ passthrough: true }) res: Response) {
    return this.userService.logout(res);
  }
}

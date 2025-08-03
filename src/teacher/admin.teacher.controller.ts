import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  UseGuards,
  HttpCode,
  Res,
  Version,
  Request,
  NotFoundException,
  Put,
} from "@nestjs/common";
// import { AdminService } from './admin.service';
// import { StudentService } from './student.service';
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/auth/decorator/roles.decorator";
import { RolesGuard } from "src/auth/guard/role.guard";
import { Role } from "src/common/enums/role.enum";
import { TeacherService } from "./teacher.service";
import { CreateTeacherDto } from "./dto/createTeacher.dto";
import { UpdateTeacherDto } from "./dto/updateTeacher.dto";
// import { UserService } from './user.service';
// import { SignUpUserDto } from './dto/signup-user.dto';
// import { SignInUserDto } from './dto/signin-user.dto';
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.Admin)
@Controller("admin/teacher")
export class TeacherAdminController {
  constructor(private readonly teacherService: TeacherService) {}

  @Version("1")
  @Post("createTeacher")
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  // @Roles(Role.Admin)
  createTeacher(
    @Request() request: any,
    @Body() createTeacherDto: CreateTeacherDto
  ) {
    const adminId = request.user.id;
    console.log({ adminId });

    return this.teacherService.createTeacher(createTeacherDto, adminId);
  }

  @Version("1")
  @Put("updateTeacher/:id")
  async updateTeacher(
    @Param("id") id: string,
    @Body() updateDto: UpdateTeacherDto
  ) {
    return await this.teacherService.update(id, updateDto);
  }

  @Version("1")
  @Delete("deleteTeacher/:id")
  async deleteTeacher(@Param("id") id: string) {
    return await this.teacherService.remove(id);
  }
}

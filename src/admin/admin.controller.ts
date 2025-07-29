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
  Version,
  Res,
  HttpCode,
  Request,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/auth/decorator/roles.decorator";
import { RolesGuard } from "src/auth/guard/role.guard";
import { Role } from "src/common/enums/role.enum";
import { AdminDto } from "./dto/admin.dto";
import { SignUpAdminDto } from "./dto/signup-admin.dto";
import { CreateStudentDto } from "src/student/dto/createStudent.dto";
import { StudentService } from "src/student/student.service";
import { CreateTeacherDto } from "src/teacher/dto/createTeacher.dto";
import { TeacherService } from "src/teacher/teacher.service";
import { Public } from "src/auth/decorator/public.decorator";
// import { UserService } from './user.service';
// import { SignUpUserDto } from './dto/signup-user.dto';
// import { SignInUserDto } from './dto/signin-user.dto';
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.Admin)
@Controller("admin")
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly studentService: StudentService,
    private readonly teacherService: TeacherService
  ) {}

  @Version("1")
  // @Public()
  @Post("createAdmin")
  // @UseGuards(AuthGuard("jwt"), RolesGuard)
  // @Roles(Role.Admin)
  @UsePipes(ValidationPipe)
  createAdmin(
    @Body() signUpAdminDto: SignUpAdminDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<AdminDto> {
    return this.adminService.createAdmin(signUpAdminDto, res);
  }

  @Version("1")
  @Post("createStudent")
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  // @Roles(Role.Admin)
  createStudent(
    @Request() request: any,
    @Body() createStudentDto: CreateStudentDto
  ) {
    const adminId = request.user.id;
    console.log({ adminId });

    return this.studentService.createStudent(createStudentDto, adminId);
  }

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


  
}

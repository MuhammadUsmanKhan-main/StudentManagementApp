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
  HttpCode,
  Request,
  Put,
} from "@nestjs/common";
// import { AdminService } from './admin.service';
import { StudentService } from "./student.service";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/auth/decorator/roles.decorator";
import { RolesGuard } from "src/auth/guard/role.guard";
import { Role } from "src/common/enums/role.enum";
import { GetStudentsDto } from "src/attendance/dto/getStudentsDto";
// import { UserService } from './user.service';
// import { SignUpUserDto } from './dto/signup-user.dto';
// import { SignInUserDto } from './dto/signin-user.dto';
@UseGuards(AuthGuard("jwt"), RolesGuard)
// @Roles(Role.Student)
@Controller("student")
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Version("1")
  @Get("getAllStudents")
  getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Version("1")
  @Get("getStudentById/:id")
  getStudent(@Param("id") id: string) {
    return this.studentService.getStudentById(id);
  }

  @Version("1")
  @Get("getStudentsOfSpecificClassAndSection/:courseId/:sectionId")
  @HttpCode(200)
  //   @UsePipes(ValidationPipe)
  // @Roles(Role.Admin)
  getStudentsOfSpecificClassAndSection(@Param("courseId") courseId: string, @Param("sectionId") sectionId: string) {
    return this.studentService.getStudentsOfSpecificClassAndSection(
      courseId,
      sectionId
    );
  }
}

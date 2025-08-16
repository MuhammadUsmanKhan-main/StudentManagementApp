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
  Req,
} from "@nestjs/common";
// import { AdminService } from './admin.service';
import { StudentService } from "./student.service";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/auth/decorator/roles.decorator";
import { RolesGuard } from "src/auth/guard/role.guard";
import { Role } from "src/common/enums/role.enum";
import { UpdateStudentDto } from "./dto/updateStudent.dto";
import { CreateStudentDto } from "./dto/createStudent.dto";
// import { UserService } from './user.service';
// import { SignUpUserDto } from './dto/signup-user.dto';
// import { SignInUserDto } from './dto/signin-user.dto';
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.Teacher)
@Controller("teacher/student")
export class AdminStudentController {
  constructor(private readonly studentService: StudentService) {}

  @Version("1")
  @Get("getStudentsOfSpecificClassAndSection/:courseId/:sectionId")
  @HttpCode(200)
  //   @UsePipes(ValidationPipe)
  // @Roles(Role.Admin)
  getStudentsOfSpecificClassAndSection(
    @Param("courseId") courseId: string,
    @Param("sectionId") sectionId: string
  ) {
    // const teacherId = req.user.id
    return this.studentService.getStudentsOfSpecificClassAndSection(
      courseId,
      sectionId
    );
  }
}

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
  Put,
  Req,
} from "@nestjs/common";
// import { AdminService } from './admin.service';
// import { StudentService } from './student.service';
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/auth/decorator/roles.decorator";
import { RolesGuard } from "src/auth/guard/role.guard";
import { Role } from "src/common/enums/role.enum";
import { SubjectService } from "./subject.service";
// import { CourseService } from "./course.service";
// import { CreateCourseDto } from "./dto/createCourse.dto";
// import { UpdateCourseDto } from "./dto/updateCourse.dto";
// import { TeacherService } from "./teacher.service";
// import { CreateTeacherDto } from "./dto/createTeacher.dto";
// import { UserService } from './user.service';
// import { SignUpUserDto } from './dto/signup-user.dto';
// import { SignInUserDto } from './dto/signin-user.dto';
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.Teacher)
@Controller("teacher/subject")
export class TeacherSubjectController {
  constructor(private readonly subjectService: SubjectService) { }


@Version("1")
  @Get("getTeacherSubjects")
  @HttpCode(200)
//   @UsePipes(ValidationPipe)
  // @Roles(Role.Admin)
  getTeacherSubjects(@Req() req) {
    const teacherId = req.user.id
    return this.subjectService.getTeacherSubjects(teacherId);
  }

}

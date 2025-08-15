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
} from "@nestjs/common";
// import { AdminService } from './admin.service';
// import { StudentService } from './student.service';
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/auth/decorator/roles.decorator";
import { RolesGuard } from "src/auth/guard/role.guard";
import { Role } from "src/common/enums/role.enum";
import { HomeworkService } from "./homework.service";
import { CreateHomeworkDto } from "./dto/createHomework.dto";
// import { SubjectService } from "./subject.service";
// import { CreateSubjectDto } from "./dto/createSubject.dto";
// import { CourseService } from "./course.service";
// import { CreateCourseDto } from "./dto/createCourse.dto";
// import { TeacherService } from "./teacher.service";
// import { CreateTeacherDto } from "./dto/createTeacher.dto";
// import { UserService } from './user.service';
// import { SignUpUserDto } from './dto/signup-user.dto';
// import { SignInUserDto } from './dto/signin-user.dto';
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.Teacher)
@Controller("teacher")
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

//   @Version("1")
//   @Post("createHomework")
//   @HttpCode(200)
// //   @UsePipes(ValidationPipe)
//   // @Roles(Role.Admin)
//   createHomework(@Body() createHomeworkDto: CreateHomeworkDto) {
//     return this.homeworkService.createHomework(createHomeworkDto);
//   }
}

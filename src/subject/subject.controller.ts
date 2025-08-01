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
} from "@nestjs/common";
// import { AdminService } from './admin.service';
// import { StudentService } from './student.service';
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/auth/decorator/roles.decorator";
import { RolesGuard } from "src/auth/guard/role.guard";
import { Role } from "src/common/enums/role.enum";
import { SubjectService } from "./subject.service";
import { CreateSubjectDto } from "./dto/createSubject.dto";
import { UpdateSubjectDto } from "./dto/updateSubject.dto";
// import { CourseService } from "./course.service";
// import { CreateCourseDto } from "./dto/createCourse.dto";
// import { TeacherService } from "./teacher.service";
// import { CreateTeacherDto } from "./dto/createTeacher.dto";
// import { UserService } from './user.service';
// import { SignUpUserDto } from './dto/signup-user.dto';
// import { SignInUserDto } from './dto/signin-user.dto';
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.Admin)
@Controller("admin")
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) { }

  @Version("1")
  @Post("createSubject")
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  // @Roles(Role.Admin)
  createCourse(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.createSubject(createSubjectDto);
  }

  @Version("1")
  @Get("getAllSubjects")
  getAllSubjects() {
    return this.subjectService.getAllSubjects();
  }

  @Version("1")
  @Get("getSubjectById/:id")
  getSubjectById(@Param("id") id: string) {
    return this.subjectService.getSubjectById(id);
  }

  @Version("1")
  @Put("updateSubject/:id")
  @UsePipes(ValidationPipe)
  updateSubject(
    @Param("id") id: string,
    @Body() updateSubjectDto: UpdateSubjectDto
  ) {
    return this.subjectService.updateSubject(id, updateSubjectDto);
  }

  @Version("1")
  @Delete("deleteSubject/:id")
  deleteSubject(@Param("id") id: string) {
    return this.subjectService.deleteSubject(id);
  }

}

import {
  Controller,
  Get,
  Post,
  Put,
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
import { CreateTimetableDto } from "./dto/createTimetable.dto";
import { TimetableService } from "./timetable.service";
import { UpdateTimetableDto } from "./dto/updateTimetable.dto";
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
@Roles(Role.Admin)
@Controller("admin/timetable")
export class AdminTimetableController {
  constructor(private readonly timetableService: TimetableService) { }

  @Version("1")
  @Post("createRecordOnTimetable")
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  // @Roles(Role.Admin)
  createRecordOnTimetable(@Body() createTimetableDto: CreateTimetableDto) {
    return this.timetableService.createRecordOnTimetable(createTimetableDto);
  }

  @Version('1')
  @Put('updateTimetable/:id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() updateTimetableDto: UpdateTimetableDto,
  ) {
    return this.timetableService.update(id, updateTimetableDto);
  }

  @Version('1')
  @Delete('deleteTimetable/:id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.timetableService.delete(id);
  }
}

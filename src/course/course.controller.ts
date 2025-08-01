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
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/createCourse.dto";
import { UpdateCourseDto } from "./dto/updateCourse.dto";
// import { TeacherService } from "./teacher.service";
// import { CreateTeacherDto } from "./dto/createTeacher.dto";
// import { UserService } from './user.service';
// import { SignUpUserDto } from './dto/signup-user.dto';
// import { SignInUserDto } from './dto/signin-user.dto';
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.Admin)
@Controller("admin")
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Version("1")
  @Post("createCourse")
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  // @Roles(Role.Admin)
  createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }


  @Version("1")
  @Get("getAllCourses")
  getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @Version("1")
  @Get('getCourseById/:id')
  getCourseById(@Param('id') id: string) {
    return this.courseService.getCourseById(id);
  }

  @Version("1")
  @Put('updateCourse/:id')
  updateCourse(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseService.updateCourse(id, updateCourseDto);
  }

  @Version("1")
  @Delete('deleteCourse/:id')
  deleteCourse(@Param('id') id: string) {
    return this.courseService.deleteCourse(id);
  }


}

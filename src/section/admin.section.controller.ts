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
import { SectionService } from "./section.service";
import { CreateSectionDto } from "./dto/createSection.dto";
import { UpdateSectionDto } from "./dto/updateSection.dto";
// import { CourseService } from "./course.service";
// import { CreateCourseDto } from "./dto/createCourse.dto";
// import { TeacherService } from "./teacher.service";
// import { CreateTeacherDto } from "./dto/createTeacher.dto";
// import { UserService } from './user.service';
// import { SignUpUserDto } from './dto/signup-user.dto';
// import { SignInUserDto } from './dto/signin-user.dto';
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.Admin)
@Controller("admin/section")
export class AdminSectionController {
  constructor(private readonly sectionService: SectionService) { }

  @Version("1")
  @Post("createSection")
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  // @Roles(Role.Admin)
  createSection(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.createSection(createSectionDto);
  }

  @Version("1")
  @Put("updateSection/:id")
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  updateSection(
    @Param("id") id: string,
    @Body() updateSectionDto: UpdateSectionDto
  ) {
    return this.sectionService.updateSection(id, updateSectionDto);
  }

  @Version("1")
  @Delete("deleteSection/:id")
  @HttpCode(200)
  deleteSection(@Param("id") id: string) {
    return this.sectionService.deleteSection(id);
  }

}

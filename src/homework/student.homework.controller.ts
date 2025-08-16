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
  Req,
} from "@nestjs/common";
// import { AdminService } from './admin.service';
// import { StudentService } from './student.service';
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/auth/decorator/roles.decorator";
import { RolesGuard } from "src/auth/guard/role.guard";
import { Role } from "src/common/enums/role.enum";
import { HomeworkService } from "./homework.service";
import { CreateHomeworkDto } from "./dto/createHomework.dto";
// import { CreateAttendanceDto } from "./dto/createAttendance.dto";
// import { AttendanceService } from "./attendance.service";

@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.Student)
@Controller("student/homework")
export class TeacherHomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Version("1")
  @Get("createHomework")
  @HttpCode(200)
  //   @UsePipes(ValidationPipe)
  // @Roles(Role.Admin)
  createAttendance(
    @Body() createHomeworkDto: CreateHomeworkDto
  ) {
    // console.log(res.user.id);

    return this.homeworkService.createHomework(createHomeworkDto);
  }
}

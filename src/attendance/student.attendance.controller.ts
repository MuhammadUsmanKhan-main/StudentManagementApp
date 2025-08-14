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
import { CreateAttendanceDto } from "./dto/createAttendance.dto";
import { AttendanceService } from "./attendance.service";
import { GetStudentsDto } from "./dto/getStudentsDto";

@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.Student)
@Controller("student/attendance")
export class StudentAttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Version("1")
  @Get("count")
  @HttpCode(200)
  //   @UsePipes(ValidationPipe)
  // @Roles(Role.Admin)
  getStudentAttendance(
    @Req() res
  ) {
    // console.log(res.user.id);

    return this.attendanceService.getStudentAttendanceCount(res.user.id);
  }
}

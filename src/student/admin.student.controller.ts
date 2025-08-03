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
import { UpdateStudentDto } from "./dto/updateStudent.dto";
import { CreateStudentDto } from "./dto/createStudent.dto";
// import { UserService } from './user.service';
// import { SignUpUserDto } from './dto/signup-user.dto';
// import { SignInUserDto } from './dto/signin-user.dto';
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.Admin)
@Controller("admin/student")
export class AdminStudentController {
  constructor(private readonly studentService: StudentService) {}
  @Version("1")
  @Post("createStudent")
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  // @Roles(Role.Admin)
  createStudent(
    @Request() request: any,
    @Body() createStudentDto: CreateStudentDto
  ) {
    const adminId = request.user.id;
    console.log({ adminId });

    return this.studentService.createStudent(createStudentDto, adminId);
  }

  @Version("1")
  @Put("updateStudent/:id")
  @UsePipes(ValidationPipe)
  updateStudent(
    @Param("id") id: string,
    @Body() updateStudentDto: UpdateStudentDto
  ) {
    return this.studentService.updateStudent(id, updateStudentDto);
  }

  @Version("1")
  @Delete("deleteStudent/:id")
  deleteStudent(@Param("id") id: string) {
    return this.studentService.deleteStudent(id);
  }
}

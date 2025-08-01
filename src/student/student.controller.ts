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
} from "@nestjs/common";
// import { AdminService } from './admin.service';
import { StudentService } from "./student.service";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/auth/decorator/roles.decorator";
import { RolesGuard } from "src/auth/guard/role.guard";
import { Role } from "src/common/enums/role.enum";
import { CreateStudentDto } from "./dto/createStudent.dto";
import { UpdateStudentDto } from "./dto/updateStudent.dto";
// import { UserService } from './user.service';
// import { SignUpUserDto } from './dto/signup-user.dto';
// import { SignInUserDto } from './dto/signin-user.dto';
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.Student)
@Controller("student")
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Version("1")
  @Get("getAllStudents")
  getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Version("1")
  @Get("getStudent/:id")
  getStudent(@Param("id") id: string) {
    return this.studentService.getStudentById(id);
  }

  @Version("1")
  @Patch("updateStudent/:id")
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

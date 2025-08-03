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
  Res,
  HttpCode,
  Request,
  Put,
  NotFoundException,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/auth/decorator/roles.decorator";
import { RolesGuard } from "src/auth/guard/role.guard";
import { Role } from "src/common/enums/role.enum";
import { AdminDto } from "./dto/admin.dto";
import { SignUpAdminDto } from "./dto/signup-admin.dto";
import { CreateStudentDto } from "src/student/dto/createStudent.dto";
import { StudentService } from "src/student/student.service";
import { CreateTeacherDto } from "src/teacher/dto/createTeacher.dto";
import { TeacherService } from "src/teacher/teacher.service";
import { Public } from "src/auth/decorator/public.decorator";
import { UpdateAdminDto } from "./dto/updateAdmin.dto";
import { UpdateStudentDto } from "src/student/dto/updateStudent.dto";
import { UpdateTeacherDto } from "src/teacher/dto/updateTeacher.dto";
// import { UserService } from './user.service';
// import { SignUpUserDto } from './dto/signup-user.dto';
// import { SignInUserDto } from './dto/signin-user.dto';
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.Admin)
@Controller("admin")
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly studentService: StudentService,
    private readonly teacherService: TeacherService
  ) { }

  @Version("1")
  // @Public()
  @Post("createAdmin")
  // @UseGuards(AuthGuard("jwt"), RolesGuard)
  // @Roles(Role.Admin)
  @UsePipes(ValidationPipe)
  createAdmin(
    @Body() signUpAdminDto: SignUpAdminDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<AdminDto> {
    return this.adminService.createAdmin(signUpAdminDto, res);
  }

  @Version("1")
  @Get("getAllAdmins")
  getAll() {
    return this.adminService.getAllAdmins();
  }

  @Version("1")
  @Get('getAdminById/:id')
  getById(@Param('id') id: string) {
    return this.adminService.getAdminById(id);
  }

  @Version("1")
  @Put('updateAdmin/:id')
  updateAdmin(@Param('id') id: string, @Body() dto: UpdateAdminDto) {
    return this.adminService.updateAdmin(id, dto);
  }

  @Version("1")
  @Delete('deleteAdmin/:id')
  delete(@Param('id') id: string) {
    return this.adminService.deleteAdmin(id);
  }


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
  @Get("getAllStudents")
  getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Version("1")
  @Get("getStudentById/:id")
  getStudent(@Param("id") id: string) {
    return this.studentService.getStudentById(id);
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

  @Version("1")
  @Post("createTeacher")
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  // @Roles(Role.Admin)
  createTeacher(
    @Request() request: any,
    @Body() createTeacherDto: CreateTeacherDto
  ) {
    const adminId = request.user.id;
    console.log({ adminId });

    return this.teacherService.createTeacher(createTeacherDto, adminId);
  }

  @Version("1")
  @Get("getAllTeachers")
  async getAllTeachers() {
    return await this.teacherService.findAll();
  }

  @Version("1")
  @Get('getTeacherById/:id')
  async getTeacherById(@Param('id') id: string) {
    const teacher = await this.teacherService.findOne(id);
    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }

  @Version("1")
  @Put('updateTeacher/:id')
  async updateTeacher(@Param('id') id: string, @Body() updateDto: UpdateTeacherDto) {
    return await this.teacherService.update(id, updateDto);
  }

  @Version("1")
  @Delete('deleteTeacher/:id')
  async deleteTeacher(@Param('id') id: string) {
    return await this.teacherService.remove(id);
  }

}

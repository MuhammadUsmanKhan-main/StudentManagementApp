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
  NotFoundException,
} from "@nestjs/common";
// import { AdminService } from './admin.service';
// import { StudentService } from './student.service';
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/auth/decorator/roles.decorator";
import { RolesGuard } from "src/auth/guard/role.guard";
import { Role } from "src/common/enums/role.enum";
import { TeacherService } from "./teacher.service";
import { CreateTeacherDto } from "./dto/createTeacher.dto";
import { UpdateTeacherDto } from "./dto/updateTeacher.dto";
// import { UserService } from './user.service';
// import { SignUpUserDto } from './dto/signup-user.dto';
// import { SignInUserDto } from './dto/signin-user.dto';
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.Teacher)
@Controller("teacher")
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) { }

  @Get()
  async getAll() {
    return await this.teacherService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const teacher = await this.teacherService.findOne(id);
    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateTeacherDto) {
    return await this.teacherService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.teacherService.remove(id);
  }
}

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
  Req,
  Request,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
// import { SignUpUserDto } from './dto/signup-user.dto';
// import { SignInUserDto } from './dto/signin-user.dto';
import { PrismaService } from "src/prisma/prisma.service";
import { comparePassword, encryptPassword } from "src/common/utils/bcrypt";
import {
  generateOtp,
  removeJwtFromCookie,
  storingJwtOnCookie,
} from "src/common/utils/helper";
// import { AccountVerificationUserDto } from './dto/account-verification-user.dto';
// import { ChangePasswordDto } from './dto/changepassword-user.dto';
// import { NotFoundError } from 'rxjs';
// import { SignUpAdminDto } from './dto/signup-admin.dto';
// import { UserDto } from './dto/user.dto';
// import { AdminDto } from "./dto/admin.dto";
import { plainToClass, plainToInstance } from "class-transformer";
// import { ResendOtpDto } from './dto/resend.otp.dto';
// import { AccessTokenPayload } from 'src/auth/types/AccessTokenPayload';
// import { AccessToken } from 'src/auth/types/AccessToken';
import { JwtService } from "@nestjs/jwt";
// import { ForgetPasswordUserDto } from './dto/forgetpassword-user.dto.';
import { MailerService } from "src/mailer/mailer.service";
import { CreateTeacherDto } from "./dto/createTeacher.dto";
import { TeacherDto } from "./dto/teacher.dto";
import { UpdateTeacherDto } from "./dto/updateTeacher.dto";
// import { SignUpAdminDto } from "./dto/signup-admin.dto";

@Injectable()
export class TeacherService {
  constructor(private readonly prismaService: PrismaService) { }

  async findByEmail(email: string) {
    const teacher = await this.prismaService.teacher.findUnique({
      where: {
        email,
      },
    });
    return teacher;
  }

  async createTeacher(createTeacherDto: CreateTeacherDto, adminId: string) {
    // check teacher exist
    const teacherExist = await this.findByEmail(createTeacherDto.email);

    console.log({ teacherExist, createTeacherDto })

    if (teacherExist) {
      throw new ConflictException("Email already exists");
    }

    const teacherCreated = await this.prismaService.teacher.create({
      data: {
        firstName: createTeacherDto.firstName,
        lastName: createTeacherDto.lastName,
        phone: createTeacherDto.phone,
        email: createTeacherDto.email,
        password: await encryptPassword(createTeacherDto.password),
        adminId,
      },
    });

    const teacherDto = plainToClass(TeacherDto, {
      ...teacherCreated,
    });

    // TODO Otp send email

    return teacherDto;
  }


  async findAll() {
    return await this.prismaService.teacher.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.teacher.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    const updated = await this.prismaService.teacher.update({
      where: { id },
      data: {
        ...updateTeacherDto,
        password: updateTeacherDto.password
          ? await encryptPassword(updateTeacherDto.password)
          : undefined,
      },
    });

    return plainToClass(TeacherDto, updated);
  }

  async remove(id: string) {
    // Check if the teacher exists
    const teacher = await this.findOne(id);
    if (!teacher) {
      throw new NotFoundException("Teacher not found");
    }
    // Attempt to delete the teacher
    try {
      await this.prismaService.teacher.delete({
        where: { id },
      });
    } catch (error) {

      // Handle specific error codes if needed
      if (error.code === 'P2003') {
        throw new ConflictException("Cannot delete teacher as it is associated with other records.");
      }

      throw new BadRequestException("Failed to delete teacher");
    }
  }
}
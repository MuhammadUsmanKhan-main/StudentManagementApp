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
// import { SignUpAdminDto } from "./dto/signup-admin.dto";

@Injectable()
export class TeacherService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string) {
    const teacher = await this.prismaService.teacher.findUnique({
      where: {
        email,
      },
    });
    return teacher;
  }

  async createTeacher(createTeacherDto: CreateTeacherDto, adminId:string) {
    // check teacher exist
    const teacherExist = await this.findByEmail(createTeacherDto.email);

console.log({teacherExist, createTeacherDto})

    if (teacherExist) {
      throw new ConflictException("Email already exists");
    }

    const teacherCreated = await this.prismaService.teacher.create({
      data: {
        firstName: createTeacherDto.firstName,
        lastName: createTeacherDto.lastName,
        phone: createTeacherDto.phone,
        email: createTeacherDto.email,
        password: await encryptPassword(createTeacherDto.password) ,
        adminId,
      },
    });

    const teacherDto = plainToClass(TeacherDto, {
      ...teacherCreated,
    });

    // TODO Otp send email

    return teacherDto;
  }
}

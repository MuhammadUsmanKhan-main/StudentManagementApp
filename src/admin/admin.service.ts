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
import { AdminDto } from "./dto/admin.dto";
import { plainToClass, plainToInstance } from "class-transformer";
// import { ResendOtpDto } from './dto/resend.otp.dto';
// import { AccessTokenPayload } from 'src/auth/types/AccessTokenPayload';
// import { AccessToken } from 'src/auth/types/AccessToken';
import { JwtService } from "@nestjs/jwt";
// import { ForgetPasswordUserDto } from './dto/forgetpassword-user.dto.';
// import { MailerService } from "src/mailer/mailer.service";
import { SignUpAdminDto } from "./dto/signup-admin.dto";
// import { TeacherService } from "src/teacher/teacher.service";
// import { StudentService } from "src/student/student.service";

@Injectable()
export class AdminService {
  constructor(
    private readonly prismaService: PrismaService,
    // private readonly teacherService: TeacherService,
    // private readonly studentService: StudentService,
    private readonly jwtService: JwtService
    // private readonly mailerService: MailerService
  ) {}

//<=============================================Apis Related To Admin===========================================>

  //create Admin
  async createAdmin(
    signUpAdminDto: SignUpAdminDto,
    res: any
  ): Promise<AdminDto> {
    try {
      // check email exists
      const adminExist = await this.prismaService.admin.findUnique({
        where: {
          email: signUpAdminDto.email,
        },
      });

      if (adminExist) {
        throw new ConflictException("Email already exists");
      }

      const adminCreated = await this.prismaService.admin.create({
        data: {
          firstName: signUpAdminDto.firstName,
          lastName: signUpAdminDto.lastName,
          email: signUpAdminDto.email,
          password: await encryptPassword(signUpAdminDto.password),
          phone: signUpAdminDto.phone,
        },
      });

      // const admin = {
      //   id: adminCreated.id,
      //   email: adminCreated.email,
      // };

      // TODO need to add token

      // storingJwtOnCookie(admin, res, this.jwtService);

      // Transform userCreated to UserDto
      const adminDto = plainToClass(AdminDto, {
        ...adminCreated,
      });

      // TODO Otp send email

      return adminDto;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findByEmail(email: string) {
    const admin = await this.prismaService.admin.findUnique({
      where: {
        email,
      },
    });
    return admin;
  }

  //update Admin

  //delete Admin




}

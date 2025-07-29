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
import { SignInUserDto } from "./dto/signin-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { comparePassword, encryptPassword } from "src/common/utils/bcrypt";
import {
  generateOtp,
  removeJwtFromCookie,
  storingJwtOnCookie,
} from "src/common/utils/helper";
// import { AccountVerificationUserDto } from './dto/account-verification-user.dto';
// import { ChangePasswordDto } from './dto/changepassword-user.dto';
import { NotFoundError } from "rxjs";
// import { UserDto } from "./dto/user.dto";
import { plainToClass, plainToInstance } from "class-transformer";
// import { ResendOtpDto } from './dto/resend.otp.dto';
import { AccessTokenPayload } from "src/auth/types/AccessTokenPayload";
import { AccessToken } from "src/auth/types/AccessToken";
import { JwtService } from "@nestjs/jwt";
// import { ForgetPasswordUserDto } from './dto/forgetpassword-user.dto.';
import { MailerService } from "src/mailer/mailer.service";
import { Role } from "src/common/enums/role.enum";
// import { comparePassword } from "src/common/utils/bcrypt";
import { AdminService } from "src/admin/admin.service";
import { TeacherService } from "src/teacher/teacher.service";
import { StudentService } from "src/student/student.service";

// type AuthEntity = "teacher" | "admin" | "student";

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly adminService:AdminService,
    private readonly studentService:StudentService,
    private readonly teacherService:TeacherService
  ) {}

  async validateUser(email: string, password: string, role: Role) {
    let user;
console.log({email,role})
    switch (role) {


      case Role.Admin:
        user = await this.adminService.findByEmail(email);
        break;
      case Role.Student:
        user = await this.studentService.findByEmail(email);
        console.log({Student:'student',user})

        break;
      case Role.Teacher:
        user = await this.teacherService.findByEmail(email);
        
        break;
      default:
        throw new UnauthorizedException("Invalid role");
    }

    if (user == undefined || user.password == null) {
      throw new UnauthorizedException("email or password is not correct");
    }
    let isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("email or passoword is not correct");
    }

    delete user.password;
    return { ...user, role };

    // if (!user || !(await comparePassword(password, user.password))) {
    //   throw new UnauthorizedException('Invalid credentials');
    // }

    // return { ...user, role };
  }

  async signin(user: any, res: any): Promise<any> {
    try {
      storingJwtOnCookie(user, res, this.jwtService);

      // Transform userCreated to UserDto
      const userDto = {
        ...user,
        message: "Logged in successfully",
      };

      return userDto;
    } catch (error) {
      throw error;
    }
  }


  async logout(res: any): Promise<boolean> {
    let isRemoved = await removeJwtFromCookie(res);

    return true;
  }
}

// sign up, sign in, logout,  verifyEmail, verifyForgotPassword, forgetPassword changePassword

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
import { CreateStudentDto } from "./dto/createStudent.dto";
import { StudentDto } from "./dto/student.dto";
import { StudentSignUpDto } from "./dto/studentSignup.dto";
// import { SignUpAdminDto } from "./dto/signup-admin.dto";

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string)  {
    const student = await this.prismaService.student.findUnique({
      where: {
        email,
      },
      include:{
        course:{
          select:{
            grade:true,
          }
        },
        section:{
          select:{
            name:true
          }
        }
      }
    });
   
    
    return student;
  }

  async createStudent(createStudentDto: CreateStudentDto, adminId: string) {
    // check teacher exist
    const studentExist = await this.findByEmail(createStudentDto.email);

// check courseId (TODO),
// check sectionId (TODO)

console.log({studentExist, createStudentDto})

    if (studentExist) {
      throw new ConflictException("Email already exists");
    }

    const studentCreated = await this.prismaService.student.create({
      data: {
        firstName: createStudentDto.firstName,
        lastName: createStudentDto.lastName,
        rollNumber:createStudentDto.rollNumber,
        phone: createStudentDto.phone,
        email: createStudentDto.email,
        password: await encryptPassword(createStudentDto.password),
        courseId: createStudentDto.courseId,
        sectionId: createStudentDto.sectionId,
        adminId,
      },
    });

    const studentDto = plainToClass(StudentDto, {
      ...studentCreated,
    });

    // TODO Otp send email

    return studentDto;
  }
}

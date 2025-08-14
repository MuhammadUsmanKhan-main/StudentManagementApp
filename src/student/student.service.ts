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
import { SectionService } from "src/section/section.service";
import { CourseService } from "src/course/course.service";
import { UpdateStudentDto } from "./dto/updateStudent.dto";
import { GetStudentsDto } from "src/attendance/dto/getStudentsDto";
// import { SignUpAdminDto } from "./dto/signup-admin.dto";

@Injectable()
export class StudentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly sectionService: SectionService,
    private readonly courseService: CourseService
  ) {}

  async findByEmail(email: string) {
    const student = await this.prismaService.student.findUnique({
      where: {
        email,
      },
      include: {
        course: {
          select: {
            grade: true,
          },
        },
        section: {
          select: {
            name: true,
          },
        },
      },
    });

    return student;
  }

  async createStudent(createStudentDto: CreateStudentDto, adminId: string) {
    // check teacher exist
    const studentExist = await this.findByEmail(createStudentDto.email);

    // check courseId (TODO),
    const courseExist = await this.prismaService.course.findUnique({
      where: {
        id: createStudentDto.courseId,
      },
    });
    if (!courseExist) {
      throw new NotFoundException("Course not exist");
    }
    // check sectionId (TODO)
    const sectionExist = await this.prismaService.section.findUnique({
      where: {
        id: createStudentDto.sectionId,
      },
    });
    if (!sectionExist) {
      throw new NotFoundException("Section not exist");
    }

    console.log({ studentExist, createStudentDto });

    if (studentExist) {
      throw new ConflictException("Email already exists");
    }

    const studentCreated = await this.prismaService.student.create({
      data: {
        firstName: createStudentDto.firstName,
        lastName: createStudentDto.lastName,
        rollNumber: createStudentDto.rollNumber,
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

  async getAllStudents() {
    const students = await this.prismaService.student.findMany({
      include: {
        course: true,
        section: true,
      },
    });

    const studentDto = plainToInstance(StudentDto, students);
    return studentDto;
  }

  async getStudentById(id: string) {
    const student = await this.prismaService.student.findUnique({
      where: { id },
      include: {
        course: true,
        section: true,
      },
    });

    if (!student) {
      throw new NotFoundException("Student not found");
    }

    const studentDto = plainToInstance(StudentDto, student);
    return studentDto;

    // return student;
  }

  async updateStudent(id: string, dto: UpdateStudentDto) {
    const student = await this.prismaService.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException("Student not found");
    }

    if (dto.email && dto.email !== student.email) {
      const exists = await this.prismaService.student.findUnique({
        where: { email: dto.email },
      });

      if (exists) {
        throw new ConflictException("Email already in use by another student");
      }
    }

    if (dto.courseId) {
      const course = await this.courseService.getCourseById(dto.courseId);
      if (!course) throw new NotFoundException("Course does not exist");
    }

    if (dto.sectionId) {
      const section = await this.sectionService.getSectionById(dto.sectionId);
      if (!section) throw new NotFoundException("Section does not exist");
    }

    const updatedStudent = await this.prismaService.student.update({
      where: { id },
      data: {
        ...dto,
        password: dto.password
          ? await encryptPassword(dto.password)
          : student.password,
      },
    });

    return {
      message: `Student ${updatedStudent.firstName} updated successfully`,
    };
  }

  async deleteStudent(id: string) {
    const student = await this.prismaService.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException("Student not found");
    }

    await this.prismaService.student.delete({ where: { id } });

    return {
      message: `Student ${student.firstName} ${student.lastName} deleted successfully.`,
    };
  }

  async getStudentsOfSpecificClassAndSection(
    courseId: string,
    sectionId: string
  ) {
    // const { courseId, sectionId } = getStudentsDto;

    const students = await this.prismaService.student.findMany({
      where: {
        courseId,
        sectionId,
      },
      select: {
        id: true,
      },
    });

    const studentDto = plainToInstance(StudentDto, students);
    return studentDto;
  }
}

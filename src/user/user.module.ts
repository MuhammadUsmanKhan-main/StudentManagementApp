import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';
import { TeacherService } from 'src/teacher/teacher.service';
import { StudentService } from 'src/student/student.service';
import { TeacherModule } from 'src/teacher/teacher.module';
import { StudentModule } from 'src/student/student.module';
import { AdminService } from 'src/admin/admin.service';
import { AdminModule } from 'src/admin/admin.module';

@Module({
 imports:[AdminModule, TeacherModule, StudentModule],
  controllers: [UserController],
  providers: [UserService, AdminService, TeacherService, StudentService, JwtService, MailerService],
})
export class UserModule {}

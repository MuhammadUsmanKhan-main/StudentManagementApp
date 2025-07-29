import { Module } from '@nestjs/common';
// import { UserService } from './user.service';
// import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';
// import { TeacherController } from './teacher.controller';
// import { TeacherService } from './teacher.service';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
// import { AdminService } from './admin.service';
// import { AdminController } from './admin.controller';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}

// //local.strategy.ts
// import {
//   BadRequestException,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-local';
// import { UserEntity } from 'src/user/entities/user.entity';
// import { comparePassword } from 'src/common/utils/bcrypt';
// import { UserService } from 'src/user/user.service';
// import { ApiProperty } from '@nestjs/swagger';
// import { SignInUserDto } from 'src/user/dto/signin-user.dto';
// import { PrismaService } from 'src/prisma/prisma.service';

// // type AuthEntity = 'teacher' | 'parent' | 'student';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private prismaService: PrismaService) {
//     super({
//       usernameField: 'email',
//       passwordField: 'password',
//     });
//   }
//   @ApiProperty({
//     description: 'The id of the user',
//     example: 'c23885d2-96ac-4764-b455-5d4aecdebf85',
//   })
//   async validate(type:AuthEntity,email: string, password: string): Promise<UserEntity> {
//     try {
//       const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!regex.test(email)) {
//         throw new BadRequestException('Enter Valid Email');
//       }

//       const user: UserEntity = await this.prismaService[type].findUserByEmail(email);

//       if (user == undefined || user.password == null)
//         throw new UnauthorizedException('email or passoword is not correct');
//       if (!user.email_verified)
//         throw new UnauthorizedException('User is not verified');
//       let isMatch = await comparePassword(password, user.password);
//       if (!isMatch)
//         throw new UnauthorizedException('email or passoword is not correct');
//       delete user.password;
//       return user;
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// src/auth/strategies/local.strategy.ts
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "../auth.service";
import { Role } from "src/common/enums/role.enum";
import { UserService } from "src/user/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    // Change the default 'username' field to 'email'
    super({
      usernameField: "email",
      passwordField: "password", // optional (default is 'password')
      passReqToCallback: true,
    });
  }

  async validate(req: Request, email: string, password: string): Promise<any> {
    console.log("===[DEBUG - validate()]===");
  console.log("Full body:", req.body);         // 👈 Should show email, password, role
  console.log("Extracted email:", email);      // 👈 Should show email from body
  console.log("Extracted password:", password);
  // console.log("Extracted role:", req.body.role);

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      throw new BadRequestException("Enter Valid Email");
    }

    const role = (req.body as any).role as Role; // extract role from body
    const user = await this.userService.validateUser(email, password, role);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

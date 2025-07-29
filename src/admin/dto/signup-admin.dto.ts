import { IsEmail, IsNotEmpty, IsString, IsUppercase, IsUUID, Matches } from 'class-validator';
import { AdminEntity } from '../entities/admin.entity';
import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
export class SignUpAdminDto extends OmitType(AdminEntity, ['id']) {
 
  @ApiProperty({
    description: 'The username of the user',
    example: 'johndoe',
  }) 
  @IsString()
  @IsNotEmpty()
  firstName: string;
  lastName: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'johndoe@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
 
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Enter new minimum 8 digit password following the pattern shown in example',
    example: '12345678Aa@',
  })
  @IsNotEmpty()
  @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
  @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
  @Matches(/(?=.*[!@#$%^&*(),.?":{}|<>])/, { message: 'Password must contain at least one special character' })
  password: string;
}

import {
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SectionEntity } from "../entities/section.entity";
import { Section } from "src/common/enums/section.enum";


export class CreateSectionDto extends SectionEntity {

  //   @IsString()
  @ApiProperty({ enum: Section, description: 'Name of the section' })
  @IsNotEmpty()
  @IsEnum(Section, { message: 'name must be one of: A, B, C' })
  name: Section;


  @IsString()
  @IsNotEmpty()
  @IsUUID()
  courseId: string;
}

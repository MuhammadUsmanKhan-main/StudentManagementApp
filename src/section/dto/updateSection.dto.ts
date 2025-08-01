import {
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SectionEntity } from "../entities/section.entity";
import { Section } from "src/common/enums/section.enum";


export class UpdateSectionDto {
  @ApiProperty({ enum: Section, required: false })
  @IsOptional()
  @IsEnum(Section, { message: 'name must be one of: A, B, C' })
  name?: Section;

  @IsUUID()
  @IsOptional()
  courseId?: string;
}

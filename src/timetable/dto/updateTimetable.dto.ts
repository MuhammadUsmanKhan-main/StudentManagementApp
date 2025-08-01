import { PartialType } from '@nestjs/swagger';
import { CreateTimetableDto } from './createTimetable.dto';

export class UpdateTimetableDto extends PartialType(CreateTimetableDto) {}

import { SectionEntity } from "../entities/section.entity";
import { Section } from "src/common/enums/section.enum";
export declare class CreateSectionDto extends SectionEntity {
    name: Section;
    courseId: string;
}

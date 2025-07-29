import { $Enums, Section} from "@prisma/client";

export class SectionEntity implements Section {
    id: string;
    name: $Enums.section;
    courseId: string;
    createdAt: Date;
    updatedAt: Date;
} 




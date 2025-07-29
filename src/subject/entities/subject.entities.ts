import { Subject } from "@prisma/client";

export class SubjectEntity implements Subject {
    id: string;
    name: string;
    code: string;
    courseId: string;
    createdAt: Date;
    updatedAt: Date;

} 




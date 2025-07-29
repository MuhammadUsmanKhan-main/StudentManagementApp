import { Subject } from "@prisma/client";
export declare class SubjectEntity implements Subject {
    id: string;
    name: string;
    code: string;
    courseId: string;
    createdAt: Date;
    updatedAt: Date;
}

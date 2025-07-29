import { Homework } from "@prisma/client";
export declare class HomeworkEntity implements Homework {
    id: string;
    title: string;
    description: string;
    subjectId: string;
    assignedById: string;
    studentId: string;
    assignedAt: Date;
    dueDate: Date;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

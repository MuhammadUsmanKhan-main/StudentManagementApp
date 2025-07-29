import { Homework, Subject } from "@prisma/client";

export class HomeworkEntity implements Homework {
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




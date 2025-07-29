import { HomeworkEntity } from "../entities/homework.entities";
export declare class HomworkDto extends HomeworkEntity {
    title: string;
    description: string;
    dueDate: Date;
    assignedAt: Date;
    assignedById: string;
    status: boolean;
    studentId: string;
    subjectId: string;
}

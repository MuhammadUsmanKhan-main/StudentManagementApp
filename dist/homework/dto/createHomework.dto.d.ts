import { HomeworkEntity } from "../entities/homework.entities";
export declare class CreateHomeworkDto extends HomeworkEntity {
    title: string;
    description: string;
    assignedAt: Date;
    assignedById: string;
    dueDate: Date;
    status: boolean;
    subjectId: string;
    sectionId: string;
}

import { HomeworkService } from "./homework.service";
import { CreateHomeworkDto } from "./dto/createHomework.dto";
export declare class HomeworkController {
    private readonly homeworkService;
    constructor(homeworkService: HomeworkService);
    createHomework(createHomeworkDto: CreateHomeworkDto): Promise<{
        message: string;
        createdHomeworks: {
            id: string;
            title: string;
            description: string | null;
            subjectId: string;
            assignedById: string;
            studentId: string;
            assignedAt: Date;
            dueDate: Date | null;
            status: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}

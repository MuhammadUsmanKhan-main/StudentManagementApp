import { SubjectService } from "./subject.service";
import { CreateSubjectDto } from "./dto/createSubject.dto";
export declare class SubjectController {
    private readonly subjectService;
    constructor(subjectService: SubjectService);
    createCourse(createSubjectDto: CreateSubjectDto): Promise<{
        message: string;
    }>;
}

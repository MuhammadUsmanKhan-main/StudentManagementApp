import { SubjectService } from "./subject.service";
import { CreateSubjectDto } from "./dto/createSubject.dto";
import { UpdateSubjectDto } from "./dto/updateSubject.dto";
export declare class SubjectController {
    private readonly subjectService;
    constructor(subjectService: SubjectService);
    createCourse(createSubjectDto: CreateSubjectDto): Promise<{
        message: string;
    }>;
    getAllSubjects(): Promise<({
        course: {
            grade: number;
        };
    } & {
        id: string;
        name: string;
        code: string | null;
        courseId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getSubjectById(id: string): Promise<{
        course: {
            grade: number;
        };
    } & {
        id: string;
        name: string;
        code: string | null;
        courseId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateSubject(id: string, updateSubjectDto: UpdateSubjectDto): Promise<{
        message: string;
    }>;
    deleteSubject(id: string): Promise<{
        message: string;
    }>;
}

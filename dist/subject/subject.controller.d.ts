import { SubjectService } from "./subject.service";
export declare class SubjectController {
    private readonly subjectService;
    constructor(subjectService: SubjectService);
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
}

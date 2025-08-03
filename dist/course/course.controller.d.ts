import { CourseService } from "./course.service";
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    getAllCourses(): Promise<{
        id: string;
        name: string;
        grade: number;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getCourseById(id: string): Promise<{
        id: string;
        name: string;
        grade: number;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

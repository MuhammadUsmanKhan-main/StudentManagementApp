import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/createCourse.dto";
import { UpdateCourseDto } from "./dto/updateCourse.dto";
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    createCourse(createCourseDto: CreateCourseDto): Promise<{
        message: string;
    }>;
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
    updateCourse(id: string, updateCourseDto: UpdateCourseDto): Promise<{
        id: string;
        name: string;
        grade: number;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteCourse(id: string): Promise<{
        message: string;
    }>;
}

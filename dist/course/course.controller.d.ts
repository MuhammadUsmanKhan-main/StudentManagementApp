import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/createCourse.dto";
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    createCourse(createCourseDto: CreateCourseDto): Promise<{
        message: string;
    }>;
}

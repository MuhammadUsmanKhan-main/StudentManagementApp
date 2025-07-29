import { CourseEntity } from "../entities/course.entity";
export declare class CreateCourseDto extends CourseEntity {
    name: string;
    grade: number;
    description: string;
}

import { Course } from "@prisma/client";
export declare class CourseEntity implements Course {
    id: string;
    name: string;
    grade: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

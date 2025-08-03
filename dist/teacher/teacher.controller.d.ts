import { TeacherService } from "./teacher.service";
export declare class TeacherController {
    private readonly teacherService;
    constructor(teacherService: TeacherService);
    getAllTeachers(): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
        adminId: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getTeacherById(id: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
        adminId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

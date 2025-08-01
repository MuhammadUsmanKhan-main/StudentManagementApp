import { TeacherService } from "./teacher.service";
import { UpdateTeacherDto } from "./dto/updateTeacher.dto";
export declare class TeacherController {
    private readonly teacherService;
    constructor(teacherService: TeacherService);
    getAll(): Promise<{
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
    getOne(id: string): Promise<{
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
    update(id: string, updateDto: UpdateTeacherDto): Promise<import("./dto/teacher.dto").TeacherDto>;
    remove(id: string): Promise<{
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

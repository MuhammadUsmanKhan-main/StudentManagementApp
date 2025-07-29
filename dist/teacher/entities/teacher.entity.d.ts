import { Teacher } from "@prisma/client";
export declare class TeacherEntity implements Teacher {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    adminId: string;
    createdAt: Date;
    updatedAt: Date;
}

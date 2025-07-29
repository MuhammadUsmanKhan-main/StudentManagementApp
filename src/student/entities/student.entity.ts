import { Student } from "@prisma/client";

export class StudentEntity implements Student {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    rollNumber: string;
    courseId: string;
    sectionId: string;
    adminId: string;
    createdAt: Date;
    updatedAt: Date;
}

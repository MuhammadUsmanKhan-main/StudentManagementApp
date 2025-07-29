import { Teacher } from "@prisma/client";

export class TeacherEntity implements Teacher {
    id: string;
    firstName: string;
    lastName: string;
    phone:string;
    email: string;
    password: string;
    adminId: string;
    createdAt: Date;
    updatedAt: Date;
  
}

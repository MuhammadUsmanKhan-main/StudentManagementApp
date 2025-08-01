import { StudentEntity } from "../entities/student.entity";
export declare class CreateStudentDto extends StudentEntity {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    rollNumber: string;
    courseId: string;
    sectionId: string;
    password: string;
}

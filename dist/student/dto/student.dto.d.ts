import { StudentEntity } from "../entities/student.entity";
declare const StudentDto_base: import("@nestjs/mapped-types").MappedType<Omit<StudentEntity, "password">>;
export declare class StudentDto extends StudentDto_base {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    section: {
        name: string;
    };
    course: {
        class: number;
    };
}
export {};

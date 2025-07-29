import { TeacherEntity } from "../entities/teacher.entity";
declare const TeacherDto_base: import("@nestjs/mapped-types").MappedType<Omit<TeacherEntity, "password">>;
export declare class TeacherDto extends TeacherDto_base {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}
export {};

import { SubjectEntity } from "../entities/subject.entities";
export declare class CreateSubjectDto extends SubjectEntity {
    name: string;
    code: string;
    courseId: string;
}

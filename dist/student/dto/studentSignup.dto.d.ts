export declare class StudentSignUpDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    rollNumber: string;
    createdAt: Date;
    updatedAt: Date;
    password: string;
    section: {
        name: string;
    };
    course: {
        class: number;
    };
}

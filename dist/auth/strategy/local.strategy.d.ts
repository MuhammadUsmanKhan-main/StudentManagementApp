import { UserService } from "src/user/user.service";
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private userService;
    constructor(userService: UserService);
    validate(req: Request, email: string, password: string): Promise<any>;
}
export {};

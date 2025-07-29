import { UserService } from "src/user/user.service";
import { Response } from "express";
import { AdminService } from "src/admin/admin.service";
export declare class AuthController {
    private readonly userService;
    private readonly adminService;
    constructor(userService: UserService, adminService: AdminService);
    signin(request: any, res: Response): Promise<any>;
    logout(res: Response): Promise<boolean>;
}

import { ConfigService } from '@nestjs/config';
import { AccessTokenPayload } from '../types/AccessTokenPayload';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(payload: AccessTokenPayload): Promise<AccessTokenPayload>;
}
export {};

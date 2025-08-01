import { AuthCreateDto } from './dto/auth.create.dto';
import { AuthUpdateDto } from './dto/auth.update.dto';
export declare class AuthService {
    create(authCreateDto: AuthCreateDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, authUpdateDto: AuthUpdateDto): string;
    remove(id: number): string;
}

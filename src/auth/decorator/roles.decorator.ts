// src/auth/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

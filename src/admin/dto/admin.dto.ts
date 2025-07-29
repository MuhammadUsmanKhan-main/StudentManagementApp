import { Exclude, Expose } from "class-transformer";
import { OmitType } from "@nestjs/mapped-types";
// import { UserEntity } from '../entities/user.entity';
import { AdminEntity } from "../entities/admin.entity";

@Exclude()
export class AdminDto extends OmitType(AdminEntity, ["password"]) {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  createdAt: Date;
  
  @Expose()
  updatedAt: Date;
}

import { Admin } from "@prisma/client";

export class AdminEntity implements Admin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

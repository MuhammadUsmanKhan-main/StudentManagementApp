import { OmitType } from "@nestjs/mapped-types";
import { Exclude, Expose } from "class-transformer";
// import { Section } from "src/common/enums/role.enum";

@Exclude()
export class SectionDto  {
// name: $Enums.section;
  @Expose()
  message: string;

}

import { IsNotEmpty } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty()
    readonly name!: string;
}


export class UpdateRoleDto {
  @IsNotEmpty()
  readonly name!: string;
}

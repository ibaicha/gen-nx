import { IsNotEmpty } from "class-validator";

export class CreateTypeOpDto {
    @IsNotEmpty()
  readonly name!: string;
}
export class UpdateTypeOpDto {
  @IsNotEmpty()
  readonly name!: string;
}

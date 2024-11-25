import { IsNotEmpty } from "class-validator";

export class CreateFiliereDto {
    @IsNotEmpty()
  readonly name!: string;
}
export class UpdateFiliereDto {
  @IsNotEmpty()
  readonly name!: string;
}

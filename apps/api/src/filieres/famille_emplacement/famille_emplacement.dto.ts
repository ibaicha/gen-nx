import { IsNotEmpty } from "class-validator";

export class CreateFamilleEmplacementDto {
    @IsNotEmpty()
  readonly name!: string;
}


export class UpdateFamilleEmplacementDto {
  @IsNotEmpty()
  readonly name!: string;
}

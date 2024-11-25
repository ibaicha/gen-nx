import { IsNotEmpty } from "class-validator";

export class CreateLocaliteDto {
    @IsNotEmpty()
  readonly name!: string;
    @IsNotEmpty()
  readonly sousZoneId!: number;
}


export class UpdateLocaliteDto {
  @IsNotEmpty()
  readonly name!: string;
  @IsNotEmpty()
  readonly sousZoneId!: number;
}

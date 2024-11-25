import { IsNotEmpty } from "class-validator";

export class CreateVillageDto {
    @IsNotEmpty()
  readonly name!: string;
    @IsNotEmpty()
  readonly localiteId!: number;
    readonly communeId!: number;
}

export class UpdateVillageDto {
  @IsNotEmpty()
  readonly name!: string;
  @IsNotEmpty()
  readonly localiteId!: number;
  readonly communeId!: number;
}

import { IsNotEmpty } from "class-validator";

export class CreatePaysDto {
    @IsNotEmpty()
  readonly name!: string;
    readonly sigle!: string;
}

export class UpdatePaysDto {
  @IsNotEmpty()
  readonly name!: string;
  readonly sigle!: string;
}

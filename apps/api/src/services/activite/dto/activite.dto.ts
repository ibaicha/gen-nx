import { IsNotEmpty } from 'class-validator';

export class CreateActiviteDto {
  @IsNotEmpty()
  readonly name!: string;
}

export class UpdateActiviteDto {
  @IsNotEmpty()
  readonly name!: string;
}

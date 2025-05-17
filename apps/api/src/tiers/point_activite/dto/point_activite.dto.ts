import { IsNotEmpty } from 'class-validator';

export class CreatePointActiviteDto {
  @IsNotEmpty()
  readonly name!: string;
  @IsNotEmpty()
  readonly pointId!: number;
  @IsNotEmpty()
  readonly activiteId!: number;
}

export class UpdatePointActiviteDto {
  @IsNotEmpty()
  readonly name!: string;
  @IsNotEmpty()
  readonly pointId!: number;
  @IsNotEmpty()
  readonly activiteId!: number;
}

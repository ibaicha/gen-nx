import { IsNotEmpty } from 'class-validator';

export class CreateTypeServiceDto {
  @IsNotEmpty()
  readonly name!: string;
  @IsNotEmpty()
  readonly familleTypeServiceId!: number;
}

export class UpdateTypeServiceDto {
  @IsNotEmpty()
  readonly name!: string;
  @IsNotEmpty()
  readonly familleTypeServiceId!: number;
}

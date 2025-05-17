import { IsNotEmpty } from 'class-validator';

export class CreateFamilleTypeServiceDto {
  @IsNotEmpty()
  readonly name!: string;
  @IsNotEmpty()
  readonly activiteId!: number;
}

export class UpdateFamilleTypeServiceDto {
  @IsNotEmpty()
  readonly name!: string;
  @IsNotEmpty()
  readonly activiteId!: number;
}

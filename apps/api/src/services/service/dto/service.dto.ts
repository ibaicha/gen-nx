import { IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  readonly name!: string;
  @IsNotEmpty()
  readonly typeServiceId!: number;
  @IsNotEmpty()
  readonly activiteId!: number;
}

export class UpdateServiceDto {
  @IsNotEmpty()
  readonly name!: string
  @IsNotEmpty()
  readonly typeServiceId!: number
  @IsNotEmpty()
  readonly activiteId!: number
}

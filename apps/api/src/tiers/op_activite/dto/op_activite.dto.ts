import { IsNotEmpty } from 'class-validator'

export class CreateOpActiviteDto {
  @IsNotEmpty()
  readonly opId!: number
  @IsNotEmpty()
  readonly activiteId!: number
}

export class UpdateOpActiviteDto {
  @IsNotEmpty()
  readonly opId!: number
  @IsNotEmpty()
  readonly activiteId!: number
}

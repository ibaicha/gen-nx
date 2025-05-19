import { IsNotEmpty } from 'class-validator'

export class CreateProducteurDto {
  @IsNotEmpty()
  readonly compte!: number
  readonly prenom!: string
  readonly nom!: string
  readonly cni!: string
  readonly email!: string
  readonly telephone!: string
  readonly adresse!: string
  readonly latitude!: number
  readonly longitude!: number
  readonly isActive!: boolean
  @IsNotEmpty()
  genreId!: number
  @IsNotEmpty()
  localiteId!: number
}

export class UpdateProducteurDto {
  @IsNotEmpty()
  readonly compte!: number
  readonly prenom!: string
  readonly nom!: string
  readonly cni!: string
  readonly email!: string
  readonly telephone!: string
  readonly adresse!: string
  readonly latitude!: number
  readonly longitude!: number
  readonly isActive!: boolean
  @IsNotEmpty()
  genreId!: number
  @IsNotEmpty()
  localiteId!: number
}

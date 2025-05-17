import { IsNotEmpty } from 'class-validator';

export class CreateSocieteDto {
  @IsNotEmpty()
  readonly name!: string;
  readonly sigle!: string;
  readonly email!: string;
  readonly telephone!: string;
  readonly adresse!: string;
  readonly latitude!: number;
  readonly longitude!: number;
  readonly prenomContact!: string;
  readonly nomContact!: string;
  readonly emailContact!: string;
  readonly telephoneContact!: string;

  @IsNotEmpty()
  formeJuridiqueId!: number;
  @IsNotEmpty()
  typeSocieteId!: number;
}

export class UpdateSocieteDto {
  @IsNotEmpty()
  readonly name!: string;
  readonly sigle!: string;
  readonly email!: string;
  readonly telephone!: string;
  readonly adresse!: string;
  readonly latitude!: number;
  readonly longitude!: number;
  readonly prenomContact!: string;
  readonly nomContact!: string;
  readonly emailContact!: string;
  readonly telephoneContact!: string;

  @IsNotEmpty()
  formeJuridiqueId!: number;
  @IsNotEmpty()
  typeSocieteId!: number;
}

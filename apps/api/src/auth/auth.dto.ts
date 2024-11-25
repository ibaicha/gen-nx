import { IsEmail, IsNotEmpty } from "class-validator";

export class DeleteAccountdto{
    @IsNotEmpty()
    readonly password!: string;
}

export class ResetPasswordConfirmationDto {
    @IsEmail()
    readonly email!: string;
    @IsNotEmpty()
    readonly password!: string;
    @IsNotEmpty()
    readonly code!: string;

}

export class ResetPasswordDemandDto {
    @IsEmail()
    readonly email!: string;

}

export class signinDto {
    @IsEmail()
    readonly email!: string;
    @IsNotEmpty()
    readonly password!: string;
    readonly roleId!: number;
  
}
export class signupDto {
    @IsNotEmpty()
    readonly username!: string;
    @IsNotEmpty()
    @IsEmail()
    readonly email!: string;
    @IsNotEmpty()
    readonly password!: string;
    readonly roleId!: number;
    
}
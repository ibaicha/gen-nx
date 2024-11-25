import { Controller,Get,Post,Delete } from '@nestjs/common';
import { Body, Req, UseGuards} from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';


import { Request } from 'express';

import { ApiTags } from '@nestjs/swagger';
import { DeleteAccountdto, ResetPasswordConfirmationDto, ResetPasswordDemandDto, signinDto, signupDto } from './auth.dto';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get("users")
    getAll() {
        return this.authService.getAll();
    }



    @Post("signup")
    signup(@Body() signupDto: signupDto) {
        return this.authService.signup(signupDto);
    }

    @Post("signin")
    signin(@Body() signinDto: signinDto) {
        return this.authService.signin(signinDto);
    }

    @Post("reset-password")
    resetPasswordDemand(@Body() resetPasswordDemandDto: ResetPasswordDemandDto) {
        return this.authService.resetPasswordDemandDto(resetPasswordDemandDto);
    }

    @Post("reset-password-confirmation")
    resetPasswordConfirmation(@Body() resetPasswordConfirmationDto: ResetPasswordConfirmationDto) {
        return this.authService.resetPasswordConfirmationDto(resetPasswordConfirmationDto);
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete("delete")
    deleteAccount(@Req() request : Request, @Body() deleteAccountDto : DeleteAccountdto) {
        // const userId = request.user["userId"];
        const userId = request.body.userId;
        return this.authService.deleteAccount(userId, deleteAccountDto);
    }
}

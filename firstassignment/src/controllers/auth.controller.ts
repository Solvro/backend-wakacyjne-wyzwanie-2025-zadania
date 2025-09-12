import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { LoginResponseDto } from '../Dto/login-response.dto';
import { LoginDto } from '../Dto/login.dto';
import { AuthService } from '../services/auth.service';

@ApiTags("Autoryzacja")
@Controller('budzetownik')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: "Autoryzacja"})
    @ApiResponse({status: 200,description: "Sukces",})
    @HttpCode(200)
    @Post('login')
    async signIn(@Body() signInDto: LoginDto): Promise<LoginResponseDto> {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

}
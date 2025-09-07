import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { LoginResponseDto } from 'src/Dto/login-response.dto';
import { LoginDto } from 'src/Dto/login.dto';
import { AuthService } from 'src/services/auth.service';

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
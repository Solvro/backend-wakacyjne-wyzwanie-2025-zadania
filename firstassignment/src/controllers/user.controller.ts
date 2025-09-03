import { Body, Controller, Get, NotFoundException, Param, Patch, Post, Request, UnauthorizedException, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Role } from "generated/prisma";
import { CreateUserDto } from "src/Dto/create-user-dto";
import { UpdateUserDto } from "src/Dto/update-user.dto";
import { UserMetadata } from "src/Dto/user-metadata";
import { AuthGuard } from "src/guards/auth.guard";
import { AuthService } from "src/services/auth.service";
import { UserService } from "src/services/user.service";




@ApiTags("Użytkownik")
@Controller('budzetownik')
export class UserController{

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ){}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('user/:id')
    @ApiOperation({description: "zwraca użytkownika"})
    @ApiResponse({ status: 200, description: "Sukces!"})
    async getUser(@Param('id') id: string){
        return this.userService.userById(Number.parseInt(id));
    }

    @Post('addUser')
    @ApiOperation({description: "Dodaje nowego użytkownika"})
    @ApiResponse({ status: 201, description: "Sukces!"})
    async addUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    @Patch('updateUser/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({description: "Dodaje nowego użytkownika"})
    @ApiResponse({ status: 201, description: "Sukces!"})
    //Nie wiem czy dobrze rozumiem, ale widzę to tak, że na froncie admin będzie mógł wybrać id użytkownika, 
    //a gdy nie ma admina to automatycznie przekazuje id osoby.
    async updateUser(@Request() request: { user: UserMetadata}, @Param('id') id: string,  @Body() newData: UpdateUserDto){
        const user = await this.userService.userByEmail(request.user.email);
        if(user === null){
            throw new NotFoundException(`Użytkownik z emailem: ${request.user.email} nie istnieje`);
        }
        if(user.id !== Number.parseInt(id) && user.role !== Role.ADMIN){
            throw new UnauthorizedException('Nie masz praw do zmiany danych tego użytkownika');
        }
        const parameters = {id: Number.parseInt(id), newData}
        return this.userService.updateUser(parameters);
    }

} 
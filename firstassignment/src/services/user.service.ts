import { HttpException, Injectable, NotFoundException} from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Role, User } from "../../generated/prisma";
import { CreateUserDto } from "src/Dto/create-user-dto";
import { UserMetadata, userToMetadata } from "src/Dto/user-metadata";
import { hash } from "bcrypt"
import { CreateUserResponseDto } from "src/Dto/create-user-response.dto";
import { UpdateUserDto } from "src/Dto/update-user.dto";

@Injectable()
export class UserService{
    constructor(private prisma: PrismaService){}

    async userById(id: number){
        return this.prisma.user.findUnique({where: {id}});
    }

    async userByEmail(email: string){
        return this.prisma.user.findUnique({where: {email}});
    }

    async allUsers(): Promise<User[]>{
        return this.prisma.user.findMany();
    }

    async findMetadataOrFail(email: string): Promise<UserMetadata> {
        const user = await this.userByEmail(email);
        if(user === null){
           throw new HttpException(`User not found`, 404);
        }
        else{
            return userToMetadata(user);
        }
    }

    async createUser(data: CreateUserDto): Promise<CreateUserResponseDto>{
        const emailUser = await this.userByEmail(data.email);
        if(emailUser === null){

            const password = await hash(data.password,10);
            await this.prisma.user.create({
                data: {
                    username: data.username,
                    email: data.email,
                    password,
                    role: Role.USER,
                },
            })
            return {username: data.username, email: data.email} 
        }
        else{
            throw new HttpException(`Account with ${data.email} already exists`, 409);
        }
        
    }

    async updateUser(parameters:{
        id: number;
        newData: UpdateUserDto;
    }){
        const { id, newData } = parameters;
        const user = await this.userById(id);
        if(user === null){
            throw new NotFoundException(`Wydatek z ID ${id.toString()} nie istnieje`);
        }
        else{
            return this.prisma.user.update({
                data: newData,
                where: {id},
            })
        }
    }
}
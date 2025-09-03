import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { LoginResponseDto } from "src/Dto/login-response.dto";
import { UserMetadata } from "src/Dto/user-metadata";
import { compare } from "bcrypt"

@Injectable()
export class AuthService{
    private readonly tokenPrefix = 'token';
    private readonly EXPIRY_TIME_MS = 1000 * 60 * 5;
    private readonly TOKENSEPARATOR = "_";
    private readonly TOKEN = 0;
    private readonly EMAIL = 1;
    private readonly TIMESTAMP = 2;

    constructor(private userService: UserService){}

    async validateToken(token: string): Promise<UserMetadata>{
        if(token.startsWith(this.tokenPrefix)){
            const tokenArray = token.split(this.TOKENSEPARATOR);
            const user = await this.userService.findMetadataOrFail(tokenArray[this.EMAIL])
            const isCurrent = Date.now() - Number.parseInt(tokenArray[this.TIMESTAMP]) < this.EXPIRY_TIME_MS;
            return isCurrent ? user : (await Promise.reject(new Error("Token wygasł")));
        }
        else{
            return await Promise.reject(new Error("Niewłaściwy token"))
        }  
    }


    generateToken(email: string): string{
        const time = Date.now();
        return [this.tokenPrefix,email,time].join(this.TOKENSEPARATOR);
    }

    async signIn(email: string, password: string): Promise<LoginResponseDto>{
        const user = await this.userService.userByEmail(email);
         
        if(user === null){
            throw new NotFoundException();
        }
        else{
            // nie wiem czemu w innym projekcie działało
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            const samePassword:boolean = await compare(password, user.password).catch(() => false);
            if(samePassword){
                return {token: this.generateToken(user.email)}
            }else{
                throw new UnauthorizedException();
            }
        }
        
    }
}
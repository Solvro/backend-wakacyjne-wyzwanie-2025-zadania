import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class CustomTokenGuard extends AuthGuard("custom-token") {}

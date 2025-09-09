import { 
  Controller, 
  Get, 
  Patch,
  Body,
  Param, 
  NotFoundException,
  UseGuards,
  ForbiddenException,
  Request 
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { User, Role } from "@prisma/client";
import { UserMetadata } from "./dto/user-metadata";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  private checkUserAccess(currentUser: User, targetEmail: string): void {
    const isOwnData = currentUser.email === targetEmail;
    const isAdmin = currentUser.role === Role.ADMIN;
    
    if (!isOwnData && !isAdmin) {
      throw new ForbiddenException("You can only access your own data");
    }
  }

  @UseGuards(AuthGuard)
  @Get(":email")
  @ApiOperation({ 
    summary: "Find user by email",
    description: "Users can view their own data. Administrators can view any user's data."
  })
  @ApiResponse({ status: 200, description: "User found" })
  @ApiResponse({ status: 403, description: "Forbidden - can only view own data" })
  @ApiResponse({ status: 404, description: "User not found" })
  async findOne(
    @Param("email") email: string,
    @Request() req: any
  ): Promise<User> {
    this.checkUserAccess(req.user, email);

    const user = await this.userService.findOne(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  @UseGuards(AuthGuard)
  @Get(":email/metadata")
  @ApiOperation({ 
    summary: "Find user metadata by email",
    description: "Users can view their own metadata. Administrators can view any user's metadata."
  })
  @ApiResponse({ status: 200, description: "User metadata found" })
  @ApiResponse({ status: 403, description: "Forbidden - can only view own data" })
  @ApiResponse({ status: 404, description: "User not found" })
  async findMetadata(
    @Param("email") email: string,
    @Request() req: any
  ): Promise<UserMetadata> {
    this.checkUserAccess(req.user, email);

    return this.userService.findMetadataOrFail(email);
  }

  @UseGuards(AuthGuard)
  @Patch(":email")
  @ApiOperation({ 
    summary: "Update user data",
    description: "Users can update their own data. Administrators can update any user's data."
  })
  @ApiResponse({ status: 200, description: "User updated successfully" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "User not found" })
  async update(
    @Param("email") email: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: any
  ): Promise<User> {
    const currentUser = req.user;

    this.checkUserAccess(currentUser, email);

    if (updateUserDto.role && currentUser.role !== Role.ADMIN) {
      throw new ForbiddenException("Only administrators can modify user roles");
    }

    return this.userService.update(email, updateUserDto);
  }
}

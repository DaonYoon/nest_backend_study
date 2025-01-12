import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUser } from './get-current-user';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}


    @Post("/signup")
    signUp(@Body(ValidationPipe) CreateUserDto: CreateUserDto): Promise<User> {

        return this.authService.signUp(CreateUserDto)
    }


    @Post("/signin")
    signIn(@Body(ValidationPipe) CreateUserDto: CreateUserDto): Promise<{accessToken: string}> {

        return this.authService.signIn(CreateUserDto)
    }

    @Get("/current_user")
    @UseGuards(AuthGuard()) // req 
    currentUser(@GetCurrentUser() user: User) {
        console.log("req", user)
    }

}

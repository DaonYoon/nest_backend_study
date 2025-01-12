import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository,private jwtService: JwtService) { }


    async signUp(dto: CreateUserDto): Promise<User> {

        return this.userRepository.createUserHandler(dto)
    }

    async signIn(dto: CreateUserDto): Promise<{accessToken: string}> {

        const { username, password } = dto

        const user = await this.userRepository.findOneBy({ username })

        if (user && (await bcrypt.compare(password, user.password))) {
            //token create
            const payload = {
                username
            }
            const accessToken = await this.jwtService.sign(payload)

            return {accessToken}
        } else {
            throw new UnauthorizedException('login failed')
        }


    }

}

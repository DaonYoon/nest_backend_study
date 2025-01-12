import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userRepo: UserRepository) {
        super({secretOrKey: "secret", jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()})
    }

    async validate(payload) {
        const { username} = payload;
        const user: User = await this.userRepo.findOneBy({username})

        if(!user) {
            throw new UnauthorizedException();
        } else {
            return user
        }
    }
}
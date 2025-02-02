import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { Passport } from 'passport';

@Module({imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
  secret: "secret",
  signOptions: {
    expiresIn: 3600
  }
}), 
PassportModule.register({
  defaultStrategy: 'jwt'
})],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
  exports: [UserRepository, JwtStrategy, PassportModule],
})
export class AuthModule {}

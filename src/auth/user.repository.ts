import { DataSource, Repository } from 'typeorm';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

 

  async createUserHandler(dto: CreateUserDto): Promise<User> {
    const { username, password } = dto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
 
    const user = this.create({
        username,
        password: hashedPassword
    });

    try {
        
        await this.save(user);
        return user;
    } catch (error) {
    if(error.code === '23505') throw new ConflictException("Existing username")
     else {
        throw new InternalServerErrorException()}
    }
  }

}

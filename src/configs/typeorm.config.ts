import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { Board } from "src/boards/board.entity";

export const typeORMConfig: TypeOrmModuleOptions = { 
    //DB
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'yundaon',
    password: 'admin',
    database: 'practice',
    entities: [__dirname + "../**/*.entity.{js.ts}", Board, User],
    synchronize: true
}
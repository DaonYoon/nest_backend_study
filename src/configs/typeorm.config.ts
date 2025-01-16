import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { Board } from "src/boards/board.entity";




export const typeORMConfig: TypeOrmModuleOptions = { 
    //DB
    type: 'postgres',
    host: 'localhost',
    port: +process.env.DB_PORT || 5433,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "admin",
    database: 'practice',
    entities: [__dirname + "../**/*.entity.{js.ts}", Board, User],
    synchronize: true
}
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Board } from "src/boards/board.entity";

export const typeORMConfig: TypeOrmModuleOptions = { 
    //DB
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'yundaon',
    password: 'admin',
    database: 'practice',
    entities: [__dirname + "../**/*.entity.{js.ts}", Board],
    synchronize: true
}
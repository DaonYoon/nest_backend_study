import { IsNotEmpty, IsString, Matches, MaxLength, MinLength} from 'class-validator'

export class CreateUserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: "password only accepts english and number"
    })
    password: string;
}
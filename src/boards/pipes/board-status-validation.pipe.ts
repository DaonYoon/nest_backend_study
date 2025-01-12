import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board.status.enum";

export class BoardStatusValidationPipe implements PipeTransform {
readonly StatusOtpion = [
    BoardStatus.PRIVATE,
    BoardStatus.PUBLIC

]


    transform(value: any, metadata: ArgumentMetadata) {

        value = value.toUpperCase();

        if(!this.isStatusVAlid(value)) {
            throw new BadRequestException(`${value} isn't in the status option`)
        }

        console.log(value, metadata)

        return value
    }

    private isStatusVAlid(status: any) {
        const index = this.StatusOtpion.indexOf(status)

        return index !== -1
    }
}
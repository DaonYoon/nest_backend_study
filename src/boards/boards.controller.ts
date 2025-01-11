import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService ) {

      
       
    }

    @Get('/')
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoards()
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board {
        return this.boardsService.getBoardByiD(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body()  CreateBoardDto: CreateBoardDto) {
        return this.boardsService.createBoard(CreateBoardDto)
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: string): void {
        return this.boardsService.deleteBoardById(id)
    }


    @Patch('/:id/status')
    updateBoardStatus(@Param('id') id: string, @Body('status', BoardStatusValidationPipe) status: BoardStatus): Board {
        return this.boardsService.updateBoardByID(id, status)
    }
}

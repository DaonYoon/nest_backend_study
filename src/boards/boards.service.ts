import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid'
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards
    }

    createBoard(CreateBoardDto: CreateBoardDto) {
        const board = {
            id: uuid(),
            title: CreateBoardDto.title,
            description: CreateBoardDto.description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board)
        return board
    }

    getBoardByiD(id: string): Board {

        const find = this.boards.find((board) => board.id = id)

        if (!find) throw new NotFoundException(`Can't find ${id} board`)
        return find
    }

    deleteBoardById(id: string): void {
        const found = this.getBoardByiD(id)

        
        this.boards = this.boards.filter((item) => item.id !== id)
    }

    updateBoardByID(id: string, status: BoardStatus): Board {
        const board = this.getBoardByiD(id)

        board.status = status

        return board
    }
}

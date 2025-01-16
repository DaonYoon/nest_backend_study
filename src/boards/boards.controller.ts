import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board.status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUser } from 'src/auth/get-current-user';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger();
  constructor(private boardsService: BoardsService) {}

  // @Get('/')
  // getAllBoard(): Board[] {
  //     return this.boardsService.getAllBoards()
  // }

  @Get('/')
  getAllBoard(@GetCurrentUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} request`);
    return this.boardsService.getAllBoards(user);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() CreateBoardDto: CreateBoardDto,
    @GetCurrentUser() user: User,
  ): Promise<Board> {
    return this.boardsService.createBoard(CreateBoardDto, user);
  }

  @Delete('/:id')
  deleteBoard(
    @GetCurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): void {
    this.boardsService.deleteBoard(id, user);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}

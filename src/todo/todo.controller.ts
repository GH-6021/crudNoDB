import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { TodoResponseDto } from './ResponseDTO';
import { TodoRequestDto } from './RequestDTO';
import { TodoService } from './todo.service';


@Controller('todo')
export class TodoController {
    private todoService:TodoService;
    constructor(todoService:TodoService){
        this.todoService = todoService;
    }

    @Post('push')
    create(@Body() todoRequestDto: TodoRequestDto): TodoResponseDto {
        return this.todoService.create(todoRequestDto);
    }

    @Get()
    findAll(): TodoResponseDto[] {
        return this.todoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) uid: number): TodoResponseDto {
        return this.todoService.findOne(uid);
    }
    /**
     * Param은 기본적으로 문자열로 값을 가져오기에 
     * ParseIntPipe를 이용해 숫자로 변환시켜준다.
     */

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) uid: number, 
        @Body() updateTodo: Partial<TodoRequestDto>
    ): TodoResponseDto{
        return this.todoService.update(uid, updateTodo);
    }
    //Partial을 이용해 전체data가 아니라 일부data 전달해도 된다.

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) uid:number){
        this.todoService.delete(uid);
    }
}

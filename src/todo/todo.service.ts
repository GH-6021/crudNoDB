import { Injectable } from '@nestjs/common';
import { TodoRequestDto } from './RequestDTO';
import { TodoResponseDto } from './ResponseDTO';

@Injectable()
export class TodoService {
    private todos:TodoResponseDto[] =[];
    private idCount = 1;

    create(todoRequestDto:TodoRequestDto):TodoResponseDto{
        const newTodo:TodoResponseDto = {
            id: this.idCount,
            user: todoRequestDto.user,
            date: new Date(),
            contents: todoRequestDto.contents,
        };
        this.todos.push(newTodo);
        this.idCount++;
        return newTodo;
    }

    findAll():TodoResponseDto[]{
        return this.todos;
    }

    findOne(uid:number):TodoResponseDto{
        const todo = this.todos.find((a) => a.id === uid);
        return todo;
    }

    update(uid:number, updateTodo: Partial<TodoRequestDto>):TodoResponseDto{
        const index = this.todos.findIndex((a) => a.id === uid);
        this.todos[index] = {
            ...this.todos[index],
            ...updateTodo,
        }
        return this.todos[index];
    }

    delete(uid:number){
        const index = this.todos.findIndex((a) => a.id === uid);
        this.todos.splice(index, 1);
    }
}
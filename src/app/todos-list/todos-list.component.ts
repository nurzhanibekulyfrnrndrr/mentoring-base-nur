import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToDoApiService } from '../todos-api.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { TodosService } from '../todos.service';
import { CreateTodoComponent } from '../create-todo-form/create-todo-form-components';
export interface Todo {
  userId:number,
  id:number,
  title:string,
  completed:boolean
}


@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [NgFor,RouterOutlet,RouterLink,TodoCardComponent,AsyncPipe,CreateTodoComponent],
  templateUrl:'./todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush,

})

export class TodosListComponent {
  readonly todosApiService = inject(ToDoApiService);
  readonly todosService = inject(TodosService);
  todos:Todo[] = [];

  constructor() {
    this.todosApiService.getTodos().subscribe(
      (response:any) => {
        this.todosService.setTodos(response);
      }
    )
  }

  deleteTodo(id:number){
    this.todosService.deleteTodo(id);
  }

  public createTodo(formTodo:any){
    this.todosService.createTodo({
      id:new Date().getTime(),
      userId:formTodo.author,
      title:formTodo.text,
      completed:formTodo.isTodoFinish,
    })
  }
} 
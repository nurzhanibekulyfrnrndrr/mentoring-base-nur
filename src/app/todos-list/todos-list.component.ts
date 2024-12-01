import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToDoApiService } from '../todos-api.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { CreateTodoComponent } from '../create-todo-form/create-todo-form-components';
import { ITodo } from '../interfaces/todo.interface';
import { Store } from '@ngrx/store';
import { TodosActions } from './store/todos.actions';
import { selectTodos } from './store/todos.selectors';
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
  private readonly store = inject(Store);
  public readonly todos$ = this.store.select(selectTodos);


  constructor() {
    this.todosApiService.getTodos().subscribe(
      (response:any) => {
        this.store.dispatch(TodosActions.set({ todos:response }))
      }
    )
  }

  deleteTodo(id:number){
    this.store.dispatch(TodosActions.delete({ id }));
  }

  public createTodo(formTodo:ITodo){
    this.store.dispatch(TodosActions.create({
      todo:{
        id:new Date().getTime(),
      userId:formTodo.userId,
      title:formTodo.title,
      completed:formTodo.completed,
      }
    }))
  }
  
} 
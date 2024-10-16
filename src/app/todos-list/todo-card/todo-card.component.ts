import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [NgFor,RouterOutlet,RouterLink],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {

  @Input()
  todo:any;

  @Output()
  deleteTodo = new EventEmitter();

  onDeleteTodo(todoId:number) {
    this.deleteTodo.emit(todoId);
  }


}
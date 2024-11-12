import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ITodo } from "./interfaces/todo.interface";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: 'root' })
export class TodosService {
    todosSubject = new BehaviorSubject<ITodo[]>([]);

    public todos!: ITodo;

    setTodos(todos: ITodo[]) {
        this.todosSubject.next(todos.slice(0,10));
    }

    editTodo(editTodo: ITodo) {
        this.todosSubject.next(
            this.todosSubject.value.map((todo) => {
                return todo.id === editTodo.id ? editTodo : todo;
            })
        );
    }

    readonly snackbar = inject(MatSnackBar);

    createTodo(todo: ITodo) {
        const existingTodo = this.todosSubject.value.find(
            (currentElement) => currentElement.title === todo.title
        );

        if (existingTodo !== undefined) {
            alert('Такая задача уже имеется');
            this.snackbar.open("Ошибка при создании задачи", "Ok", {
                duration: 2000,
            });
        } else {
            alert('Задача успешно создана');
            this.todosSubject.next([...this.todosSubject.value, todo]);
            this.snackbar.open("Задача успешно создано!", "Ok", {
                duration: 3000,
            });
        }
    }

    deleteTodo(todoId: number) {
        this.todosSubject.next(
            this.todosSubject.value.filter((item) => item.id !== todoId)
        );
    }
}
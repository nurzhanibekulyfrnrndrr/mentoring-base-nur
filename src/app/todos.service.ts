import { Injectable } from "@angular/core";
import { Todo } from "./todos-list/todos-list.component";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn:'root'})

export class TodosService{
    todosSubject = new BehaviorSubject<Todo[]>([]);

    todos:Todo[]=[];

    setTodos(todos:Todo[]){
        this.todosSubject.next(todos);
    }

    editTodo(editTodo:Todo){
        this.todosSubject.next(
            this.todosSubject.value.map(
                todo =>{
                    if(todo.id === editTodo.id){
                        return editTodo
                    }
                    else{
                        return todo
                    }
                }
            )
        )

    }

    createTodo(todo:Todo){
    
        const existingTodo = this.todosSubject.value.find(
            (currentElement) => currentElement.title === todo.title
        );

        if(existingTodo !== undefined){
            alert('такая задача уже имеется ')
        }
        else{
            alert('Вы успешно зарегалсиь')
            this.todosSubject.next(
                [...this.todosSubject.value,todo]
            )
        }
    }

        
    deleteTodo(id:number){
        this.todosSubject.next(
            this.todosSubject.value.filter(
                item => {
                    if(id === item.id){
                        return false
                    }
                    else {
                        return true
                    }
                }
            )
        )

    }


}
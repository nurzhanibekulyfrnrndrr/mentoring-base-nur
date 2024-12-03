import { HttpClient } from "@angular/common/http";
import { inject, Injectable} from "@angular/core";
import { Observable } from "rxjs";
import { ITodo } from "./interfaces/todo.interface";

@Injectable({providedIn:'root'})
export class ToDoApiService {

    readonly apiService = inject(HttpClient);

    getTodos():Observable< ITodo[] > {
        return this.apiService.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos')
    }

}
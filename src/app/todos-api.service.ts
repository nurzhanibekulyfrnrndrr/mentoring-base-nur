import { HttpClient } from "@angular/common/http";
import { inject, Injectable} from "@angular/core";

@Injectable({providedIn:'root'})
export class ToDoApiService {

    readonly apiService = inject(HttpClient);

    getTodos() {
        return this.apiService.get('https://jsonplaceholder.typicode.com/todos')
    }

}
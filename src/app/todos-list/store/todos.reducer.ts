import { createReducer ,on} from "@ngrx/store";
import { ITodo } from "../../interfaces/todo.interface";
import { TodosActions } from "./todos.actions";

const initialState: {todos:ITodo[] } = {
    todos:[],
}; 

export const todoReducer = createReducer(
    initialState,
    on(TodosActions.set, (state,payload) =>({
        ...state,
        todos:payload.todos,
    })),
      
    on(TodosActions.create, (state,payload) => ({
        ...state,
        todos:[...state.todos,payload.todo],
    })),

    on(TodosActions.edit, (state, payload) => ({
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === payload.todo.id ? payload.todo : todo
      )
    })),
    
    on(TodosActions.delete, (state,payload) => ({
        ...state,
        todos:state.todos.filter((todo) => todo.id !== payload.id)
    }))

);

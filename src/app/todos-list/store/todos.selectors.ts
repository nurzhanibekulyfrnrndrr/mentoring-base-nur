import { ITodo } from "../../interfaces/todo.interface";
import { createSelector } from "@ngrx/store";

interface TodoState{
    todos:ITodo[];
};

interface AppState{
    todos:TodoState;
}

export const selectTodosFeatures = (state:AppState) => state.todos;

export const selectTodos = createSelector(
    selectTodosFeatures,
    (state:TodoState) => state.todos
)
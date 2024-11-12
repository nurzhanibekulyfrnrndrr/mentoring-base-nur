import { NgFor } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TodosListComponent } from '../todos-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTodoDialogComponent } from '../delete-todo-dialog/delete-todo-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrunCatePipe } from '../../pipes/truncate-pipe/truncate.pipe';
import { ITodo } from '../../interfaces/todo.interface';

@Component({
    selector: 'app-todo-card',
    standalone: true,
    imports: [
        NgFor,
        RouterOutlet,
        RouterLink,
        TodosListComponent,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        TrunCatePipe
    ],
    templateUrl: './todo-card.component.html',
    styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {
    @Input() 
    public todo!: ITodo;

    @Output() deleteTodo = new EventEmitter<number>();

    readonly dialog = inject(MatDialog);
    readonly snackbar = inject(MatSnackBar);

    onDeleteTodo(todoId: number) {
        this.deleteTodo.emit(todoId);
    }

    openDeleteDialog(): void {
        const dialogRef = this.dialog.open(DeleteTodoDialogComponent, {
            data: { todo: this.todo },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.deleteTodo.emit(this.todo.id);
                this.snackbar.open("Задача успешно удалена!", "Ok", {
                    duration: 3000,
                });
            } else {
                this.snackbar.open("Удаление отменено", "", {
                    duration: 1000,
                });
            }
        });
    }
}

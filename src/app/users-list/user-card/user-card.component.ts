import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, NgModule, Output } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DeleteUserDialogComponent } from "../delete-user-dialog.component.ts/delete-user-dialog.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from "../../interfaces/user-list.interface";
import { RemoveDashesPipe } from '../../pipes/remove-dashes-pipe/remove-dashes.pipe';  
import { CommonModule } from "@angular/common";
import { RedDirective } from "../../directives/red.directive";
import { HighlightDirective } from "../../directives/highlight.directive";
import {MatTooltipModule} from '@angular/material/tooltip';


@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    standalone: true,
    imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        CommonModule,
        RemoveDashesPipe,
        RedDirective,
        HighlightDirective,
        MatTooltipModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
    @Input()
    public user!: IUser;
    
    @Output()
    deleteUser = new EventEmitter<number>();

    @Output()
    editUser = new EventEmitter<IUser>();

    readonly dialog = inject(MatDialog);
    readonly snackbar = inject(MatSnackBar);

    openEditDialog(): void {
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
            data: { user: this.user },
        });

        dialogRef.afterClosed().subscribe((editResult) => {
            if (editResult) {
                this.editUser.emit(editResult);
            }
        });
    }

    openDeleteDialog(): void {
        const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
            data: { user: this.user },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.deleteUser.emit(this.user.id);
                this.snackbar.open("Пользователь удалён!", "Ok", {
                    duration: 3000,
                });
            } else {
                this.snackbar.open("Отмена удаления", "", {
                    duration: 1000,
                });
            }
        });
    }

    onDeleteUser(userId: number) {
        this.deleteUser.emit(userId);
    }
}

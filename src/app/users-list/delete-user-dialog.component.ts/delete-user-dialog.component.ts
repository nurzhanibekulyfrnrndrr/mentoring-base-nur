import { NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { FormGroup,FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogClose} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { User } from "../users-list.component";
@Component({
    selector:'app-delete-user-dialog',
    templateUrl:'./delete-user-dialog.component.html',
    styleUrl:'./delete-user-dialog.component.scss',
    standalone:true,
    imports:[ReactiveFormsModule,NgIf,MatIconModule,MatButtonModule,MatInputModule,MatFormFieldModule,MatDialogClose,MatDialogModule],
    changeDetection:ChangeDetectionStrategy.OnPush,
})
export class DeleteUserDialogComponent{
    readonly data = inject(MAT_DIALOG_DATA);
   readonly dialogRef = inject(MatDialogRef<DeleteUserDialogComponent>)

    onNoClick(): void {
        this.dialogRef.close();
      }

}
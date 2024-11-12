    import { NgIf } from "@angular/common";
    import { Component, inject } from "@angular/core";
    import { FormGroup,FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
    import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
    import { MatInputModule } from "@angular/material/input";
    import {MatFormFieldModule} from '@angular/material/form-field';
    import {MatIconModule} from '@angular/material/icon';
    import {MatButtonModule} from '@angular/material/button';
    import { MatDialogClose} from '@angular/material/dialog';
    import { User } from "../users-list.component";
    import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


    @Component({
        selector:'app-edit-user-dialog',
        templateUrl:'./edit-user-dialog.component.html',
        styleUrl:'./edit-user-dialog.component.scss',
        imports:[ReactiveFormsModule,NgIf,MatIconModule,MatButtonModule,MatInputModule,MatFormFieldModule,MatDialogClose,MatSnackBarModule],
        standalone:true,
        
    })

    export class EditUserDialogComponent{
        readonly data = inject< {user : User} >(MAT_DIALOG_DATA);
        readonly snackbar = inject(MatSnackBar);
        readonly dialogRef = inject(MatDialogRef<EditUserDialogComponent>);
        public form = new FormGroup({
            name: new FormControl(this.data.user.name,[Validators.required,Validators.minLength(2)]),
            email: new FormControl(this.data.user.email,[Validators.required,Validators.email]),
            website: new FormControl(this.data.user.website,[Validators.required,Validators.minLength(3)]),
            phone: new FormControl(this.data.user.phone,[Validators.required,Validators.minLength(3)]),
            company : new FormGroup({
                name:new FormControl(this.data.user.company.name,[Validators.required,Validators.minLength(2)]),
            })
        });
        
        get userWithUpdatedFields(){
            return{
                ...this.form.value,
                id: this.data.user.id,
            }
        };

        public submitForm() {
            
                this.dialogRef.close(this.userWithUpdatedFields); 
                this.snackbar.open("Данные пользователя успешно обновлены!", "ОК", { duration: 3000 });
            }  
}   
import { Component, EventEmitter, Output,inject} from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector:'app-create-user-form',
    templateUrl:'./create-user-form.html',
    styleUrl:'./create-user-form.scss',
    standalone:true,
    imports:[ReactiveFormsModule,MatInputModule,MatFormFieldModule,MatButtonModule,MatIconModule,MatSnackBarModule]
})
export class CreateUserComponent {
    @Output()
    createUser = new EventEmitter();

    public form = new FormGroup({
        name: new FormControl('',[Validators.required,Validators.minLength(2)]),
        email: new FormControl('',[Validators.required,Validators.email]),
        website: new FormControl('',[Validators.required,Validators.minLength(3)]),
        company: new FormGroup({
        name:new FormControl('',[Validators.required,Validators.minLength(2)]),
            
        })
    })


    public submitForm(): void {
        this.createUser.emit(this.form.value);
        this.form.reset();
    }
    
    

}  


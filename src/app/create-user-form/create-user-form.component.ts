import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
@Component({
    selector:'app-create-user-form',
    templateUrl:'./create-user-form.html',
    styleUrl:'./create-user-form.scss',
    standalone:true,
    imports:[ReactiveFormsModule,MatInputModule,MatFormFieldModule,MatButtonModule,MatIconModule]
})
export class CreateUserComponent {
    @Output()
    createUser = new EventEmitter();

    public form = new FormGroup({
        name: new FormControl('',[Validators.required,Validators.minLength(2)]),
        email: new FormControl('',[Validators.required,Validators.email]),
        website: new FormControl('',[Validators.required,Validators.minLength(3)]),
        companyName:new FormControl('',[Validators.required,Validators.minLength(2)]),
    })

    constructor() {

    }

    public submitForm():void {
        this.createUser.emit(this.form.value)
        this.form.reset()
    }

}  

new CreateUserComponent()
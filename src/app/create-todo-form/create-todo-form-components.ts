import { Component, EventEmitter, inject, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@Component({
    selector:'app-create-todo-form',
    templateUrl:'./create-todo-form.html',
    styleUrl:'./create-todo-form.scss',
    standalone:true,
    imports:[ReactiveFormsModule,MatInputModule,MatFormFieldModule,MatButtonModule,MatIconModule]

})

export class CreateTodoComponent{
    @Output()
    createTodo = new EventEmitter();
    
public form = new FormGroup({
    text: new FormControl('',[Validators.required]),
    author: new FormControl('',[Validators.required]),
    isTodoFinish: new FormControl ('',[Validators.required,Validators.maxLength(2)])
})
    public submitForm():void{
        this.createTodo.emit(this.form.value),
        this.form.reset()
    }
    
}

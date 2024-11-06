import { inject, Injectable } from "@angular/core";
import { User } from "./users-list/users-list.component";
import { BehaviorSubject } from "rxjs";
import { IUser } from "./interfaces/user-list.interface";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({providedIn:'root'})

export class UsersService {
    usersSubject = new BehaviorSubject<IUser[]>([]);

    // users:User[]=[];   
    setUsers(users:IUser[]){

        this.usersSubject.next(users);

    }

        editUser(editedUser:IUser) {
            this.usersSubject.next(
                this.usersSubject.value.map(
                    (user) => {
                        if(user.id ===editedUser.id){
                            return editedUser
                        }
                        else {
                            return user
                        }
                    }
                )
            )
        }

        readonly snackbar = inject(MatSnackBar);

    createUser(user: IUser) {

        const existingUser = this.usersSubject.value.find(
            (currentElement) => currentElement.email === user.email
        );

        if(existingUser !== undefined){
            alert('такой эмейл уже зарегистирован')
            this.snackbar.open("Такой пользователь уже существует","Ok",{
                duration:2000,
            })
        }
        else{
            alert('Вы успешно зарегалсиь')
            this.usersSubject.next(
                [...this.usersSubject.value,user]
            )
            this.snackbar.open("Пользователь успешно создан","Ok",{
                duration:3000,
            })
            

        }
    }


    deleteUser(userId:number){
        this.usersSubject.next(
            this.usersSubject.value.filter(
                item =>{
                    if(userId === item.id){
                        return false
                    }
                    else{
                        return true;
                    }
                }
            )
        )

    }   


}
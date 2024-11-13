import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IUser } from "./interfaces/user-list.interface";

@Injectable({ providedIn: 'root' })
export class UsersService {
    private usersSubject = new BehaviorSubject<IUser[]>([]);    
    users$ = this.usersSubject.asObservable(); 


    setUsers(users: IUser[]) {
        this.usersSubject.next(users);
    }

    editUser(editedUser: IUser) {
        this.usersSubject.next(
            this.usersSubject.value.map((user) => {
                return user.id === editedUser.id ? editedUser : user;
            })
        );
    }


    createUser(user: IUser) {
        const existingUser = this.usersSubject.value.find(
            (currentElement) => currentElement.email === user.email
        );

        if (existingUser) {
            alert('Такой email уже зарегистрирован');
        } else {
            alert('Вы успешно зарегистрировались');
            this.usersSubject.next([...this.usersSubject.value, user]);
        }
    }

    deleteUser(userId: number) {
        this.usersSubject.next(
            this.usersSubject.value.filter((item) => item.id !== userId)
        );
    }
}

import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IUser } from "./interfaces/user-list.interface";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: 'root' })
export class UsersService {
    usersSubject = new BehaviorSubject<IUser[]>([]);

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

    readonly snackbar = inject(MatSnackBar);

    createUser(user: IUser) {
        const existingUser = this.usersSubject.value.find(
            (currentElement) => currentElement.email === user.email
        );

        if (existingUser) {
            alert('Такой email уже зарегистрирован');
            this.snackbar.open("Такой пользователь уже существует", "Ok", { duration: 2000 });
        } else {
            alert('Вы успешно зарегистрировались');
            this.usersSubject.next([...this.usersSubject.value, user]);
            this.snackbar.open("Пользователь успешно создан", "Ok", { duration: 3000 });
        }
    }

    deleteUser(userId: number) {
        this.usersSubject.next(
            this.usersSubject.value.filter((item) => item.id !== userId)
        );
    }
}

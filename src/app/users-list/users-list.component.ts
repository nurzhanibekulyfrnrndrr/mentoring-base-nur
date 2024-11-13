import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar"; // добавляем импорт MatSnackBar
import { UsersApiService } from "../user-api.service";
import { UsersService } from "../users.service";
import { ICreateUser, IUser } from "../interfaces/user-list.interface";
import { UserCardComponent } from "./user-card/user-card.component";
import { CreateUserComponent } from "../create-user-form/create-user-form.component";

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    standalone: true,
    imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
    readonly usersApiService = inject(UsersApiService);
    readonly usersService = inject(UsersService);
    readonly snackbar = inject(MatSnackBar); 

    constructor() {
        this.usersApiService.getUsers().subscribe(
            (response: any) => {
                this.usersService.setUsers(response);
            }
        );

        this.usersService.users$.subscribe(
            users => console.log(users)
        );
    }

    public createUser(user: ICreateUser) {
        this.usersService.users$.subscribe(users => {
            const existingUser = users.find(
                (currentElement) => currentElement.email === user.email
            );
    
            if (existingUser) {
                this.snackbar.open("Такой пользователь уже существует", "Ok", { duration: 2000 });
            } 
            else {
                this.usersService.createUser({
                    id: new Date().getTime(),
                    name: user.name,
                    email: user.email,
                    website: user.website,
                    phone: user.phone,
                    company: { name: user.company.name }
                });
                this.snackbar.open("Пользователь создан", "Ok", { duration: 2000 });
            }
        });
    }
    
    deleteUser(id: number) {
        this.usersService.deleteUser(id);
    }

    editUser(user: IUser) {
        this.usersService.editUser({
            ...user,
            name: user.company.name,
        });
    }
}

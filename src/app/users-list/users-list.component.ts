import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UsersApiService } from "../user-api.service";
import { ICreateUser, IUser } from "../interfaces/user-list.interface";
import { UserCardComponent } from "./user-card/user-card.component";
import { CreateUserComponent } from "../create-user-form/create-user-form.component";
import { Store } from "@ngrx/store";
import { UsersActions } from "./store/users.actions";
import { selectUsers } from "./store/users.selectors";

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
    readonly snackbar = inject(MatSnackBar); 
    private readonly store = inject(Store);
    public readonly users$ = this.store.select(selectUsers);

    constructor() {
        this.usersApiService.getUsers().subscribe(
            (response: any) => {
                this.store.dispatch(UsersActions.set({users:response}));
            }           
        );
    }

    public createUser(user: ICreateUser) {
        this.store.select(selectUsers).subscribe(users => {
          const existingUser = users.find(
            (currentElement) => currentElement.email === user.email
          );
      
          if (existingUser) {
            this.snackbar.open("Такой пользователь уже существует", "Ok", { duration: 2000 });
          } else {
            this.store.dispatch(UsersActions.create({
              user: {
                id: new Date().getTime(),
                name: user.name,
                email: user.email,
                website: user.website,
                phone: user.phone,
                company: { name: user.company.name }
              }
            }));
      
            this.snackbar.open("Пользователь создан", "Ok", { duration: 2000 });
          }
        });
      }


    deleteUser(id: number) {
        this.store.dispatch(UsersActions.delete({id}));
    }

    editUser(user: IUser) {
        this.store.dispatch(UsersActions.edit({user}))
    }
}

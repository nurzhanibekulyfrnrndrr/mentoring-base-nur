import { AsyncPipe, NgFor } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ChildActivationStart, RouterLink, RouterOutlet } from "@angular/router";
import { UsersApiService } from "../user-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";
import { CreateUserComponent } from "../create-user-form/create-user-form.component";
import { ICreateUser, IUser } from "../interfaces/user-list.interface";

export interface User {
    id: number;
    name:string;
    username?:string;
    email:string;
    address?:{
        street?:string;
        suite?:string;
        city?:string;
        zipcode?:string;
        geo?:{
            lat?:string;
            lng?:string;
        };
    };
    phone?:string;
    website:string;
    company: {
        name:string;
        catchPhrase?:string;    
        bs?:string;
    };
}

@Component({
    selector:'app-users-list',
    templateUrl:'./users-list.component.html',
    styleUrl:'./users-list.component.scss',
    standalone:true,
    imports:[NgFor,RouterOutlet,RouterLink,UserCardComponent,AsyncPipe,CreateUserComponent],
    changeDetection:ChangeDetectionStrategy.OnPush,
})

export class UsersListComponent {
    
    readonly usersApiService = inject(UsersApiService);
    readonly usersService = inject(UsersService);

    constructor(){
            this.usersApiService.getUsers().subscribe(
            (response:any) => {
                this.usersService.setUsers(response);
            }
        )

        this.usersService.usersSubject.subscribe(
            users => console.log(users)
        )
    }

    deleteUser(id: number) {
        this.usersService.deleteUser(id)

    }

        editUser(user:IUser){
            this.usersService.editUser({
                ...user,
                 name:user.company.name,
                
            });
        }

    public createUser(user:ICreateUser){
        this.usersService.createUser({
            id: new Date().getTime(),
            name: user.name,
            email:user.email,
            website:user.website,
            phone:user.phone,
            company:{
                name:user.company.name,
            },

        });     
    }
}


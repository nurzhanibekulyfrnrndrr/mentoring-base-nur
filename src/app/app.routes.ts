import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './auth.guards';

export const routes: Routes = [
    {
        path: 'users',
        component: UsersListComponent
    },
    {
        path: 'header',
        component: HeaderComponent
    },
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'todos',
        component: TodosListComponent
    },
    {
        path:'admin',
        component:AdminComponent,
        canActivate:[authGuard]
    }
];

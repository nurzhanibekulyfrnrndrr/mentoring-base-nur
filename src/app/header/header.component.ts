import { Component, inject } from '@angular/core';
import {  CommonModule, NgFor,NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RedDirective } from '../directives/red.directive';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthComponent } from '../auth/auth.component';
import { UserService } from '../user.service';

const newPages: number[]=[5,4,3,2,1]

const menuItems:string[]= ['Каталог','Стройматериалы', 'Инструменты', 'Электрика','Интерьер и одежда' ]

const upperCaseMenuItems:string[] = menuItems.map(
  (item:string)=> {
    return item.toUpperCase();
  }
)


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf,NgFor,RouterLink,CommonModule,RedDirective,MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  readonly dialog = inject(MatDialog);
  readonly userService = inject(UserService);

  headerDate:Date = new Date();

  isShowCatalog = true;

  readonly headerItem = 'Главная';

  readonly headerItem1 = 'Админка';
  readonly headerItemUser = 'Пользователи'
  readonly headerItem8 = 'Задачи';

  readonly headerItem2 ='О компании';

  


   headerItem3 = 'Каталог';

   readonly header2Item1 ='Каталог';

   readonly header2Item2 ='Стройматериалы';
 
   readonly header2Item3 ='Инструменты';
  
   readonly header2Item4 ='Электрика';
 
   readonly header2Item5 ='Интерьер и одежда';
 
   readonly newPages: number[]= newPages;
 
   menuItems:string[] = upperCaseMenuItems;
 
   isUpperCase:boolean = true;
 
  
   changeMenuText():void {
     this.menuItems = upperCaseMenuItems.map(
     item => this.isUpperCase ? item.toLowerCase():item.toUpperCase()
   
     )
   
     this.isUpperCase =!this.isUpperCase
   }


   public openDialog(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'admin') {
        this.userService.loginAsAdmin()
      } else if (result === 'user') {
        this.userService.loginAsUser()
      } else return
    });
  }

  public logout() {
    this.userService.logout()
  }


}

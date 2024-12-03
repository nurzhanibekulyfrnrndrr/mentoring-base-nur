import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
const newPages: number[]=[5,4,3,2,1]

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink,NgFor,NgIf,MatButtonModule,MatIconModule],
  templateUrl:'./main.component.html',
  styleUrl:'./main.component.scss'
})
export class MainComponent {
  isShowMujik = true;
  readonly newPages: number[]= newPages;
}

import { Component } from '@angular/core';
import { MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatCardHeader, MatCardTitle],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}

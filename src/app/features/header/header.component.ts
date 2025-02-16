import { Component, EventEmitter, Output } from '@angular/core';
import { MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Output() scrollToEvent = new EventEmitter<string>();

  scrollToAbout(controlName:string): void {
    this.scrollToEvent.emit(controlName); // Emit event to parent
  }

}

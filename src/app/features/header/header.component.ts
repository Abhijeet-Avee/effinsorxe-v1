import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() scrollToEvent = new EventEmitter<string>();

  constructor(private router: Router) {}

  scrollToAbout(controlName: string): void {
    this.scrollToEvent.emit(controlName); // Emit event to parent
  }

  navigateTo(controlName: string) {
    if (controlName === 'contact')
      this.router.navigate(['/contact']).then(() => {
        window.scrollTo(0, 0); // Scroll to top after navigation
      });
  }
}

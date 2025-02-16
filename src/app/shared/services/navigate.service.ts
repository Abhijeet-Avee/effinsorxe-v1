import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigateService {
  private navigateToSectionSource = new Subject<string>();
  scrollToSection$ = this.navigateToSectionSource.asObservable();

  navigateTo(sectionId: string): void {
    this.navigateToSectionSource.next(sectionId);
  }
}

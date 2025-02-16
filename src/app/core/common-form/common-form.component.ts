import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ScrollService } from '../../shared/services/scroll.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { NavigateService } from '../../shared/services/navigate.service';

@Component({
  selector: 'app-common-form',
  standalone: true,
  imports: [],
  templateUrl: './common-form.component.html',
  styleUrl: './common-form.component.scss',
})
export class CommonFormComponent implements AfterViewInit, OnDestroy {
  private scrollSubscription!: Subscription;
  @Output() navigateToEvent = new EventEmitter<string>();

  constructor(
    private scrollService: ScrollService,
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router,
    private navigateService: NavigateService
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // ✅ Ensure execution happens only in the browser
      this.scrollSubscription = this.scrollService.scrollToSection$.subscribe(
        (sectionId) => {
          this.navigateToHomeComponent(sectionId);
          console.log(sectionId);
        }
      );
    }
  }

  navigateToHomeComponent(sectionId: string) {
    if (sectionId === 'home') {
      this.router.navigate(['/home', sectionId]);
    } else if (sectionId === 'about') {
      this.router.navigate(['/about', sectionId]);
    } else if (sectionId === 'services') {
      this.router.navigate(['/services', sectionId]);
    } else if (sectionId === 'industries') {
      this.router.navigate(['/industries', sectionId]);
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }
}

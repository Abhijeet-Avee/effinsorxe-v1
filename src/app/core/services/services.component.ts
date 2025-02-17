import { AfterViewInit, Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  ServiceData,
  SERVICES_DATA,
} from '../../shared/services/services.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScrollAnimationDirective } from '../../shared/animations/scroll-animation.directive';
import { AnimatedCardComponent } from '../../shared/components/animated-card.component';
import { RippleButtonComponent } from '../../shared/components/ripple-button.component';
import { ScrollService } from '../../shared/services/scroll.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ScrollAnimationDirective,
    AnimatedCardComponent,
    RippleButtonComponent,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  service!: ServiceData;

    private scrollSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private scrollService: ScrollService,
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const serviceId = params['id'];
      this.service = SERVICES_DATA[serviceId];

      if (!this.service) {
        this.router.navigate(['/']);
      }
    });
  }

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

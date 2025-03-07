import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { ScrollService } from '../../shared/services/scroll.service';
import { ScrollAnimationDirective } from '../../shared/animations/scroll-animation.directive';
import { AnimatedCardComponent } from '../../shared/components/animated-card.component';
import { RippleButtonComponent } from '../../shared/components/ripple-button.component';
import { TypewriterComponent } from '../../shared/components/typewriter.component';
import { StackedCardsComponent } from '../../features/stacked-cards/stacked-cards.component';
import { NavigateService } from '../../shared/services/navigate.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ScrollAnimationDirective,
    AnimatedCardComponent,
    TypewriterComponent,
    RippleButtonComponent,
    StackedCardsComponent,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  title = 'Effinsorxe';
  private scrollSubscription!: Subscription;

  @ViewChild('aboutSection') aboutSection!: ElementRef;
  @ViewChild('servicesSection') servicesSection!: ElementRef;
  @ViewChild('industriesSection') industriesSection!: ElementRef;
  @ViewChild('homeSection') homeSection!: ElementRef;

  constructor(
    private scrollService: ScrollService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object // ✅ Inject PLATFORM_ID to check if browser
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // ✅ Ensure execution happens only in the browser
      this.scrollSubscription = this.scrollService.scrollToSection$.subscribe(
        (sectionId) => {
          this.scrollToAbout(sectionId);
        }
      );
    }

    this.route.paramMap.subscribe((params) => {
      this.scrollToAbout(params.get('sectionId') as string);
    });
  }

  scrollToAbout(sectionId: string): void {
    console.log(sectionId + ' subscribe');
    if (isPlatformBrowser(this.platformId)) {
      // ✅ Prevent execution on the server
      // -- Home Section
      if (sectionId === 'home' && this.homeSection) {
        // ✅ Use renderer2 to trigger scrolling
        this.renderer.setProperty(
          document.documentElement,
          'scrollTop',
          this.homeSection.nativeElement.offsetTop - 50
        );
        this.renderer.setProperty(
          document.body,
          'scrollTop',
          this.homeSection.nativeElement.offsetTop - 50
        );

        // ✅ Alternative: Use smooth scroll with window
        window.scrollTo({
          top: this.homeSection.nativeElement.offsetTop - 50,
          behavior: 'smooth',
        });
      }
      // -- About Section
      if (sectionId === 'about' && this.aboutSection) {
        // ✅ Use renderer2 to trigger scrolling
        this.renderer.setProperty(
          document.documentElement,
          'scrollTop',
          this.aboutSection.nativeElement.offsetTop - 50
        );
        this.renderer.setProperty(
          document.body,
          'scrollTop',
          this.aboutSection.nativeElement.offsetTop - 50
        );

        // ✅ Alternative: Use smooth scroll with window
        window.scrollTo({
          top: this.aboutSection.nativeElement.offsetTop - 50,
          behavior: 'smooth',
        });
      }
      // -- Services Section
      if (sectionId === 'services' && this.servicesSection) {
        // ✅ Use renderer2 to trigger scrolling
        this.renderer.setProperty(
          document.documentElement,
          'scrollTop',
          this.servicesSection.nativeElement.offsetTop - 50
        );
        this.renderer.setProperty(
          document.body,
          'scrollTop',
          this.servicesSection.nativeElement.offsetTop - 50
        );

        // ✅ Alternative: Use smooth scroll with window
        window.scrollTo({
          top: this.servicesSection.nativeElement.offsetTop - 50,
          behavior: 'smooth',
        });
      }
      // -- Industries Section
      if (sectionId === 'industries' && this.industriesSection) {
        // ✅ Use renderer2 to trigger scrolling
        this.renderer.setProperty(
          document.documentElement,
          'scrollTop',
          this.industriesSection.nativeElement.offsetTop - 50
        );
        this.renderer.setProperty(
          document.body,
          'scrollTop',
          this.industriesSection.nativeElement.offsetTop - 50
        );

        // ✅ Alternative: Use smooth scroll with window
        window.scrollTo({
          top: this.industriesSection.nativeElement.offsetTop - 50,
          behavior: 'smooth',
        });
      }
    }
  }

  navigateTo(controlName: string) {
    if (controlName === 'contact') {
      this.router.navigate(['/contact']).then(() => {
        window.scrollTo(0, 0); // Scroll to top after navigation
      });
    }
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  navigateToServices(navigateTo: string) {
    // Navigate to the home page first, and then to the target route
    this.router.navigate(['/']).then(() => {
      this.router.navigate([`/services/services/${navigateTo}`]).then(() => {
        window.scrollTo(0, 0); // Scroll to top after navigation
      });
    });
  }
}

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
    private renderer: Renderer2,
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
  }

  scrollToAbout(sectionId: string): void {
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

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }
}

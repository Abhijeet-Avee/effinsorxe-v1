import { Directive, ElementRef, Inject, OnInit, OnDestroy, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true
})
export class ScrollAnimationDirective implements OnInit, OnDestroy {
  private observer: IntersectionObserver | null = null;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: object // Inject platform ID to check if we are in the browser
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) { // Run only in browser
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.element.nativeElement, 'animate');
          this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    this.observer.observe(this.element.nativeElement);
  }
}

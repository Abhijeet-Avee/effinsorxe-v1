import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-stacked-cards',
  standalone: true,
  imports: [],
  templateUrl: './stacked-cards.component.html',
  styleUrl: './stacked-cards.component.scss',
})
export class StackedCardsComponent implements AfterViewInit {
  @ViewChild('stackArea', { static: false }) stackArea!: ElementRef;
  cards: HTMLElement[] = [];
  isBrowser: boolean;
  private triggerStart = 0;
  private triggerEnd = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private renderer: Renderer2
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        if (this.stackArea) {
          const rect = this.stackArea.nativeElement.getBoundingClientRect();
          this.triggerStart = window.scrollY + rect.top;
          this.triggerEnd = this.triggerStart + 2.5 * window.innerHeight;

          this.cards = Array.from(
            this.stackArea.nativeElement.querySelectorAll('.card')
          ) as HTMLElement[];
          this.rotateCards();
        }
      }, 500);
    }
  }

  private rotateCards(): void {
    // console.log('rotating');
    let angle = 0;
    this.cards.forEach((card, index) => {
      if (card.classList.contains('away')) {
        // Force reflow to apply CSS properly
        card.getBoundingClientRect();
        this.renderer.setStyle(
          card,
          'transform',
          `translateY(-120vh) rotate(-48deg)`
        );
      } else {
        this.renderer.setStyle(card, 'transform', `rotate(${angle}deg)`);
        angle -= 10;
        this.renderer.setStyle(card, 'zIndex', `${this.cards.length - index}`);
      }
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (!this.isBrowser || !this.stackArea) return;

    const scrollY = window.scrollY;

    // Fix position only in range
    if (scrollY >= this.triggerStart && scrollY <= this.triggerEnd) {
      this.renderer.addClass(this.stackArea.nativeElement, 'fixed');
      this.renderer.removeClass(this.stackArea.nativeElement, 'relative-transition');
    } else {

      const rect = this.stackArea.nativeElement.getBoundingClientRect();
      this.renderer.setStyle(this.stackArea.nativeElement, '--exit-top', `${rect.top}px`);

      // console.log('Rect: ' + rect.top);
      this.renderer.removeClass(this.stackArea.nativeElement, 'fixed');
      this.renderer.addClass(this.stackArea.nativeElement, 'relative-transition');
    }

    // Adjust calculations since section is fixed
    const distance = window.innerHeight * 1;
    const sectionTop = this.stackArea.nativeElement.offsetTop;
    const scrollOffset = scrollY - sectionTop;

    // console.log(
    //   `ScrollY: ${scrollY}, SectionTop: ${sectionTop}, ScrollOffset: ${scrollOffset}, Distance: ${distance}`
    // );

    let index = Math.max(0, Math.floor(scrollOffset / distance)) - 1;

    // console.log('Scrolling...', 'Index:', index);

    this.cards.forEach((card, i) => {
      if (i <= index) {
        if (!card.classList.contains('away')) {
          this.renderer.addClass(card, 'away');
          this.rotateCards();
        }
      } else {
        if (card.classList.contains('away')) {
          this.renderer.removeClass(card, 'away');
          this.rotateCards();
        }
      }
    });
  }
}

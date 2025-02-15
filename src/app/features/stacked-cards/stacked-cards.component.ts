import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';

@Component({
  selector: 'app-stacked-cards',
  standalone: true,
  imports: [],
  templateUrl: './stacked-cards.component.html',
  styleUrl: './stacked-cards.component.scss'
})
export class StackedCardsComponent implements AfterViewInit{

  @ViewChild('stackArea') stackArea!: ElementRef;
  cards!: NodeListOf<HTMLElement>;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.cards = this.stackArea.nativeElement.querySelectorAll('.card');
      this.rotateCards();
    }
  }

  private rotateCards(): void {
    if (!this.isBrowser || !this.cards) return;

    let angle = 0;
    this.cards.forEach((card, index) => {
      if (card.classList.contains('away')) {
        card.style.transform = `translateY(-120vh) rotate(-48deg)`;
      } else {
        card.style.transform = `rotate(${angle}deg)`;
        angle -= 10;
        card.style.zIndex = `${this.cards.length - index}`;
      }
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (!this.isBrowser || !this.stackArea) return;

    const distance = window.innerHeight * 0.5;
    const topVal = this.stackArea.nativeElement.getBoundingClientRect().top;
    let index = Math.floor(-1 * (topVal / distance + 1));

    this.cards.forEach((card, i) => {
      if (i <= index) {
        card.classList.add('away');
      } else {
        card.classList.remove('away');
      }
    });

    this.rotateCards();
  }

}

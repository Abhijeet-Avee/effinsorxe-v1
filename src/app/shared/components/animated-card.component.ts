import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animated-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="card-3d"
      [ngStyle]="{'--card-bg': background}"
      (mousemove)="handleMouseMove($event)"
      (mouseleave)="handleMouseLeave()">
      <div class="card-content" [style.transform]="transform">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .card-3d {
      position: relative;
      padding: 2rem;
      border-radius: 16px;
      background: var(--card-bg, rgba(255, 255, 255, 0.1));
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: transform 0.1s ease;
      transform-style: preserve-3d;
      perspective: 1000px;
    }

    .card-content {
      transition: transform 0.1s ease;
    }

    .card-3d:hover {
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class AnimatedCardComponent {
  @Input() background: string = 'rgba(255, 255, 255, 0.1)';
  transform: string = '';

  handleMouseMove(e: MouseEvent) {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = -(x - centerX) / 10;

    this.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  handleMouseLeave() {
    this.transform = 'rotateX(0deg) rotateY(0deg)';
  }
}
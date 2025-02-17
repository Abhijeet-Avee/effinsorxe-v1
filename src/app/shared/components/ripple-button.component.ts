import { Component, Input, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ripple-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [class]="'ripple-button ' + className"
      [disabled]="disabled"
      (click)="createRipple($event)">
      <ng-content></ng-content>
      <div class="ripple-container"></div>
    </button>
  `,
  styles: [`
    .ripple-button {
      position: relative;
      overflow: hidden;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .ripple-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background: rgba(var(--primary-color-rgb), 0.5);
    }

    .ripple-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.4);
      transform: scale(0);
      animation: ripple 0.6s linear;
    }

    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `]
})
export class RippleButtonComponent {
  @Input() className: string = '';
  @Input() disabled: boolean = false;

  constructor(private el: ElementRef) {}

  createRipple(event: MouseEvent) {
    if (this.disabled) return;
    
    const button = this.el.nativeElement.querySelector('.ripple-button');
    const rippleContainer = button.querySelector('.ripple-container');
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');

    const ripple = rippleContainer.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    rippleContainer.appendChild(circle);
  }
}
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-typewriter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="typewriter">{{ displayText }}<span class="cursor">|</span></span>
  `,
  styles: [`
    .typewriter {
      font-family: 'Inter', monospace;
      white-space: pre;
    }

    .cursor {
      animation: blink 1s step-end infinite;
    }

    @keyframes blink {
      from, to { opacity: 1; }
      50% { opacity: 0; }
    }
  `]
})
export class TypewriterComponent implements OnInit {
  @Input() text: string = '';
  @Input() speed: number = 100;
  displayText: string = '';

  ngOnInit() {
    this.typeText();
  }

  private async typeText() {
    for (let i = 0; i <= this.text.length; i++) {
      this.displayText = this.text.slice(0, i);
      await new Promise(resolve => setTimeout(resolve, this.speed));
    }
  }
}
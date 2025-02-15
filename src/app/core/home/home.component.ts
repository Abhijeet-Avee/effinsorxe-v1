import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../features/footer/footer.component';
import { HeaderComponent } from '../../features/header/header.component';
import { MarqueeComponent } from '../../features/marquee/marquee.component';
import { BannerComponent } from '../banner/banner.component';
import { CommonModule } from '@angular/common';
import { ScrollAnimationDirective } from '../../shared/animations/scroll-animation.directive';
import { AnimatedCardComponent } from '../../shared/components/animated-card.component';
import { RippleButtonComponent } from '../../shared/components/ripple-button.component';
import { TypewriterComponent } from '../../shared/components/typewriter.component';
import { StackedCardsComponent } from '../../features/stacked-cards/stacked-cards.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    // RouterOutlet,
    // MatCardModule,
    // HeaderComponent,
    // HeaderComponent,
    // MarqueeComponent,
    // BannerComponent,
    // FooterComponent,
    CommonModule,
    ScrollAnimationDirective,
    AnimatedCardComponent,
    TypewriterComponent,
    RippleButtonComponent,
    StackedCardsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  title = 'Effinsorxe';
}

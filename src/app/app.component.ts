import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from "./features/header/header/header.component";
import { MarqueeComponent } from "./features/marquee/marquee.component";
import { BannerComponent } from "./core/banner/banner.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, HeaderComponent, HeaderComponent, MarqueeComponent, BannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Effinsorxe';
}

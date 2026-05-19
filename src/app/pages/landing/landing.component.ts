import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { MenuComponent } from '../menu/menu.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { ReservationComponent } from '../reservation/reservation.component';
import { ContactComponent } from '../contact/contact.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';
import { RevealStaggerSetupDirective } from '../../shared/reveal-stagger-setup.directive';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    AboutComponent,
    MenuComponent,
    GalleryComponent,
    ReviewsComponent,
    ReservationComponent,
    ContactComponent,
    RevealOnScrollDirective,
    RevealStaggerSetupDirective
  ],
  template: `
<main class="landing">

  <section id="home" class="section-anchor reveal" appRevealOnScroll="zoom">
    <div class="reveal-stagger" [appRevealStaggerSetup]="65">
      <app-home />
    </div>
  </section>

  <section id="about" class="section-anchor reveal" appRevealOnScroll="right">
    <app-about />
  </section>

  <section id="menu" class="section-anchor reveal" appRevealOnScroll="up">
    <app-menu />
  </section>

  <section id="gallery" class="section-anchor reveal" appRevealOnScroll="zoom">
    <app-gallery />
  </section>

  <section id="reviews" class="section-anchor reveal" appRevealOnScroll="left">
    <app-reviews />
  </section>

  <section id="reservation" class="section-anchor reveal" appRevealOnScroll="up">
    <app-reservation />
  </section>

  <section id="contact" class="section-anchor reveal" appRevealOnScroll="right">
    <app-contact />
  </section>

</main>
  `,
  styles: [
    `
      .landing {
        width: 100%;
      }

      /* keeps scroll position correct for sticky navbar */
      .section-anchor {
        scroll-margin-top: 90px;
      }
    `
  ]
})
export class LandingComponent {}
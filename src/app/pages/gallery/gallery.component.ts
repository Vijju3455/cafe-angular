import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

const IMAGES = [
  { src: '1.jpg', alt: 'Cafe interior' },
  { src: '2.jpg', alt: 'Coffee' },
  { src: '3.jpg', alt: 'Tea time' },
  { src: '4.jpg', alt: 'Desserts' },
  { src: '5.jpg', alt: 'Snacks' },
  { src: '6.jpg', alt: 'Beverages' },
];

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
<section class="page-head reveal">
      <div class="container">
        <h1>Gallery</h1>
        <p class="sub">A peek inside Café Aurora.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">

        <div class="grid">

          <div class="card" *ngFor="let img of images">

            <img [src]="asset(img.src)" [alt]="img.alt" loading="lazy" />

            <div class="overlay">
              <h3>{{ img.alt }}</h3>
              <p>Explore Café Aurora vibes</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  `,
  styles: [`
    .page-head{
      padding:42px 0;
      background:linear-gradient(135deg, rgba(255,179,0,.16), rgba(255,122,0,.06));
      border-bottom:1px solid rgba(0,0,0,.05);
    }

    .container{
      max-width:1120px;
      margin:0 auto;
      padding:0 16px;
    }

    h1{ margin:0 0 8px; font-size:2.2rem; }
    .sub{ margin:0; color:#555; font-weight:650; }

    .section{ padding:26px 0 52px; }

    /* GRID */
    .grid{
      display:grid;
      grid-template-columns:repeat(3, minmax(0, 1fr));
      gap:14px;
    }

    /* IMAGE CARD */
    .card{
      position:relative;
      border-radius:16px;
      overflow:hidden;
      height:220px;
      box-shadow:0 10px 22px rgba(0,0,0,.08);
      cursor:pointer;
    }

    .card img{
      width:100%;
      height:100%;
      object-fit:cover;
      display:block;
      transition: transform .3s ease;
    }

    .card:hover img{
      transform: scale(1.08);
    }

    /* OVERLAY TEXT */
    .overlay{
      position:absolute;
      inset:0;
      background:rgba(0,0,0,.35);
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      text-align:center;
      color:#fff;
      padding:12px;
    }

    .overlay h3{
      margin:0;
      font-size:1.2rem;
      font-weight:900;
    }

    .overlay p{
      margin:6px 0 0;
      font-size:.9rem;
      opacity:.9;
    }

    /* RESPONSIVE */
    @media (max-width: 900px){
      .grid{ grid-template-columns:repeat(2,1fr); }
    }

    @media (max-width: 600px){
      .grid{ grid-template-columns:1fr; }
    }
  `]
})
export class GalleryComponent {
  protected images = IMAGES;

  asset(file: string) {
    return `assets/menu-categories/${file}`;
  }
}
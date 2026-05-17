import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Review = { name: string; rating: number; text: string; date: string };

const REVIEWS: Review[] = [
  { name: 'Asha', rating: 5, text: 'Super cozy ambience and the coffee tastes premium.', date: '2026-04-11' },
  { name: 'Ravi', rating: 4, text: 'Great menu variety. Staff is friendly and fast.', date: '2026-03-22' },
  { name: 'Meera', rating: 5, text: 'Loved the desserts—especially the lava cake!', date: '2026-02-09' },
  { name: 'Karthik', rating: 4, text: 'Good vibes for meetings. Would visit again.', date: '2026-01-18' },
];

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="page-head">
      <div class="container">
        <h1>Customer Reviews</h1>
        <p class="sub">Real voices from MY Cafe guests.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="summary">
          <div class="badge">4.8★ Average</div>
        </div>

        <div class="grid">
          <div class="card" *ngFor="let r of reviews">
            <div class="top">
              <div class="name">{{r.name}}</div>
              <div class="stars" aria-label="Star rating">
                <span *ngFor="let i of starArray(r.rating)" class="star">★</span>
                <span *ngFor="let i of starArray(5 - r.rating)" class="star star--empty">★</span>
              </div>
            </div>
            <p class="text">{{r.text}}</p>
            <div class="date">{{r.date}}</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-head{padding:42px 0;background:linear-gradient(135deg, rgba(255,179,0,.16), rgba(255,122,0,.06));border-bottom:1px solid rgba(0,0,0,.05);}
    .container{max-width:1120px;margin:0 auto;padding:0 16px;}
    h1{margin:0 0 8px;font-size:2.2rem;}
    .sub{margin:0;color:var(--muted);font-weight:650;}
    .section{padding:26px 0 52px;}
    .summary{margin-bottom:16px;}
    .badge{display:inline-flex;align-items:center;justify-content:center;background:var(--card);border:1px solid var(--card-border);border-radius:999px;padding:10px 14px;font-weight:900;color:#ff7a00;box-shadow:0 10px 20px rgba(0,0,0,.03);}

    .grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;align-items:start;}
    .card{background:var(--card);border:1px solid var(--card-border);border-radius:16px;padding:18px;box-shadow:0 10px 25px rgba(0,0,0,.04);}
    .top{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;}
    .name{font-weight:950;color:var(--text);}
    .stars{font-size:1.05rem;letter-spacing:2px;color:#ffb300;}
    .star--empty{color:rgba(255,179,0,.25);}

    .text{margin:12px 0 10px;color:var(--muted);line-height:1.7;font-weight:560;}
    .date{color:var(--muted);font-weight:650;font-size:.92rem;}


    @media (max-width: 900px){.grid{grid-template-columns:1fr;}}
  `]
})
export class ReviewsComponent {
  protected reviews = REVIEWS;

  starArray(n: number) {
    return Array.from({ length: Math.max(0, n) });
  }
}


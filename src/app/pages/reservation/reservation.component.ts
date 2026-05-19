import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Reservation = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
};

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<section class="page-head reveal">

      <div class="container">
        <h1>Table Reservation</h1>
        <p class="sub">Request a table—handled frontend-only.</p>
      </div>
    </section>

    <section class="section">
      <div class="container grid">
        <div class="card">
          <h2>Reserve your table</h2>
          <form (ngSubmit)="submit()" class="form">
            <div class="field">
              <label>Customer name</label>
              <input type="text" name="name" required [(ngModel)]="model.name" />
            </div>
            <div class="field">
              <label>Contact number</label>
              <input type="tel" name="phone" required [(ngModel)]="model.phone" placeholder="e.g., 9876543210" />
            </div>
            <div class="field">
              <label>Date</label>
              <input type="date" name="date" required [(ngModel)]="model.date" />
            </div>
            <div class="field">
              <label>Time</label>
              <input type="time" name="time" required [(ngModel)]="model.time" />
            </div>
            <div class="field">
              <label>Number of guests</label>
              <input type="number" name="guests" min="1" max="20" required [(ngModel)]="model.guests" />
            </div>

            <button class="btn" type="submit">Book Reservation</button>

            <p class="msg" *ngIf="message">{{message}}</p>
          </form>
        </div>

        <div class="card card--info">
          <h2>Opening hours</h2>
          <ul class="hours">
            <li><strong>Mon–Thu:</strong> 10:00 AM – 10:00 PM</li>
            <li><strong>Fri–Sat:</strong> 10:00 AM – 11:00 PM</li>
            <li><strong>Sunday:</strong> 10:00 AM – 9:00 PM</li>
          </ul>
          <div class="divider"></div>
          <h2>What happens next?</h2>
          <p class="small">
            We store your reservation request in localStorage for demo purposes.
            A confirmation message appears immediately.
          </p>
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
    .grid{display:grid;grid-template-columns:1.2fr .8fr;gap:16px;align-items:start;}
    .card{background:var(--card);border:1px solid var(--card-border);border-radius:16px;padding:18px;box-shadow:0 10px 25px rgba(0,0,0,.04);}
    .card--info{background:linear-gradient(180deg, var(--card), rgba(255,179,0,.03));}
    h2{margin:0 0 12px;font-size:1.25rem;}
    .form{display:flex;flex-direction:column;gap:12px;}
    .field label{display:block;font-weight:850;color:var(--text);margin-bottom:8px;font-size:.9rem;}
    input{width:100%;border:1px solid var(--card-border);border-radius:12px;padding:10px 12px;font-weight:650;outline:none;}
    .btn{margin-top:6px;align-self:flex-start;background:#ffb300;color:var(--text);border:none;border-radius:12px;padding:12px 16px;font-weight:900;cursor:pointer;}

    .btn:hover{filter:brightness(.97)}
    .msg{margin:10px 0 0;color:#0b6b2e;font-weight:800;}
    .hours{margin:0;padding-left:18px;display:flex;flex-direction:column;gap:10px;color:var(--text);font-weight:650;}
    .divider{height:1px;background:var(--card-border);margin:14px 0;}
    .small{color:var(--muted);line-height:1.7;font-weight:550;margin:0;}


    @media (max-width: 900px){.grid{grid-template-columns:1fr;}}
  `]
})
export class ReservationComponent {
  protected model: Reservation = {
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 2
  };
  protected message = '';

  submit() {
    const phoneOk = /^\d{8,15}$/.test(this.model.phone.trim());
    if (!phoneOk) {
      this.message = 'Please enter a valid contact number (8–15 digits).';
      return;
    }

    const reservations = JSON.parse(localStorage.getItem('mycafe_reservations') || '[]') as Reservation[];
    reservations.unshift({ ...this.model, guests: Number(this.model.guests) });
    localStorage.setItem('mycafe_reservations', JSON.stringify(reservations));

    this.message = `Reservation requested for ${this.model.date} at ${this.model.time}. See you soon!`;
    this.model = { name: '', phone: '', date: '', time: '', guests: 2 };
  }
}


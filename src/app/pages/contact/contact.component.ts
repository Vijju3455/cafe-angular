import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<section class="page-head reveal">
      <div class="container">
        <h1>Contact</h1>
        <p class="sub">Reach us anytime—questions, feedback, or catering requests.</p>
      </div>
    </section>

    <section class="section">
      <div class="container grid">
        <div class="card">
          <h2>Get in touch</h2>
          <div class="info">
            <p><strong>Café Aurora:</strong> 80 Feet Rd, HAL 3rd Stage, Indiranagar, Bengaluru, Karnataka 560075</p>
            <p><strong>Phone:</strong> +91 98755 43210</p>
            <p><strong>Email:</strong> info@cafeaurora.com</p>
          </div>
          <div class="map">
            <iframe
              loading="lazy"
              title="Google Map"
              src="https://www.google.com/maps?q=80%20Feet%20Rd%2C%20HAL%203rd%20Stage%2C%20Indiranagar%2C%20Bengaluru%2C%20Karnataka%20560075&output=embed"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div class="card card--form">
          <h2>Send a message</h2>
          <form (ngSubmit)="submit()" class="form">
            <div class="field">
              <label>Your name</label>
              <input type="text" required [(ngModel)]="model.name" name="name" />
            </div>
            <div class="field">
              <label>Email</label>
              <input type="email" required [(ngModel)]="model.email" name="email" />
            </div>
            <div class="field">
              <label>Message</label>
              <textarea required [(ngModel)]="model.message" name="message" rows="5"></textarea>
            </div>
            <button class="btn" type="submit">Contact Us</button>
            <p class="msg" *ngIf="message">{{message}}</p>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-head{padding:42px 0;background:linear-gradient(135deg, rgba(255,179,0,.16), rgba(255,122,0,.06));border-bottom:1px solid rgba(0,0,0,.05);}
    .container{max-width:1120px;margin:0 auto;padding:0 16px;}
    h1{margin:0 0 8px;font-size:2.2rem;}

    .section{padding:26px 0 52px;}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start;}

    h2{margin:0 0 12px;font-size:1.25rem;}
    .info p{margin:0 0 10px;color:var(--text);font-weight:650;line-height:1.4;}
.map{margin-top:12px;border-radius:14px;overflow:hidden;border:1px solid var(--card-border);}
    iframe{width:100%;height:320px;border:0;display:block;}

    .form{display:flex;flex-direction:column;gap:12px;}
.field label{display:block;font-weight:850;color:var(--text);margin-bottom:8px;font-size:.9rem;}
input, textarea{width:100%;border:1px solid var(--card-border);border-radius:12px;padding:10px 12px;font-weight:650;outline:none;}
    textarea{resize:vertical;}
    .btn{margin-top:6px;align-self:flex-start;background:#ffb300;color:#1b1b1b;border:none;border-radius:12px;padding:12px 16px;font-weight:900;cursor:pointer;}
.msg{margin:10px 0 0;color:#0b6b2e;font-weight:800;}
    @media (max-width: 900px){.grid{grid-template-columns:1fr;}.map iframe{height:260px;}}
  `]
})
export class ContactComponent {
  protected model = { name: '', email: '', message: '' };
  protected message = '';

  submit() {
    this.message = 'Message sent (demo). We will get back to you soon!';
    this.model = { name: '', email: '', message: '' };
  }
}


import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  template: `
    <footer class="footer" role="contentinfo">
      <div class="container">
       <div class="grid">

  <!-- COLUMN 1 -->
  <div class="col col--brand">
    <div class="brand">
      <div class="brand__mark" aria-hidden="true">☕</div>
      <div class="brand__text">
        <div class="brand__name">Café Aurora</div>
        <div class="brand__desc">
          Warm brews, cozy vibes, and crafted conversations.
        </div>
      </div>
    </div>

    <div class="social">
      <a class="social__icon" href="#" aria-label="Instagram">
        <i class="bi bi-instagram"></i>
      </a>
      <a class="social__icon" href="#" aria-label="Facebook">
        <i class="bi bi-facebook"></i>
      </a>
      <a class="social__icon" href="#" aria-label="Twitter">
        <i class="bi bi-twitter-x"></i>
      </a>
      <a class="social__icon" href="#" aria-label="YouTube">
        <i class="bi bi-youtube"></i>
      </a>
    </div>
  </div> <!-- ✅ THIS WAS MISSING -->

  <!-- COLUMN 2 -->
  <div class="col">
    <div class="col__title">Quick Links</div>
    <a class="col__link" routerLink="/menu">Menu</a>
    <a class="col__link" routerLink="/reservation">Book a Table</a>
    <a class="col__link" routerLink="/gallery">Gallery</a>
    <a class="col__link" routerLink="/contact">Contact Us</a>
  </div>

  <!-- COLUMN 3 -->
  <div class="col">
    <div class="col__title">Opening Hours</div>
    <div class="hours">
      <div class="hour"><span>Mon–Thu</span><span>10:00 AM – 10:00 PM</span></div>
      <div class="hour"><span>Fri–Sat</span><span>10:00 AM – 11:00 PM</span></div>
      <div class="hour"><span>Sunday</span><span>10:00 AM – 9:00 PM</span></div>
    </div>
  </div>

  <!-- COLUMN 4 -->
  <div class="col">
    <div class="col__title">Contact Us</div>
    <div class="contact">
      <div class="contact__item">80 Feet Rd, HAL 3rd Stage, Indiranagar, Bengaluru</div>
      <div class="contact__item">Phone: +91 98755 43210</div>
      <div class="contact__item">Email: info@cafeaurora.com</div>
    </div>
  </div>

</div>

        <div class="bottom">
          <div class="bottom__left">© {{ year }} Café Aurora. All rights reserved.</div>
          <div class="bottom__right">
            <a class="bottom__link" href="#">Privacy Policy</a>
            <a class="bottom__link" href="#">Terms of Service</a>
            <a class="bottom__link" href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
    .footer{
      background: rgba(255, 246, 232, .95);
      color: var(--text);
      border-top: 1px solid rgba(0,0,0,.06);
      padding: 42px 0 26px;
      margin-top: 10px;
    }

    .container{max-width:1120px;margin:0 auto;padding:0 16px;}

    .grid{
      display:grid;
      grid-template-columns: 1.25fr 0.9fr 0.9fr 1fr;
      gap: 22px;
      align-items:flex-start;
    }

    .col{display:flex;flex-direction:column;gap:10px;}

    .col__title{
      font-weight: 1000;
      letter-spacing: .01em;
      margin-bottom: 2px;
    }

    .col__link{
      color: var(--link);
      text-decoration:none;
      font-weight:800;
      padding: 6px 0;
      border-radius: 10px;
      transition: transform .18s ease, filter .18s ease;
      width: fit-content;
    }
    .col__link:hover{transform: translateY(-1px);filter: brightness(.96);}

    .brand{display:flex;align-items:center;gap:12px;}
    .brand__mark{
      width:44px;height:44px;border-radius:16px;
      display:grid;place-items:center;
      background: rgba(255,179,0,.18);
      border: 1px solid rgba(255,179,0,.35);
      font-size: 22px;
    }
    .brand__name{font-weight:1000;font-size:1.1rem;}
    .brand__desc{color: var(--muted);font-weight:650;margin-top:4px;line-height:1.5;max-width: 260px;}

    .social {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.social__icon {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  text-decoration: none;
  border: 1px solid rgba(0,0,0,0.08);
  background: rgba(255,255,255,0.75);
  color: var(--link);
  transition: 0.2s ease;
  font-size: 18px;
}

.social__icon:hover {
  transform: translateY(-3px);
  background: #ffe6b3;
}

    .hours,.contact{display:flex;flex-direction:column;gap:10px;}
    .hour{display:flex;justify-content:space-between;gap:12px;color: var(--text);font-weight: 700;}
    .hour span:first-child{color: var(--muted);font-weight: 800;}

    .bottom{
      margin-top: 26px;
      padding-top: 18px;
      border-top: 1px solid rgba(0,0,0,.06);
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap: 16px;
      flex-wrap:wrap;
    }

    .bottom__left{color: var(--text);font-weight:800;}

    .bottom__right{display:flex;gap:14px;flex-wrap:wrap;}
    .bottom__link{
      color: var(--link);
      text-decoration:none;
      font-weight:800;
      padding: 6px 0;
      border-radius: 10px;
      transition: transform .18s ease, filter .18s ease;
      width: fit-content;
    }
    .bottom__link:hover{transform: translateY(-1px);filter: brightness(.96);}

    @media (max-width: 980px){
      .grid{grid-template-columns: 1fr 1fr;}
    }

    @media (max-width: 640px){
      .grid{grid-template-columns: 1fr;}
      .bottom{flex-direction:column;align-items:flex-start;}
    }
    `
  ]
})
export class FooterComponent {
  protected year = new Date().getFullYear();
}


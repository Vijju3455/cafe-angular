import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  template: `
    <footer class="footer">
      <div class="container footer__inner">
        <div class="left">© {{ year }} Café Aurora. All rights reserved.</div>
        <div class="right">
          <a routerLink="/menu">Menu</a>
          <span class="sep">•</span>
          <a routerLink="/reservation">Book</a>
          <span class="sep">•</span>
          <a routerLink="/contact">Contact</a>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
    .footer{background:var(--footer-bg);color:var(--text);border-top:1px solid var(--card-border);padding:22px 0;}
    .container{max-width:1120px;margin:0 auto;padding:0 16px;display:flex;justify-content:space-between;align-items:center;gap:14px;}
    .left{font-weight:700;}
    .right{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
    a{color:var(--link);text-decoration:none;font-weight:800;}
    a:hover{text-decoration:underline;}
    .sep{opacity:.35;}
    `
  ]
})
export class FooterComponent {
  protected year = new Date().getFullYear();
}


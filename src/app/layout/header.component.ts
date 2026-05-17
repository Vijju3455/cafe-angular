import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container header__inner">
        <a class="brand" routerLink="/home">
          <span class="brand__mark">☕</span>
          <span class="brand__name">Café Aurora</span>
        </a>

        <nav class="nav" aria-label="Main navigation">
          <a routerLink="/home" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
          <a routerLink="/about" routerLinkActive="active">About</a>
          <a routerLink="/menu" routerLinkActive="active">Menu</a>
          <a routerLink="/gallery" routerLinkActive="active">Gallery</a>
          <a routerLink="/reservation" routerLinkActive="active">Reservations</a>
          <a routerLink="/contact" routerLinkActive="active">Contact</a>
          <a routerLink="/reviews" routerLinkActive="active">Reviews</a>
        </nav>

        <button class="nav-toggle" type="button" aria-label="Open navigation" (click)="toggle()">
          ☰
        </button>
      </div>

      <div class="mobile" [class.mobile--open]="open">
        <div class="container mobile__inner">
          <a routerLink="/home" (click)="toggle();">Home</a>
          <a routerLink="/about" (click)="toggle();">About</a>
          <a routerLink="/menu" (click)="toggle();">Menu</a>
          <a routerLink="/gallery" (click)="toggle();">Gallery</a>
          <a routerLink="/reservation" (click)="toggle();">Reservations</a>
          <a routerLink="/contact" (click)="toggle();">Contact</a>
          <a routerLink="/reviews" (click)="toggle();">Reviews</a>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
    .header{position:sticky;top:0;z-index:50;background:var(--header-bg);backdrop-filter: blur(10px);border-bottom:1px solid var(--card-border);}
    .container{max-width:1120px;margin:0 auto;padding:0 16px;}
    .header__inner{display:flex;align-items:center;justify-content:space-between;gap:16px;height:68px;}
    .brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--text);font-weight:950;letter-spacing:.01em;}
    .brand__mark{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:rgba(255,179,0,.18);border:1px solid rgba(255,179,0,.35);}
    .brand__name{font-size:1.15rem;}

    .nav{display:flex;gap:14px;align-items:center;flex-wrap:wrap;}
    .nav a{color:var(--text);text-decoration:none;font-weight:750;font-size:.95rem;padding:10px 10px;border-radius:12px;}
    .nav a.active{background:rgba(255,179,0,.18);border:1px solid rgba(255,179,0,.35);}

    .nav-toggle{display:none;background:transparent;border:1px solid var(--card-border);border-radius:12px;padding:8px 12px;font-weight:900;}

    .mobile{display:none;}
    @media (max-width: 900px){
      .nav{display:none;}
      .nav-toggle{display:inline-flex;}
      .mobile{display:none;}
      .mobile--open{display:block;}
      .mobile__inner{padding:12px 0 18px;display:flex;flex-direction:column;gap:8px;}
      .mobile__inner a{padding:12px 12px;border-radius:12px;background:var(--card);border:1px solid var(--card-border);text-decoration:none;color:var(--text);font-weight:850;}
    }
    `
  ]
})
export class HeaderComponent {
  protected open = false;

  toggle() {
    this.open = !this.open;
  }
}


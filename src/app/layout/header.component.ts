import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container header__inner">
        <a class="brand" href="#home" (click)="go('home');">

          <span class="brand__mark">☕</span>
          <span class="brand__name">Café Aurora</span>
        </a>

        <nav class="nav" aria-label="Main navigation">
          <a href="#home" [class.active]="activeSection() === 'home'" (click)="go('home');">Home</a>
          <a href="#about" [class.active]="activeSection() === 'about'" (click)="go('about');">About</a>
          <a href="#menu" [class.active]="activeSection() === 'menu'" (click)="go('menu');">Menu</a>

          <a href="#gallery" [class.active]="activeSection() === 'gallery'" (click)="go('gallery');">Gallery</a>


          <a href="#reservation" [class.active]="activeSection() === 'reservation'" (click)="go('reservation');">Reservations</a>

          <a href="#contact" [class.active]="activeSection() === 'contact'" (click)="go('contact');">Contact</a>

          <a href="#reviews" [class.active]="activeSection() === 'reviews'" (click)="go('reviews');">Reviews</a>
</nav>
        <button class="nav-toggle" type="button" aria-label="Open navigation" (click)="toggle()">
          ☰
        </button>
      </div>

      <div class="mobile" [class.mobile--open]="open">
        <div class="container mobile__inner">
          <a href="#home" (click)="go('home'); toggle();">Home</a>

          <a href="#about" (click)="go('about'); toggle();">About</a>

          <a href="#menu" (click)="go('menu'); toggle();">Menu</a>

          <a href="#gallery" (click)="go('gallery'); toggle();">Gallery</a>

          <a href="#reservation" (click)="go('reservation'); toggle();">Reservations</a>

          <a href="#contact" (click)="go('contact'); toggle();">Contact</a>

          <a href="#reviews" (click)="go('reviews'); toggle();">Reviews</a>

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
  private ignoreObserver = false;

  private router = inject(Router);
  private activeSectionSig = signal<string>('home');

  constructor() {
    if (typeof window !== 'undefined') {
      const ids = ['home', 'about', 'menu', 'gallery', 'reviews', 'reservation', 'contact'];
      const els = ids
        .map((id) => document.getElementById(id))
        .filter((x): x is HTMLElement => !!x);

      if (els.length) {
        const obs = new IntersectionObserver(
          (entries) => {
            const visible = entries
              .filter((e) => e.isIntersecting)
              .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

            const top = visible[0]?.target as HTMLElement | undefined;
            if (top?.id) this.activeSectionSig.set(top.id);
          },
          { root: null, threshold: [0.2, 0.35, 0.5, 0.65] }
        );

        els.forEach((el) => obs.observe(el));
      }
    }

    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.open = false;
    });
  }

  toggle() {
    this.open = !this.open;
  }

  protected activeSection(): string {
    return this.activeSectionSig();
  }
go(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  this.ignoreObserver = true;          // stop observer temporarily
  this.activeSectionSig.set(id);       // set clicked tab active

  el.scrollIntoView({ behavior: 'smooth', block: 'start' });

  setTimeout(() => {
    this.ignoreObserver = false;       // re-enable observer
  }, 800);
}
}


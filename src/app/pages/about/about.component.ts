import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
<section class="about-page reveal">
    <img class="about-bg" src="assets/hero/12.jpg" alt="Café interior" loading="lazy" />
    <div class="about-overlay" aria-hidden="true"></div>

    <div class="container about-content">
      <div class="about-head">
        <h1>About Us</h1>
        <p class="sub">
          At Café Aurora, we believe coffee is more than just a drink — it’s an experience that brings people together. Inspired by cozy conversations, peaceful mornings, and vibrant city café culture, Café Aurora was created as a warm escape where every cup tells a story.

From handcrafted coffees and refreshing beverages to comforting snacks and delightful desserts, our menu is thoughtfully curated to create moments worth sharing. Whether you're catching up with friends, working on your next big idea, or simply relaxing with your favorite brew, Café Aurora welcomes you with comfort, flavor, and calm vibes.
        </p>
      </div>

      <div class="grid">
        <div class="card">
          <h2>Our Place</h2>
          <p class="muted">Step into a warm, modern café built for great coffee and unforgettable conversations.</p>
        </div>

        <div class="card">
          <h2>Our Story</h2>
          <p>Founded with a passion for coffee and comfort, Café Aurora was designed to bring people together through great flavors and cozy experiences.</p>
        </div>

        <div class="card">
          <h2>Vision</h2>
          <p>To create a welcoming café experience that inspires comfort, connection, and creativity.</p>
        </div>

        <div class="card">
          <h2>Mission</h2>
          <p>To serve quality coffee, fresh food, and memorable moments in a warm and stylish atmosphere.</p>
        </div>

      </div>
    </div>
  `,
  styles: [
    `
.page-head{
      position:relative;
      padding:42px 0;
      overflow:hidden;
      border-bottom: 1px solid rgba(0,0,0,.05);
    }
    .page-head-bg{
      position:absolute;
      inset:0;
      width:100%;
      height:100%;
      object-fit:cover;
      z-index:0;
    }
    .page-head:before{
      content:'';
      position:absolute;
      inset:0;
      background:
        linear-gradient(90deg, rgba(0,0,0,.65), rgba(0,0,0,.15) 60%, rgba(0,0,0,.35));
      z-index:1;
    }
    .page-head .container{position:relative;z-index:2;}
    .container{max-width:1120px;margin:0 auto;padding:0 16px;}
    .page-head-inner{display:flex;align-items:center;justify-content:space-between;gap:24px;}
    .page-head-text{flex:1;}
    .page-head-media{flex:1;display:flex;justify-content:flex-end;}
.page-head-img-right{max-width:520px; max-height:160px; height:auto;}
    h1{margin:0 0 8px;font-size:2.2rem;}
    .sub{margin:0;color:rgb(120, 70, 20);font-weight:650;}
    .section{padding:40px 0;}
    .grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;}
.card{background:var(--card);border:1px solid var(--card-border);border-radius:16px;padding:18px;box-shadow:0 10px 25px rgba(0,0,0,.04);transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease;}
    .card:hover{transform:translateY(-4px);box-shadow:0 18px 45px rgba(0,0,0,.10);border-color:rgba(255,179,0,.35);}
    .card h2{margin:0 0 10px;font-size:1.25rem;}
    .card p{margin:0;color:var(--text);line-height:1.7;font-weight:600;}
    @media (max-width: 900px){.grid{grid-template-columns:1fr;}}
    
    .image-card{display:flex;flex-direction:column;gap:12px;}
.about-page{
      position:relative;
      overflow:hidden;
      min-height:80vh;
      padding:64px 0 56px;
    }
    .about-bg{
      position:absolute;
      inset:0;
      width:100%;
      height:100%;
      object-fit:cover;
      z-index:0;
      transform:scale(1.02);
    }
    .about-overlay{
      position:absolute;
      inset:0;
      z-index:1;
      background:linear-gradient(90deg, rgba(0,0,0,.70), rgba(0,0,0,.25) 60%, rgba(0,0,0,.45));
    }
    .container{max-width:1120px;margin:0 auto;padding:0 16px;}
    .about-content{position:relative;z-index:2;}
    .about-head{max-width:720px;margin-bottom:26px;}
    h1{margin:0 0 8px;font-size:2.2rem;color:rgba(255,255,255,.98);}
    .sub{margin:0;color:rgb(120, 70, 20);font-weight:650;}


    .grid

    .card{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);backdrop-filter: blur(6px);-webkit-backdrop-filter: blur(6px);border-radius:16px;padding:18px;box-shadow:0 10px 25px rgba(0,0,0,.10);transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease;}

    .card:hover{transform:translateY(-6px);box-shadow:0 18px 45px rgba(0,0,0,.20);border-color:rgba(72, 47, 41, 0.55);}
    .card h2{margin:0 0 10px;font-size:1.25rem;color:rgba(255,255,255,.97);}
    .card p{margin:0;color:rgba(255,255,255,.85);line-height:1.7;font-weight:600;}
    @media (max-width: 900px){.grid{grid-template-columns:1fr;}}
    .muted{margin:0;color:var(--muted);font-weight:650;}
    `
  ]
})
export class AboutComponent {}


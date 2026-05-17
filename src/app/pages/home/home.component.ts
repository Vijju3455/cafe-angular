import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page">

      <!-- BACKGROUND IMAGE -->
      <img class="bg" src="assets/hero/11.jpg" alt="Cafe background" />

      <!-- OVERLAY -->
      <div class="overlay"></div>

      <div class="content container">

        <!-- HERO -->
        <section class="hero">
          <p class="kicker">Welcome to Café Aurora</p>

          <h1>Fresh Brews. Cozy Corners. Endless Conversations.</h1>

          <p class="lead">
            Explore handcrafted coffees, refreshing drinks, tasty bites, and desserts made to brighten your day.
          </p>

          <!-- BUTTONS -->
          <div class="actions">
            <a class="btn primary" routerLink="/menu">View Menu</a>
            <a class="btn outline" routerLink="/reservation">Book a Table</a>
          </div>

          <!-- STATS -->
          <div class="stats">
            <div class="stat"><strong>4.8★</strong><span>Rating</span></div>
            <div class="stat"><strong>20+</strong><span>Items</span></div>
            <div class="stat"><strong>12 hrs</strong><span>Service</span></div>
          </div>
        </section>

        <!-- CARDS -->
        <section class="cards">

          <div class="card">
            <h2>Today’s Highlights</h2>
            <ul>
              <li>Smoked Vanilla Latte</li>
              <li>Masala Chai (House Blend)</li>
              <li>Garlic Butter Nachos</li>
            </ul>
            <a routerLink="/menu">Explore menu →</a>
          </div>

          <div class="card">
            <h2>Customer Love</h2>
            <p>“The ambience is perfect and the coffee tastes amazing!”</p>
            <small>— Asha</small>
          </div>

        </section>

      </div>
    </div>
  `,
  styles: [`
    /* PAGE */
    .page{
      position:relative;
      min-height:100vh;
      overflow:hidden;
      color:#fff;
    }

    /* BACKGROUND */
    .bg{
      position:absolute;
      inset:0;
      width:100%;
      height:100%;
      object-fit:cover;
      z-index:0;
    }

    /* DARK OVERLAY */
    .overlay{
      position:absolute;
      inset:0;
      background:rgba(0,0,0,.65);
      z-index:1;
    }

    .content{
      position:relative;
      z-index:2;
      padding:60px 16px;
    }

    /* HERO */
    .hero{
      text-align:center;
      max-width:900px;
      margin:auto;
    }

    .kicker{
      color:#ffd56a;
      letter-spacing:2px;
      font-weight:700;
      text-transform:uppercase;
    }

    h1{
      font-size:clamp(2rem,4vw,3.2rem);
      margin:10px 0;
      line-height:1.1;
    }

    .lead{
      color:rgba(255,255,255,.85);
      margin-bottom:20px;
    }

    /* BUTTONS */
    .actions{
      display:flex;
      gap:12px;
      justify-content:center;
      flex-wrap:wrap;
      margin-bottom:20px;
    }

    .btn{
      padding:10px 16px;
      border-radius:10px;
      text-decoration:none;
      font-weight:700;

      transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
    }

    .btn:hover{
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 10px 25px rgba(0,0,0,.35);
      filter: brightness(1.05);
    }

    .primary{
      background:#ffb300;
      color:#000;
    }

    .outline{
      border:1px solid #fff;
      color:#fff;
    }

    /* STATS */
    .stats{
      display:flex;
      gap:15px;
      justify-content:center;
      flex-wrap:wrap;
    }

    .stat{
      background:rgba(255,255,255,.1);
      padding:10px 14px;
      border-radius:12px;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      cursor:pointer;
    }

    .stat:hover{
      transform: scale(1.08);
      box-shadow: 0 12px 28px rgba(0,0,0,.35);
    }

    .stat strong{
      display:block;
      color:#ffd56a;
    }

    /* CARDS */
    .cards{
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:20px;
      margin-top:50px;
    }

    .card{
      background:rgba(255,255,255,.1);
      backdrop-filter:blur(10px);
      border:1px solid rgba(255,255,255,.2);
      padding:18px;
      border-radius:14px;

      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor:pointer;
    }

    .card:hover{
      transform:scale(1.06);
      box-shadow:0 15px 40px rgba(0,0,0,.4);
    }

    .card h2{
      margin-top:0;
      color:#ffd56a;
    }

    .card ul{
      padding-left:18px;
    }

    .card a{
      color:#ffb300;
      font-weight:700;
      text-decoration:none;
    }

    @media(max-width:768px){
      .cards{
        grid-template-columns:1fr;
      }
    }
  `]
})
export class HomeComponent {}
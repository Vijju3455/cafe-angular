import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../shared/cart.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section class="page-head">
      <div class="container">
        <h1>Checkout</h1>
        <p class="sub">Review your cart and place the order.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid">
          <div class="card">
            <h2>Order summary</h2>

            <div class="empty" *ngIf="cartCount() === 0">
              Your cart is empty. <a routerLink="/menu">Go to Menu</a>
            </div>

            <div class="items" *ngIf="cartCount() > 0">
              <div class="row" *ngFor="let it of cartItems()">
                <div>
                  <div class="name">{{ it.name }}</div>
                  <div class="meta">₹ {{ it.price }} × {{ it.qty }}</div>
                </div>
                <div class="right">₹ {{ it.price * it.qty }}</div>
              </div>

              <div class="divider"></div>

              <div class="total">
                <span>Total</span>
                <strong>₹ {{ cartTotal() }}</strong>
              </div>
            </div>
          </div>

          <div class="card card--form">
            <h2>Place order</h2>

<form #f="ngForm" class="form">
              <div class="field">
                <label>Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  [(ngModel)]="customerName"
                  placeholder="Your name"
                />
              </div>

              <div class="field">
                <label>Phone</label>
                <input
                  name="phone"
                  type="tel"
                  required
                  [(ngModel)]="customerPhone"
                  placeholder="Phone number"
                />
              </div>

              <div class="field">
                <label>Payment</label>
                <select name="payment" [(ngModel)]="paymentMethod" required>
                  <option value="cod">Cash on Delivery</option>
                  <option value="upi">UPI</option>
                </select>
              </div>

<button class="btn" type="button" (click)="placeOrder()" [disabled]="submitting">
                {{ submitting ? 'Placing...' : 'Place Order' }}
              </button>
            </form>

            <div class="success" *ngIf="orderPlaced()">
              ✅ Order is placed successfully!
            </div>

            <div class="error" *ngIf="errorMsg()">
              {{ errorMsg() }}
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .page-head{padding:42px 0;background:linear-gradient(135deg, rgba(255,179,0,.16), rgba(255,122,0,.06));border-bottom:1px solid rgba(0,0,0,.05);}
      .container{max-width:1120px;margin:0 auto;padding:0 16px;}
      h1{margin:0 0 8px;font-size:2.2rem;}
      .sub{margin:0;color:var(--muted);font-weight:650;}

      .section{padding:26px 0 52px;}
      .grid{display:grid;grid-template-columns:1.2fr .8fr;gap:16px;align-items:start;}
      .card{background:var(--card);border:1px solid var(--card-border);border-radius:16px;padding:18px;box-shadow:0 10px 25px rgba(0,0,0,.04);}
      .card--form{background:linear-gradient(180deg, var(--card), rgba(255,179,0,.03));}
      h2{margin:0 0 14px;font-size:1.25rem;}

      .empty{color:var(--muted);font-weight:650;line-height:1.6;}
      .empty a{color:#ff7a00;font-weight:900;}

      .items{display:flex;flex-direction:column;gap:10px;}
      .row{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;padding:10px 0;}
      .name{font-weight:950;color:#111;}
      .meta{margin-top:4px;color:#666;font-weight:650;font-size:.95rem;}
      .right{font-weight:1000;color:#111;}
      .divider{height:1px;background:var(--card-border);margin:14px 0;}
      .total{display:flex;align-items:center;justify-content:space-between;font-weight:950;color:#111;}

      .form{display:flex;flex-direction:column;gap:12px;}
      .field label{display:block;font-weight:850;color:var(--text);margin-bottom:8px;font-size:.9rem;}
      input, select{width:100%;border:1px solid var(--card-border);border-radius:12px;padding:10px 12px;font-weight:650;outline:none;background:#fff;}

      .btn{margin-top:6px;background:#ffb300;color:var(--text);border:none;border-radius:12px;padding:12px 16px;font-weight:900;cursor:pointer;}
      .btn:disabled{opacity:.65;cursor:not-allowed;}

      .success{margin-top:12px;padding:10px 12px;border-radius:12px;background:rgba(29,185,84,.12);border:1px solid rgba(29,185,84,.35);color:#0b6b2e;font-weight:900;}
      .error{margin-top:12px;padding:10px 12px;border-radius:12px;background:rgba(220,53,69,.12);border:1px solid rgba(220,53,69,.35);color:#a11f2a;font-weight:900;}

      @media (max-width: 940px){.grid{grid-template-columns:1fr;}}
    `,
  ],
})
export class CheckoutComponent {
  private cart = inject(CartService);
  private router = inject(Router);

  customerName = '';
  customerPhone = '';
  paymentMethod: 'cod' | 'upi' = 'cod';

  protected submitting = false;
  private orderPlacedSig = signal(false);
  protected errorMsg = signal<string | null>(null);

  protected cartCount = () => this.cart.getCount();
  protected cartItems = () => this.cart.getItemsArray();

  protected cartTotal = () => this.cart.getTotal();

  orderPlaced() {
    return this.orderPlacedSig();
  }

  placeOrder() {
    this.errorMsg.set(null);
    this.orderPlacedSig.set(false);

    if (this.cartCount() === 0) {
      this.errorMsg.set('Cart is empty. Add items from the menu first.');
      return;
    }

    // Simple validation (template already requires fields)
    if (!this.customerName.trim() || !this.customerPhone.trim()) {
      this.errorMsg.set('Please enter your name and phone.');
      return;
    }

    this.submitting = true;

    // Simulate success
    setTimeout(() => {
      this.cart.clear();
      this.submitting = false;
      this.orderPlacedSig.set(true);

      // Keep user on checkout page to see the success message.
      // Optionally navigate after some time:
      // setTimeout(() => this.router.navigate(['/menu']), 1500);
    }, 700);
  }
}


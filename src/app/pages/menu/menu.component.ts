import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../shared/cart.service';
import { Router } from '@angular/router';


type MenuCategory = 'Coffee' | 'Tea' | 'Snacks' | 'Desserts' | 'Beverages';

type MenuItem = {
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image?: string;
};

const MENU: MenuItem[] = [
  {
    category: 'Coffee',
    name: 'Smoked Vanilla Latte',
    description: 'Creamy espresso with a smoky vanilla twist.',
    price: 220,
    image: 'coffee-latte.jpg',
  },
  {
    category: 'Coffee',
    name: 'Caramel Cold Brew',
    description: 'Slow-steeped cold brew layered with caramel.',
    price: 260,
    image: 'coffee-coldbrew.jpg',
  },
  {
    category: 'Coffee',
    name: 'Classic Cappuccino',
    description: 'Rich foam on a balanced espresso base.',
    price: 200,
    image: 'coffee-cappuccino.jpg',
  },

  {
    category: 'Coffee',
    name: 'Mocha Affogato',
    description: 'Espresso poured over vanilla gelato with chocolate drizzle.',
    price: 320,
    image: 'coffee-mocha-affogato.jpg',
  },
  {
    category: 'Coffee',
    name: 'Iced Spanish Latte',
    description: 'Caramel-spiced latte served chilled with a silky finish.',
    price: 290,
    image: 'coffee-iced-spanish.jpg',
  },
  {
    category: 'Coffee',
    name: 'Hazelnut Espresso',
    description: 'Bold espresso with roasted hazelnut flavor and crema.',
    price: 240,
    image: 'coffee-hazelnut.jpg',
  },

  {
    category: 'Tea',
    name: 'Masala Chai (House Blend)',
    description: 'Warm spices with strong tea aroma.',
    price: 120,
    image: 'tea-masala.jpg',
  },
  {
    category: 'Tea',
    name: 'Green Tea Citrus',
    description: 'Fresh citrus notes with a clean finish.',
    price: 140,
    image: 'tea-green.jpg',
  },
  {
    category: 'Tea',
    name: 'Jasmine Green Tea',
    description: 'Floral jasmine infusion with a refreshing, light body.',
    price: 150,
    image: 'tea-jasmine.jpg',
  },
  {
    category: 'Tea',
    name: 'Lemon Ginger Tea',
    description: 'Zesty lemon with warming ginger spice.',
    price: 160,
    image: 'tea-lemon-ginger.jpg',
  },
  {
    category: 'Tea',
    name: 'Chamomile Honey Tea',
    description: 'Calming chamomile with a touch of honey sweetness.',
    price: 170,
    image: 'tea-chamomile-honey.jpg',
  },

  {
    category: 'Snacks',
    name: 'Garlic Butter Nachos',
    description: 'Crispy nachos with garlic butter and cheese.',
    price: 190,
    image: 'snack-nachos.jpg',
  },
  {
    category: 'Snacks',
    name: 'Peri-Peri Fries',
    description: 'Spicy peri-peri seasoning with a tangy dip.',
    price: 160,
    image: 'snack-fries.jpg',
  },
  {
    category: 'Snacks',
    name: 'Cheesy Garlic Bread',
    description: 'Toasted bread with garlic butter and melted cheese.',
    price: 180,
    image: 'snack-garlic-bread.jpg',
  },
  {
    category: 'Snacks',
    name: 'Spicy Veg Sliders',
    description: 'Mini veggie sliders with peri-peri mayo.',
    price: 210,
    image: 'snack-veg-sliders.jpg',
  },
  {
    category: 'Snacks',
    name: 'Paneer Tikka Bites',
    description: 'Char-grilled paneer with smoky spices and mint sauce.',
    price: 240,
    image: 'snack-paneer-tikka.jpg',
  },

  {
    category: 'Desserts',
    name: 'Chocolate Lava Cake',
    description: 'Warm center with molten chocolate.',
    price: 240,
    image: 'dessert-lava.jpg',
  },
  {
    category: 'Desserts',
    name: 'Vanilla Bean Cheesecake',
    description: 'Creamy cheesecake with vanilla aroma.',
    price: 260,
    image: 'dessert-cheesecake.jpg',
  },
  {
    category: 'Desserts',
    name: 'Strawberry Velvet Pastry',
    description: 'Flaky layers with strawberry cream and a tangy glaze.',
    price: 280,
    image: 'dessert-strawberry-velvet.jpg',
  },
  {
    category: 'Desserts',
    name: 'Caramel Crunch Brownie',
    description: 'Fudgy brownie topped with caramel and crunchy bits.',
    price: 250,
    image: 'dessert-caramel-brownie.jpg',
  },
  {
    category: 'Desserts',
    name: 'Coconut Choco Truffle',
    description: 'Rich chocolate truffles with coconut snow-like finish.',
    price: 270,
    image: 'dessert-coconut-truffle.jpg',
  },

  {
    category: 'Beverages',
    name: 'Mojito',
    description: 'Fresh mint, lime, and sparkling refreshment.',
    price: 210,
    image: 'bev-mojito.jpg',
  },
  {
    category: 'Beverages',
    name: 'Mango Sparkler',
    description: 'Sweet mango with a fizzy finish.',
    price: 200,
    image: 'bev-mango.jpg',
  },
  {
    category: 'Beverages',
    name: 'Berry Blast Cooler',
    description: 'A vibrant mix of berries blended with cool, creamy notes.',
    price: 230,
    image: 'bev-berry-blast.jpg',
  },
  {
    category: 'Beverages',
    name: 'Cucumber Mint Refresher',
    description: 'Crisp cucumber with mint and a light citrus lift.',
    price: 190,
    image: 'bev-cucumber-mint.jpg',
  },
  {
    category: 'Beverages',
    name: 'Vanilla Iced Shake',
    description: 'Creamy vanilla shake served extra chilled.',
    price: 240,
    image: 'bev-vanilla-shake.jpg',
  },
];

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="page-head">
      <div class="container">
        <h1>Menu</h1>
        <p class="sub">Browse categories, explore descriptions, and find your perfect pick.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="toolbar">
          <div class="field">
            <label>Search</label>
            <input
              type="text"
              [ngModel]="query()"
              (ngModelChange)="query.set($event)"
              placeholder="Search items..."
            />
          </div>

          <div class="field">
            <label>Category</label>
           <select
  [ngModel]="category()"
  (ngModelChange)="category.set($event)"
>
              <option value="all">All</option>
              <option *ngFor="let c of categories" [value]="c">{{ c }}</option>
            </select>
          </div>

          <div class="field field--cart">
            <label>Cart</label>
            <button type="button" class="cart-btn" (click)="toggleCart()">
              🛒 View Cart
              <span class="badge" *ngIf="cartCount() > 0">{{ cartCount() }}</span>
            </button>
            <div class="cart-total" *ngIf="cartCount() > 0">Total: ₹ {{ cartTotal() }}</div>
          </div>
        </div>

        <div class="cards">
          <div class="card" *ngFor="let item of filtered()">
            <div class="card__img">
              <img [src]="asset(item.image)" [alt]="item.name" loading="lazy" />
            </div>

            <div class="card__body">
              <div class="card__top">
                <h3>{{ item.name }}</h3>
                <div class="price">₹ {{ item.price }}</div>
              </div>

              <p class="desc">{{ item.description }}</p>
              <div class="tag">{{ item.category }}</div>

              <button type="button" class="add-btn" (click)="addToCart(item)">
                + Add to cart
              </button>
            </div>
          </div>
        </div>

        <p class="hint" *ngIf="filtered().length === 0">No items match your search.</p>
      </div>
    </section>

    <aside class="cart-drawer" [class.cart-drawer--open]="cartOpen" aria-label="Cart drawer">
      <div class="cart-drawer__header">
        <div>
          <div class="cart-drawer__title">Your Cart</div>
          <div class="cart-drawer__meta" *ngIf="cartCount() > 0">{{ cartCount() }} item(s)</div>
          <div class="cart-drawer__meta" *ngIf="cartCount() === 0">Cart is empty</div>
        </div>
        <button class="icon-btn" type="button" (click)="toggleCart()" aria-label="Close cart">✕</button>
      </div>

      <div class="cart-drawer__body">
        <div class="cart-empty" *ngIf="cartCount() === 0">
          Add items from the menu to see them here.
        </div>

        <div class="cart-items" *ngIf="cartCount() > 0">
          <div class="cart-item" *ngFor="let it of cartItems()">
            <div>
              <div class="cart-item__name">{{ it.name }}</div>
              <div class="cart-item__sub">₹ {{ it.price }} × {{ it.qty }}</div>
            </div>

            <div class="cart-item__right">
              <div class="cart-item__line">₹ {{ it.price * it.qty }}</div>
              <button class="link-btn" type="button" (click)="removeFromCart(it.name)">Remove</button>
            </div>
          </div>
        </div>
      </div>

      <div class="cart-drawer__footer" *ngIf="cartCount() > 0">
        <div class="cart-total-row">
          <span>Total</span>
          <strong>₹ {{ cartTotal() }}</strong>
        </div>
        <div class="cart-actions">
          <button class="btn btn--outline" type="button" (click)="clearCart()">Clear cart</button>
          <button
            class="btn btn--primary"
            type="button"
            (click)="checkout()"
          >
            Checkout
          </button>

        </div>
      </div>
    </aside>
  `,
  styles: [
    `
    .page-head{padding:42px 0;background:linear-gradient(135deg, rgba(255,179,0,.16), rgba(255,122,0,.06));border-bottom:1px solid rgba(0,0,0,.05);}
    .container{max-width:1120px;margin:0 auto;padding:0 16px;}
    h1{margin:0 0 8px;font-size:2.2rem;}
.sub{margin:0;color:var(--muted);font-weight:650;}
    .section{padding:26px 0 52px;}
    .toolbar{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:18px;align-items:flex-end;}

.field{min-width:220px;background:var(--card);border:1px solid var(--card-border);border-radius:14px;padding:12px;box-shadow:0 10px 20px rgba(0,0,0,.03);}
    .field--cart{min-width:240px;display:flex;flex-direction:column;gap:10px;}
label{display:block;font-weight:800;color:var(--text);margin-bottom:8px;font-size:.9rem;}
input, select{width:100%;border:1px solid var(--card-border);border-radius:10px;padding:10px 12px;font-weight:600;outline:none;}

    .cart-btn{width:100%;border:1px solid rgba(255,179,0,.55);background:rgba(255,179,0,.14);border-radius:12px;padding:10px 12px;font-weight:950;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:10px;}
    .badge{display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:22px;padding:0 8px;border-radius:999px;background:#ffb300;color:#1b1b1b;font-weight:950;border:1px solid rgba(0,0,0,.12);}
    .cart-total{color:#8a4b00;font-weight:950;}

    .cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;}
    .card{background:var(--card);border:1px solid var(--card-border);border-radius:16px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,.03);display:flex;flex-direction:column;}
    .card__img{height:160px;background:linear-gradient(135deg,#ffe0a6,#fff);}
    .card__img img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.95);transform:scale(1);transition:transform .25s ease, filter .25s ease;}
    .card:hover .card__img img{transform:scale(1.08);filter:saturate(1.05) brightness(1.03);}
    .card__body{padding:14px;display:flex;flex-direction:column;gap:10px;}
    .card__top{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;}
h3{margin:0;font-size:1.1rem;line-height:1.25;color:var(--text);}
    .price{font-weight:900;color:#ff7a00;white-space:nowrap;}
.desc{margin:0;color:var(--muted);line-height:1.6;font-weight:550;min-height:48px;}
    .tag{align-self:flex-start;background:rgba(255,179,0,.14);border:1px solid rgba(255,179,0,.35);color:#8a4b00;font-weight:900;padding:7px 10px;border-radius:999px;font-size:.82rem;}
    .add-btn{margin-top:auto;border:none;background:#1b1b1b;color:#fff;border-radius:12px;padding:10px 12px;font-weight:950;cursor:pointer;}
    .add-btn:hover{filter:brightness(.98)}

.hint{margin-top:14px;color:var(--muted);font-weight:650;}

    .cart-drawer{position:fixed;top:0;right:0;width:min(420px,100vw);height:100vh;background:rgba(255,255,255,.98);border-left:1px solid rgba(0,0,0,.08);box-shadow:-20px 0 60px rgba(0,0,0,.18);transform:translateX(105%);transition:transform .18s ease;display:flex;flex-direction:column;z-index:120;}
    .cart-drawer--open{transform: translateX(0);}
    .cart-drawer__header{padding:16px;border-bottom:1px solid rgba(0,0,0,.06);display:flex;align-items:flex-start;justify-content:space-between;gap:12px;}
    .cart-drawer__title{font-weight:1000;font-size:1.2rem;color:#111;}
    .cart-drawer__meta{margin-top:4px;color:#666;font-weight:650;}
    .icon-btn{border:1px solid rgba(0,0,0,.10);background:#fff;border-radius:12px;padding:8px 10px;font-weight:900;cursor:pointer;}

    .cart-drawer__body{padding:14px;overflow:auto;flex:1;}
    .cart-empty{color:#555;font-weight:650;line-height:1.6;padding:10px 0;}

    .cart-items{display:flex;flex-direction:column;gap:10px;}
    .cart-item{border:1px solid rgba(0,0,0,.06);border-radius:14px;padding:12px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;background:#fff;}
    .cart-item__name{font-weight:950;color:#111;}
    .cart-item__sub{margin-top:4px;color:#666;font-weight:650;font-size:.95rem;}
    .cart-item__right{display:flex;flex-direction:column;align-items:flex-end;gap:8px;}
    .cart-item__line{font-weight:1000;color:#111;}
    .link-btn{border:none;background:transparent;color:#ff7a00;font-weight:950;cursor:pointer;text-decoration:underline;}

    .cart-drawer__footer{padding:14px;border-top:1px solid rgba(0,0,0,.06);background:#fff;}
    .cart-total-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;font-weight:950;color:#111;}
    .cart-actions{display:flex;gap:10px;}
    .btn{flex:1;border-radius:12px;padding:10px 12px;font-weight:1000;cursor:pointer;border:1px solid rgba(0,0,0,.12);}
    .btn--primary{background:#ffb300;border-color:rgba(0,0,0,.12);}
    .btn--outline{background:#fff;}

    @media (max-width: 980px){.cards{grid-template-columns:repeat(2,minmax(0,1fr));}}
    @media (max-width: 640px){.cards{grid-template-columns:1fr;}.field{min-width:100%;}.toolbar{align-items:stretch;}.field--cart{min-width:100%;}}
  `,
  ],
})
export class MenuComponent {
  private cart = inject(CartService);
  private router = inject(Router);

  checkout() {
    this.router.navigate(['/checkout']);
    // Keep drawer open/closed as-is; navigation will switch page.
  }


  protected categories: MenuCategory[] = ['Coffee', 'Tea', 'Snacks', 'Desserts', 'Beverages'];
  // protected query = '';

  // Make sure category is always a plain string that exactly matches either:
  // - "all" from the <select>
  // - or one of the MenuCategory literal strings
  //protected category: 'all' | MenuCategory = 'all';

  protected query = signal('');

  protected category = signal<'all' | MenuCategory>('all');

  protected cartOpen = false;

  protected filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const selected = this.category().toLowerCase();

    return MENU.filter((it) => {
      const matchQ =
        !q ||
        `${it.name} ${it.description} ${it.category}`
          .toLowerCase()
          .includes(q);

      const matchC =
        selected === 'all' || it.category.toLowerCase() === selected;

      return matchQ && matchC;
    });
  });

  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }

  addToCart(item: MenuItem) {
    this.cart.add({ name: item.name, price: item.price, category: item.category }, 1);
    this.cartOpen = true;
  }

  removeFromCart(name: string) {
    this.cart.remove(name);
  }

  clearCart() {
    this.cart.clear();
  }

  protected cartCount() {
    return this.cart.getCount();
  }

  protected cartTotal() {
    return this.cart.getTotal();
  }

  protected cartItems() {
    return this.cart.getItemsArray();
  }


  asset(file?: string) {
    // images are under src/assets/menu-categories/
    return file ? `assets/menu-categories/${file}` : 'assets/placeholder.png';
  }
}





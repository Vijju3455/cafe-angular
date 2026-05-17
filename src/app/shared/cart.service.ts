import { Injectable, signal } from '@angular/core';

export type CartItem = {
  name: string;
  price: number;
  category: string;
  qty: number;
};

const STORAGE_KEY = 'mycafe_cart_v1';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSig = signal<CartItem[]>([]);

  constructor() {
    this.load();
  }

  items = this.itemsSig.asReadonly();

  // Returns a plain array (useful for templates).
  getItemsArray() {
    return this.itemsSig();
  }


  add(item: Omit<CartItem, 'qty'>, qty = 1) {
    const next = [...this.itemsSig()];
    const idx = next.findIndex((x) => x.name === item.name);
    if (idx >= 0) next[idx] = { ...next[idx], qty: next[idx].qty + qty };
    else next.push({ ...item, qty });
    this.itemsSig.set(next);
    this.persist();
  }

  remove(name: string) {
    this.itemsSig.set(this.itemsSig().filter((x) => x.name !== name));
    this.persist();
  }

  clear() {
    this.itemsSig.set([]);
    this.persist();
  }

  getCount() {
    return this.itemsSig().reduce((sum, x) => sum + x.qty, 0);
  }

  getTotal() {
    return this.itemsSig().reduce((sum, x) => sum + x.qty * x.price, 0);
  }

  private load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CartItem[];
      if (Array.isArray(parsed)) this.itemsSig.set(parsed);
    } catch {
      // ignore
    }
  }

  private persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.itemsSig()));
    } catch {
      // ignore
    }
  }
}


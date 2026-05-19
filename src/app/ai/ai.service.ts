import { Injectable } from '@angular/core';

export type ChatMessage = {
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
};

const MENU_SAMPLE = [
  { name: 'Smoked Vanilla Latte', price: '₹220', keywords: ['coffee', 'latte'] },
  { name: 'Masala Chai (House Tea)', price: '₹120', keywords: ['tea', 'chai'] },
  { name: 'Cappuccino', price: '₹200', keywords: ['coffee'] },
  { name: 'Green Tea', price: '₹110', keywords: ['tea'] },
  { name: 'Chocolate Cake', price: '₹240', keywords: ['cake', 'dessert'] },
  { name: 'Nachos', price: '₹190', keywords: ['snack'] },
];

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

@Injectable({ providedIn: 'root' })
export class AiService {

  getReply(userText: string) {
    const s = normalize(userText);

    // 🍽 MENU
    if (/(menu|items|food)/.test(s)) {
      return `🍽 Menu:\n` + MENU_SAMPLE.map(x => `• ${x.name} — ${x.price}`).join('\n');
    }

    // 🕒 HOURS
    if (/(open|hours|closing|time)/.test(s)) {
      return `🕒 We are open 10:00 AM – 10:00 PM daily.`;
    }

    // 📞 CONTACT
    if (/(contact|phone|email|address)/.test(s)) {
      return `📞 Contact: +91 98765 43210\n📍 12 Market Street, Bengaluru`;
    }

    // 💰 PRICE LOGIC (FIXED FOR ALL ITEMS)
    if (/(price|cost|how much)/.test(s)) {

      // 1️⃣ CATEGORY MATCH (tea, coffee, dessert etc.)
      const categoryItems = MENU_SAMPLE.filter(item =>
        item.keywords.some(k => s.includes(k))
      );

      if (categoryItems.length > 0) {
        return `🧾 Matching Items:\n` +
          categoryItems.map(x => `• ${x.name} — ${x.price}`).join('\n');
      }

      // 2️⃣ SPECIFIC ITEM MATCH
      const exactItem = MENU_SAMPLE.find(item =>
        s.includes(item.name.toLowerCase())
      );

      if (exactItem) {
        return `🧾 Price Details:\n• ${exactItem.name} — ${exactItem.price}`;
      }

      // 3️⃣ DEFAULT FULL MENU
      return `💰 Menu Prices:\n` +
        MENU_SAMPLE.map(x => `• ${x.name} — ${x.price}`).join('\n');
    }

    return `I can help with menu, prices, opening hours, and contact info.`;
  }
}
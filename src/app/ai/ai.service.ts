export type ChatMessage = { role: 'user' | 'assistant'; text: string; timestamp: number };

type AiIntent =
  | 'menu'
  | 'prices'
  | 'opening_hours'
  | 'reservation'
  | 'contact'
  | 'vegetarian'
  | 'greeting'
  | 'fallback';

type AiAnswer = { intent: AiIntent; text: string };

const OPENING_HOURS = [
  { label: 'Mon–Thu', value: '10:00 AM – 10:00 PM' },
  { label: 'Fri–Sat', value: '10:00 AM – 11:00 PM' },
  { label: 'Sunday', value: '10:00 AM – 9:00 PM' },
];

const CONTACT = {
  address: '12 Market Street, Bengaluru',
  phone: '+91 98765 43210',
  email: 'hello@mycafe.com',
};

const MENU_SAMPLE = [
  { name: 'Smoked Vanilla Latte', price: '₹220' },
  { name: 'Masala Chai (House Blend)', price: '₹120' },
  { name: 'Garlic Butter Nachos', price: '₹190' },
  { name: 'Chocolate Lava Cake', price: '₹240' },
  { name: 'Virgin Mojito', price: '₹210' },
];

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function detectIntent(q: string): AiAnswer {
  const s = normalize(q);

  if (!s) return { intent: 'fallback', text: 'Ask me about menu items, prices, opening hours, reservations, or contact info.' };

  if (/(hi|hello|hey|good morning|good evening|hii|namaste)/.test(s)) {
    return { intent: 'greeting', text: 'Welcome to MY Cafe! What can I help you with today—menu, prices, hours, reservations, or contact?' };
  }

  if (/(vegetarian|veg\b|pure veg)/.test(s)) {
    return {
      intent: 'vegetarian',
      text: 'We have vegetarian-friendly options like Garlic Butter Nachos and desserts. Tell me what you’re craving and I’ll suggest a few picks.'
    };
  }

  if (/(price|cost|how much|₹|rupees)/.test(s)) {
    const items = MENU_SAMPLE.map((x) => `• ${x.name} — ${x.price}`).join('\n');
    return {
      intent: 'prices',
      text: `Here are some popular items and their prices:\n${items}\n\nFor the complete list, open the Menu page.`
    };
  }

  if (/(opening|hours|when are you open|open till|close|close time)/.test(s)) {
    const hours = OPENING_HOURS.map((h) => `• ${h.label}: ${h.value}`).join('\n');
    return {
      intent: 'opening_hours',
      text: `MY Cafe opening hours:\n${hours}`
    };
  }

  if (/(reserve|reservation|book table|booking|table|seat)/.test(s)) {
    return {
      intent: 'reservation',
      text: 'You can book a table from the Reservation page. Fill in your name, phone, date/time, and number of guests. (This demo stores requests in your browser localStorage.)'
    };
  }

  if (/(contact|email|phone|address|location)/.test(s)) {
    return {
      intent: 'contact',
      text: `Here’s our contact info:\n• Address: ${CONTACT.address}\n• Phone: ${CONTACT.phone}\n• Email: ${CONTACT.email}`
    };
  }

  if (/(menu|what do you have|items|coffee|tea|snacks|dessert|beverages)/.test(s)) {
    const items = MENU_SAMPLE.map((x) => `• ${x.name} (${x.price})`).join('\n');
    return {
      intent: 'menu',
      text: `Popular picks from our Menu:\n${items}\n\nWant coffee, tea, snacks, or desserts?`
    };
  }

  return {
    intent: 'fallback',
    text: 'I can help with menu items, prices, opening hours, reservations, and contact information. Try asking: “What are your opening hours?” or “Price of masala chai?”'
  };
}

export class AiService {
  getReply(userText: string) {
    return detectIntent(userText).text;
  }
}


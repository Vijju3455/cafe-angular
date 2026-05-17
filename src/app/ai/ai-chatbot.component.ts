import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService, type ChatMessage } from './ai.service';

@Component({
  selector: 'app-ai-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <button class="fab" type="button" (click)="togglePanel()" aria-label="Open chatbot">
      🤖
    </button>

    <aside class="panel" [class.panel--open]="open" aria-live="polite" aria-label="AI Chatbot">
      <header class="panel__header">
        <div class="panel__title">
          <span class="dot"></span>
          <strong>AI Cafe Assistant</strong>
        </div>
        <button class="icon-btn" type="button" (click)="clear()" [disabled]="messages().length === 0">
          Clear
        </button>
      </header>

      <div class="panel__body" #scrollEl>
        <div class="empty" *ngIf="messages().length === 0">
          Ask about menu items, prices, opening hours, reservations, or contact.
        </div>

        <div class="bubble bubble--user" *ngFor="let m of messages(); trackBy: trackByIdx">
          <div class="bubble__text">{{ m.text }}</div>
        </div>

        <div class="bubble bubble--assistant" *ngFor="let a of assistantMessages(); trackBy: trackByIdx">
          <div class="bubble__text">{{ a.text }}</div>
        </div>
      </div>

      <footer class="panel__footer">
        <div class="suggestions">
          <button type="button" class="chip" *ngFor="let s of suggestions" (click)="ask(s)">{{s}}</button>
        </div>

        <form class="input" (ngSubmit)="send()">
          <input
            name="q"
            type="text"
            [(ngModel)]="draft"
            placeholder="Type your question..."
            autocomplete="off"
          />
          <button type="submit" [disabled]="!draft.trim()">Send</button>
        </form>
      </footer>
    </aside>
  `,
  styles: [`
    .fab{
      position:fixed;
      right:18px;
      bottom:18px;
      width:56px;
      height:56px;
      border-radius:18px;
      border:none;
      background:#ffb300;
      color:#1b1b1b;
      font-size:22px;
      font-weight:900;
      box-shadow:0 18px 45px rgba(0,0,0,.25);
      cursor:pointer;
      z-index:100;
    }

    .panel{
      position:fixed;
      right:18px;
      bottom:86px;
      width:min(380px, calc(100vw - 36px));
      height: min(520px, 70vh);
      background:rgba(255,255,255,.95);
      border:1px solid rgba(0,0,0,.08);
      border-radius:18px;
      box-shadow:0 18px 55px rgba(0,0,0,.22);
      z-index:100;
      transform: translateY(10px);
      opacity:0;
      pointer-events:none;
      transition: opacity .14s ease, transform .14s ease;
      display:flex;
      flex-direction:column;
      overflow:hidden;
    }
    .panel--open{opacity:1;pointer-events:auto;transform: translateY(0);}

    .panel__header{
      padding:12px 14px;
      display:flex;
      align-items:center;
      justify-content:space-between;
      border-bottom:1px solid rgba(0,0,0,.06);
      background: linear-gradient(135deg, rgba(255,179,0,.22), rgba(255,122,0,.06));
    }
    .panel__title{display:flex;align-items:center;gap:10px;}
    .dot{width:10px;height:10px;border-radius:999px;background:#1db954;box-shadow:0 0 0 5px rgba(29,185,84,.15);}
    .icon-btn{
      border:1px solid rgba(0,0,0,.10);
      background:#fff;
      border-radius:12px;
      padding:8px 10px;
      font-weight:900;
      cursor:pointer;
    }
    .icon-btn:disabled{opacity:.55;cursor:not-allowed;}

    .panel__body{
      padding:14px;
      overflow:auto;
      flex:1;
      display:flex;
      flex-direction:column;
      gap:10px;
    }

    .empty{color:#555;font-weight:650;line-height:1.6;padding:10px 0;}

    .bubble{max-width:90%;padding:10px 12px;border-radius:14px;border:1px solid rgba(0,0,0,.06);}
    .bubble--user{align-self:flex-end;background:#1b1b1b;color:#fff;}
    .bubble--assistant{align-self:flex-start;background:#fff;color:#111;}
    .bubble__text{white-space:pre-wrap;line-height:1.5;font-weight:600;}

    .panel__footer{padding:12px 14px;border-top:1px solid rgba(0,0,0,.06);background:#fff;}
    .suggestions{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px;}
    .chip{border:1px solid rgba(255,179,0,.45);background:rgba(255,179,0,.14);color:#7a3c00;font-weight:900;border-radius:999px;padding:7px 10px;cursor:pointer;}
    .chip:hover{filter:brightness(.98)}

    .input{display:flex;gap:10px;align-items:center;}
    input{flex:1;border:1px solid rgba(0,0,0,.12);border-radius:14px;padding:10px 12px;font-weight:650;outline:none;}
    button[type=submit]{border:none;background:#ffb300;border-radius:14px;padding:10px 14px;font-weight:950;cursor:pointer;}
    button[type=submit]:disabled{opacity:.6;cursor:not-allowed;}
  `]
})
export class AiChatbotComponent {
  // Using signals to keep it standalone and simple.
  private svc = new AiService();

  protected open = false;
  protected draft = '';
  protected messages = signal<ChatMessage[]>([]);

  protected suggestions = [
    'What are your opening hours?',
    'Price of masala chai?',
    'How to book a table?',
    'Contact details',
    'Do you have vegetarian options?'
  ];

  protected assistantMessages = signal<ChatMessage[]>([]);

  // Keep the scroll simple: rely on browser to handle it. (No heavy DOM manipulation.)

  togglePanel() {
    this.open = !this.open;
  }

  clear() {
    this.messages.set([]);
    this.assistantMessages.set([]);
    this.draft = '';
  }

  protected trackByIdx = (i: number) => i;

  send() {
    const text = this.draft.trim();
    if (!text) return;

    const userMsg: ChatMessage = { role: 'user', text, timestamp: Date.now() };
    this.messages.set([...
      this.messages(),
      userMsg
    ]);

    const reply = this.svc.getReply(text);
    const assistantMsg: ChatMessage = { role: 'assistant', text: reply, timestamp: Date.now() };
    this.assistantMessages.set([...this.assistantMessages(), assistantMsg]);

    this.draft = '';
  }

  ask(q: string) {
    this.draft = q;
    this.send();
  }
}


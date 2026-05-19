import { Component, NgZone, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService, ChatMessage } from './ai.service';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <button class="fab" (click)="toggle()">🤖</button>

    <div class="overlay" *ngIf="open" (click)="toggle()"></div>

    <aside class="panel" [class.open]="open">

      <header class="header">
        <div>AI Cafe Assistant</div>

        <div class="actions">
          <button (click)="toggleVoice()">🎤</button>
          <button (click)="clearChat()">🗑</button>
        </div>
      </header>

      <div class="body">
        <div *ngIf="messages().length === 0" class="empty">
          Ask about tea, coffee, menu or prices ☕
        </div>

        <div *ngFor="let m of messages()" class="msg" [class.user]="m.role==='user'">
          {{ m.text }}
        </div>
      </div>

      <div class="chips">
        <button (click)="ask('price of tea')">Tea</button>
        <button (click)="ask('price of coffee')">Coffee</button>
        <button (click)="ask('price of cake')">Cake</button>
        <button (click)="ask('menu')">Menu</button>
      </div>

      <form (ngSubmit)="send()" class="input">
        <input [(ngModel)]="draft" name="q" placeholder="Type message..." />
        <button type="submit">Send</button>
      </form>

    </aside>
  `,
  styles: [`
    .fab{
      position:fixed;
      right:20px;
      bottom:20px;
      width:58px;
      height:58px;
      border-radius:16px;
      border:none;
      background:#ffb300;
      font-size:22px;
      cursor:pointer;
      z-index:1000;
    }

    .overlay{
      position:fixed;
      inset:0;
      background:rgba(0,0,0,.3);
    }

    .panel{
      position:fixed;
      right:20px;
      bottom:90px;
      width:380px;
      height:520px;
      background:#fff;
      border-radius:16px;
      box-shadow:0 20px 50px rgba(0,0,0,.25);
      display:flex;
      flex-direction:column;
      opacity:0;
      pointer-events:none;
      transition:.2s;
    }

    .panel.open{
      opacity:1;
      pointer-events:auto;
    }

    .header{
      display:flex;
      justify-content:space-between;
      padding:12px;
      font-weight:700;
      background:#fff3d6;
    }

    .body{
      flex:1;
      overflow:auto;
      padding:10px;
      display:flex;
      flex-direction:column;
      gap:8px;
    }

    .msg{
      background:#f1f1f1;
      padding:8px;
      border-radius:10px;
    }

    .user{
      background:#1b1b1b;
      color:#fff;
      margin-left:auto;
    }

    .chips{
      display:flex;
      gap:6px;
      padding:8px;
    }

    .chips button{
      background:#ffe0a3;
      border:none;
      padding:6px 10px;
      border-radius:999px;
      cursor:pointer;
    }

    .input{
      display:flex;
      gap:6px;
      padding:8px;
      border-top:1px solid #eee;
    }

    input{
      flex:1;
      padding:8px;
    }
  `]
})
export class AiAssistantComponent {

  constructor(private svc: AiService, private zone: NgZone) {}

  open = false;
  draft = '';

  messages = signal<ChatMessage[]>([]);

  toggle() {
    this.open = !this.open;
  }

  clearChat() {
    this.messages.set([]);
  }

  ask(text: string) {
    this.draft = text;
    this.send();
  }

  send() {
    const text = this.draft.trim();
    if (!text) return;

    this.messages.set([...this.messages(), { role: 'user', text, timestamp: Date.now() }]);

    const reply = this.svc.getReply(text);

    this.messages.set([...this.messages(), { role: 'assistant', text: reply, timestamp: Date.now() }]);

    this.draft = '';

    this.speak(reply);
  }

  toggleVoice() {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;

    if (!SpeechRecognition) return alert('Voice not supported');

    const rec = new SpeechRecognition();
    rec.lang = 'en-US';

    this.speak("I'm listening. Please speak now.");

    rec.start();

    rec.onresult = (e: any) => {
      const text = e.results[0][0].transcript;

      this.zone.run(() => {
        this.draft = text;
        this.send();
      });
    };
  }

  speak(text: string) {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(u);
  }
}
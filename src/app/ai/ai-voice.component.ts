import { Component, NgZone, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiService } from './ai.service';

@Component({
  selector: 'app-ai-voice',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="mic" type="button" (click)="toggleListening()" [class.mic--listening]="listening" aria-label="Voice assistant">
      🎤
    </button>
  `,
  styles: [`
.mic{
      position:fixed;
      right:86px;
      bottom:18px;
      width:56px;
      height:56px;
      border-radius:18px;
      border:none;
      background:var(--card);
      color:var(--text);
      font-size:22px;
      font-weight:900;
      box-shadow:0 18px 45px rgba(0,0,0,.22);
      cursor:pointer;
      z-index:100;
      border:1px solid var(--card-border);
      transition: transform .12s ease, background .12s ease;
    }
    .mic:hover{transform: translateY(-1px)}
    .mic--listening{background:rgba(255,179,0,.18);border-color:rgba(255,179,0,.55)}
  `]
})
export class AiVoiceComponent {
  private svc = new AiService();
  protected listening = false;

  constructor(private zone: NgZone) {}

  toggleListening() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (this.listening) return;
    this.listening = true;

    const rec = new SpeechRecognition();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onresult = (event: any) => {
      const transcript = event?.results?.[0]?.[0]?.transcript;
      if (!transcript) return;

      const answer = this.svc.getReply(transcript);
      this.speak(answer);
    };

    rec.onerror = () => {
      this.zone.run(() => (this.listening = false));
    };

    rec.onend = () => {
      this.zone.run(() => (this.listening = false));
    };

    rec.start();
  }

  private speak(text: string) {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.0;
    utter.pitch = 1;
    utter.volume = 1;
    window.speechSynthesis.speak(utter);
  }
}


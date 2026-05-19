import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

/**
 * Applied to a container that has `.reveal-stagger` children.
 * Adds incremental delays so cards animate in sequence.
 */
@Directive({
  selector: '[appRevealStaggerSetup]',
  standalone: true,
})
export class RevealStaggerSetupDirective implements OnChanges {
  
  @Input() appRevealStaggerSetup: number = 65; ; // ms between items

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngOnChanges(_changes: SimpleChanges): void {
    const container = this.el.nativeElement;
    const children = Array.from(container.querySelectorAll<HTMLElement>('.reveal'));
    const base = this.appRevealStaggerSetup;

    children.forEach((child, i) => {
      // We only set delay; animation itself starts when reveal becomes active.
      child.style.setProperty('--reveal-delay', `${i * base}ms`);
    });
  }
}


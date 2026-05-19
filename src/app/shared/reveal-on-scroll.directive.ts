import { Directive, ElementRef, Input, NgZone, OnDestroy } from '@angular/core';

export type RevealMode =
  | 'up'
  | 'right'
  | 'left'
  | 'zoom'
  | 'stagger'
  | 'none';

@Directive({
  selector: '[appRevealOnScroll]',
  standalone: true,
})
export class RevealOnScrollDirective implements OnDestroy {
  /**
   * Mode controls which utility class should be activated.
   * If you already apply a `.reveal-*` class in the template,
   * keep mode as 'none' (default) so we only add revealed state.
   */
  @Input('appRevealOnScroll') mode: RevealMode = 'none';

  private observer?: IntersectionObserver;
  private hasRevealed = false;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly zone: NgZone
  ) {}

  ngOnInit() {
    if (typeof window === 'undefined') return;

    const element = this.el.nativeElement;

    // Ensure we don't re-trigger animations.
    element.classList.add('reveal--pending');

    const options: IntersectionObserverInit = {
      root: null,
      // Start slightly before full visibility for smoothness
      rootMargin: '0px 0px -12% 0px',
      threshold: [0.12, 0.22, 0.35],
    };

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver((entries) => {
        if (this.hasRevealed) return;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          this.hasRevealed = true;
          element.classList.remove('reveal--pending');
          element.classList.add('reveal--revealed');

          // Optional: activate mode class if template didn't already.
          const mode = this.mode;
          if (mode && mode !== 'none') {
            const classForMode = this.modeToClass(mode);
            if (classForMode) element.classList.add(classForMode);
          }

          this.observer?.disconnect();
          break;
        }
      }, options);

      this.observer.observe(element);
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private modeToClass(mode: RevealMode): string | null {
    switch (mode) {
      case 'up':
        return 'reveal-up';
      case 'right':
        return 'reveal-right';
      case 'left':
        return 'reveal-left';
      case 'zoom':
        return 'reveal-zoom';
      case 'stagger':
        return 'reveal-stagger';
      case 'none':
      default:
        return null;
    }
  }
}


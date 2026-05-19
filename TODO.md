# TODO - Global UI Enhancements (Angular)

- [ ] Add premium thin cafe-themed global scrollbar styles in `src/styles.css`.
- [ ] Add global reveal animation utility classes in `src/styles.css`:
  - [ ] `.reveal`, `.reveal-up`, `.reveal-right`, `.reveal-left`, `.reveal-zoom`, `.reveal-stagger`
  - [ ] Keyframes + subtle easing, ~0.85s–1s.
- [ ] Implement reusable Angular directive `appRevealOnScroll`:
  - [ ] Uses IntersectionObserver internally
  - [ ] Adds classes dynamically (active/revealed)
  - [ ] Triggers once only
  - [ ] Supports reveal modes (up/right/left/zoom/stagger) via existing classes.
- [ ] Apply directive to all existing section/card elements that need reveal animations:
  - [ ] Hero (fade-down)
  - [ ] About (fade-right)
  - [ ] Menu cards (stagger fade-up)
  - [ ] Gallery (zoom-in)
  - [ ] Reviews (fade/slide-up)
  - [ ] Contact/Footer (fade-up)
- [ ] Ensure smooth scrolling remains global without breaking navbar routing.
- [ ] Run `ng build` to validate compilation.


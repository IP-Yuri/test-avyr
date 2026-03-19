---
description: How to refactor CSS from desktop-first to mobile-first architecture
---

# Mobile-First CSS Refactor Workflow

## 1. Audit Fixed Font Sizes
Search for all fixed `font-size` declarations. Replace with `clamp(min, preferred, max)`:

```css
/* Formula: clamp(mobile-min, viewport-scaling + base, desktop-max) */
font-size: clamp(2rem, 5vw + 1rem, 5.5rem);
```

### Common clamp() recipes:
| Use Case | Clamp Value |
|---|---|
| Hero headline (large) | `clamp(2.25rem, 5vw + 1rem, 5.5rem)` |
| Section headline (h2) | `clamp(1.75rem, 3vw + 0.5rem, 3rem)` |
| Sub-headline | `clamp(0.8rem, 1.5vw + 0.5rem, 1.1rem)` |
| Body accent text | `clamp(0.65rem, 1vw + 0.3rem, 0.875rem)` |

## 2. Restructure Media Queries
Convert `max-width` (desktop-first) to `min-width` (mobile-first):

```css
/* BEFORE (desktop-first): */
.nav-links { display: flex; }
@media (max-width: 767px) { .nav-links { display: none; } }

/* AFTER (mobile-first): */
.nav-links { display: none; }
@media (min-width: 768px) { .nav-links { display: flex; } }
```

## 3. Horizontal Scroll → Vertical Stack on Mobile
For carousels/galleries:

```css
/* Mobile base */
.carousel { flex-direction: column; gap: 2rem; }
.card { width: 100%; }

/* Desktop escalation */
@media (min-width: 768px) {
    .carousel {
        flex-direction: row;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
    }
    .card { width: 55vw; scroll-snap-align: center; }
}
```

## 4. Touch Targets
All interactive elements must have:
```css
min-height: 44px;
min-width: 44px;
```

## 5. CSS Variables for Spacing
```css
:root { --spacing-section: 6rem; --spacing-gutter: 1.25rem; }
@media (min-width: 768px) {
    :root { --spacing-section: 15rem; --spacing-gutter: 2rem; }
}
```

## 6. Images
- Mobile: `aspect-ratio: 16/10` (landscape, less tall)
- Desktop: `aspect-ratio: 3/4` (portrait, full impact)
- Remove `filter: grayscale()` on mobile (no hover on touch)

## 7. JS Feature Guards
Wrap desktop-only JS (scroll listeners, IntersectionObserver lock) in:
```js
if (window.matchMedia('(min-width: 768px)').matches) {
    // Desktop-only JS here
}
```

## Standard Breakpoints
- **Base**: 0 – 767px (mobile, default CSS)
- **Tablet**: 768px+ (`@media (min-width: 768px)`)
- **Desktop**: 1024px+ (`@media (min-width: 1024px)`)

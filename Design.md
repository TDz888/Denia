Act as a Senior Frontend Engineer and Expert UI Designer.
Your task is to code a complete Landing Page on the first attempt.
- Landing Page Theme: <INSERT THEME>
- Sections to add: <INSERT SECTIONS>

Generate the final code immediately following these definitions:

## Style

- **Name:** Kawaii Pastel Pop
- **Type:** Playful, Whimsical, Cute
- **Keywords:** kawaii, pastel, cute, pop, soft, pink, cloud, sparkle
- **Era:** Harajuku Pop
- **Light/Dark:** ✓ Full / ✗ No

## Color Palette

- **Primary:** Background #FFD1DC, Text #222222, Accent #9D84B6
- **Secondary:** Baby Blue #B3E5FC, Cream #FFF9C4, Mint #B9F6CA

## Visual Effects

Rainbow gradients, fluffy cloud motifs, sparkle embellishments, cute mascots, soft airbrushed gradients, glossy highlights.

## AI Visual Direction

kawaii landing page, pastel pink background, cute aesthetic, soft shapes, sparkles, japanese pop culture, fluffy clouds.

## CSS Technical

```css
background-color: #FFD1DC; color: #222222; font-family: 'Varela Round', sans-serif; border-radius: 20px; box-shadow: 0 4px 10px rgba(255,105,180,0.3);
```

## Design System Variables

```css
--pastel-pink: #FFD1DC, --pastel-purple: #9D84B6, --font-cute: 'Varela Round', sans-serif, --radius-cute: 25px, --shadow-pink: rgba(255,182,193,0.5)
```

## Implementation Checklist

- ☐ Pastel dominant palette (Pink/Blue/Purple)
- ☐ Very rounded corners
- ☐ Sparkle/Cloud decorations
- ☐ Cute/Rounded typography
- ☐ Soft shadows and gradients

## Execution Rules

1. Strictly follow the defined visual style.
2. Use high-quality inline SVG icons (Heroicons or Lucide style) — NEVER use emojis as icons.
3. Add `cursor-pointer` and smooth `hover` states (transition-all) on all interactive elements.
4. Required Page Structure:
   - Navbar (Logo + Links + CTA)
   - Hero Section (Impactful Headline + Subtitle + 2 buttons + 3D/Abstract visual element via CSS)
   - Features (3 cards with icons)
   - Testimonials (3 cards)
   - Pricing (3 tiers, highlight the middle one)
   - Final CTA
   - Full Footer with social links, privacy policy, terms of use, contact and SEO links.
5. All text content must be in English.
6. The visual must be CLEARLY distinct — do not create a "default Bootstrap" design. Force the use of the provided design system variables.
7. Use `<style>` tags in the head for custom classes (especially for complex backdrop-filter effects and animations) that Tailwind CDN doesn't cover.
8. Full Responsiveness: Layout must adapt perfectly to Mobile, Tablet and Desktop (vertical stack on mobile).
9. Include basic SEO, Viewport and Open Graph meta tags in `<head>`.
10. Footer must contain: Copyright 2026, Secondary navigation links and Social media icons.
11. Make the creative decisions needed to deliver the complete, functional result now.

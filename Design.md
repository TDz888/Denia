# Design System Inspired by Android Server Mini

## 1. Visual Theme & Atmosphere

Android Server Mini's design system embodies a modern, tech-forward aesthetic rooted in precision and minimalism. The visual identity balances technical sophistication with accessibility, using a refined color palette anchored by deep teal and charcoal, complemented by warm accent tones. The design prioritizes clean typography and generous whitespace to create an inviting yet professional environment. Geometric iconography and subtle shadows communicate depth without visual noise. The atmosphere is one of clarity and purpose—designed for developers and power users who value efficiency, reliability, and elegant simplicity. Every element serves function; decorative flourishes are intentional and purposeful.

**Key Characteristics**
- Deep, neutral base colors with teal-green accents for primary actions
- Clean, geometric typography using Space Grotesk for modern appeal
- Minimal shadow elevation for subtle depth perception
- High contrast text on light, spacious backgrounds
- Accessible, purposeful component design with clear interactive states
- Warmth introduced through accent colors for warnings and calls-to-action
- Emphasis on whitespace and breathing room between content zones

## 2. Color Palette & Roles

### Primary
- **Teal Accent** (`#006E5E`): Primary interactive elements, link states, and accent highlights. Used for trusted actions like "Download" buttons and active navigation states.
- **Dark Navy** (`#0F172B`): Primary text and strong visual anchors. Used extensively for headings, body copy, and dominant UI elements.

### Accent Colors
- **Deep Charcoal** (`#1D293D`): Secondary text emphasis and supporting UI elements.
- **Dark Slate** (`#11181F`): Tertiary text and subtle UI components.
- **Almost Black** (`#020618`): Rare high-contrast applications.

### Interactive
- **Electric Blue** (`#1447E6`): Secondary interactive states and alternative action highlights.
- **Warm Orange** (`#F99C00`): Warning states, informational badges, and attention-grabbing alerts.
- **Red Danger** (`#E40014`): Error states and destructive actions.

### Neutral Scale
- **Pure White** (`#FFFFFF`): Primary background for content areas and card surfaces.
- **Light Off-White** (`#F8FAFC`): Secondary backgrounds for subtle differentiation and grouped content areas.
- **Pale Beige** (`#F9F7F1`): Tertiary background for minimal contrast sections.
- **Cream Base** (`#FDFCF7`): Soft background for delicate sections.
- **Warm Cream** (`#FBFAF6`): Alternative soft background.
- **Sand Border** (`#ECECE1`): Border and divider lines.

### Surface & Borders
- **Light Gray** (`#E2E8F0`): Subtle borders and divider lines between sections.
- **Mid Gray** (`#90A1B9`): Supporting text and secondary UI borders.
- **Dark Gray** (`#6A7282`): Secondary text color for low-hierarchy information.

### Semantic / Status
- **Warning** (`#F99C00`): Alert badges, warning states, and secondary CTAs (like "REPORT BUG" button).
- **Error** (`#E40014`): Error messages, validation failures, and destructive confirmations.
- **Success** (`#006E5E`): Confirmation states, successful actions, primary download buttons.

## 3. Typography Rules

### Font Family
**Primary Font:** Space Grotesk (400, 500, 600, 700)
Fallback: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

**Monospace Font:** IBM Plex Mono (400, 500, 600)
Fallback: `"Courier New", monospace`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|-----------------|-------|
| Display / H1 | Space Grotesk | 88px | 600 | 85.36px | -0.02em | Hero headline, page title |
| Heading 2 | Space Grotesk | 48px | 600 | 48px | -0.01em | Section heading, feature title |
| Heading 3 | Space Grotesk | 18px | 600 | 28px | 0em | Card title, feature label |
| Body | Space Grotesk | 18px | 400 | 28px | 0em | Main paragraph text |
| Label / Span | Space Grotesk | 16px | 400 | 24px | 0em | Navigation, supporting text |
| Button | Space Grotesk | 11px | 900 | 16.5px | 0.05em | All button text, high emphasis |
| List Item | Space Grotesk | 14px | 400 | 20px | 0em | Unordered/ordered list entries |
| Caption / Small | Space Grotesk | 12px | 400 | 16px | 0em | Fine print, metadata, timestamps |
| Code | IBM Plex Mono | 12px | 400 | 16px | 0em | Inline code, version strings |

### Principles
- **Hierarchy through weight and size**, not color alone—maintains accessibility standards.
- **Generous line heights** (1.3–1.5) ensure readability on screens and reduce cognitive load.
- **Letter spacing varies** to emphasize button text and small labels.
- **Monospace for technical content** (version numbers, code snippets) to create visual distinction.
- **Font weight 900 reserved for buttons** to signal interactivity and importance.
- **Consistent sizing** across roles prevents visual fragmentation and aids scanning.

## 4. Component Stylings

### Buttons

#### Primary Button (CTA)
- **Background:** `#006E5E`
- **Text Color:** `#FFFFFF`
- **Font Size:** `11px`
- **Font Weight:** `900`
- **Padding:** `0px 20px`
- **Height:** `36px`
- **Border Radius:** `32px` (pill shape)
- **Border:** `2px solid rgba(0, 0, 0, 0.1)`
- **Box Shadow:** `rgba(239, 68, 68, 0.4) 0px 0px 20px 0px`
- **Hover State:** Scale `1.05`, increase shadow intensity
- **Active State:** Darken background by 10%, reduce shadow

#### Secondary Button (Ghost)
- **Background:** `transparent`
- **Text Color:** `#0F172B`
- **Font Size:** `14px`
- **Font Weight:** `500`
- **Padding:** `0px 16px`
- **Height:** `36px`
- **Border Radius:** `14.8px`
- **Border:** `1px solid #E2E8F0`
- **Box Shadow:** `none`
- **Hover State:** Background `#F8FAFC`, border `#90A1B9`
- **Active State:** Background `#E2E8F0`, text `#0F172B`

#### Icon Button (Tertiary)
- **Background:** `#F8FAFC`
- **Text Color:** `#0F172B`
- **Font Size:** `14px`
- **Font Weight:** `500`
- **Padding:** `0px`
- **Height:** `36px`
- **Width:** `36px`
- **Border Radius:** `14.8px`
- **Border:** `1px solid #E2E8F0`
- **Box Shadow:** `rgba(0, 0, 0, 0.1) 0px 1px 3px 0px`
- **Hover State:** Background `#FFFFFF`, shadow `lg`
- **Active State:** Background `#006E5E`, text `#FFFFFF`

#### Danger Button (Error State)
- **Background:** `#E40014`
- **Text Color:** `#FFFFFF`
- **Font Size:** `11px`
- **Font Weight:** `900`
- **Padding:** `0px 20px`
- **Height:** `36px`
- **Border Radius:** `32px`
- **Border:** `2px solid rgba(228, 0, 20, 0.3)`
- **Box Shadow:** `rgba(228, 0, 20, 0.5) 0px 0px 30px 0px`
- **Hover State:** Scale `1.05`, darken by 15%
- **Active State:** Reduce shadow, darken by 20%

### Cards & Containers

#### Feature Card
- **Background:** `#FFFFFF`
- **Text Color:** `#0F172B`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Padding:** `32px`
- **Border Radius:** `16.8px`
- **Border:** `1px solid #E2E8F0`
- **Box Shadow:** `rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px`
- **Hover State:** Lift with shadow `lg`, border `#90A1B9`

#### Light Section Container
- **Background:** `#F8FAFC`
- **Text Color:** `#0F172B`
- **Padding:** `48px 32px`
- **Border Radius:** `0px`
- **Border:** `none`
- **Box Shadow:** `none`
- **Usage:** Section backgrounds, grouping content zones

#### Status Badge
- **Background:** `#F99C00` (warning) or `#006E5E` (success)
- **Text Color:** `#FFFFFF`
- **Font Size:** `11px`
- **Font Weight:** `600`
- **Padding:** `4px 12px`
- **Border Radius:** `20px`
- **Border:** `none`
- **Box Shadow:** `rgba(0, 0, 0, 0.05) 0px 2px 4px 0px`

### Inputs & Forms

#### Text Input
- **Background:** `#FFFFFF`
- **Text Color:** `#0F172B`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Padding:** `8px 12px`
- **Height:** `36px`
- **Border Radius:** `8px`
- **Border:** `1px solid #E2E8F0`
- **Box Shadow:** `none`
- **Focus State:** Border `#006E5E`, shadow `0px 0px 0px 3px rgba(0, 110, 94, 0.1)`
- **Error State:** Border `#E40014`, background `rgba(228, 0, 20, 0.05)`

#### Textarea
- **Background:** `#FFFFFF`
- **Text Color:** `#0F172B`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Padding:** `12px`
- **Border Radius:** `8px`
- **Border:** `1px solid #E2E8F0`
- **Box Shadow:** `none`
- **Min Height:** `100px`
- **Focus State:** Border `#006E5E`, shadow `0px 0px 0px 3px rgba(0, 110, 94, 0.1)`

### Navigation

#### Header Navigation
- **Background:** `#FFFFFF`
- **Text Color:** `#0F172B`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Padding:** `0px 32px`
- **Height:** `64px`
- **Border Radius:** `0px`
- **Border Bottom:** `1px solid #E2E8F0`
- **Box Shadow:** `none`
- **Link Hover:** Text color `#006E5E`, underline appear
- **Active Link:** Text color `#006E5E`, font weight `600`

#### Navigation Link
- **Background:** `transparent`
- **Text Color:** `#0F172B`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Padding:** `0px 16px`
- **Height:** `auto`
- **Border Radius:** `0px`
- **Border:** `none`
- **Box Shadow:** `none`
- **Hover State:** Text color `#006E5E`, underline `2px solid #006E5E`
- **Active State:** Text color `#006E5E`, font weight `600`

#### Breadcrumb Navigation
- **Background:** `transparent`
- **Text Color:** `#6A7282`
- **Font Size:** `12px`
- **Font Weight:** `400`
- **Separator:** `/` in `#90A1B9`
- **Active Item Color:** `#0F172B`
- **Hover State:** Text color `#006E5E`

## 5. Layout Principles

### Spacing System

**Base Unit:** `4px`

**Spacing Scale:**
- `4px` — Micro gaps between inline elements
- `8px` — Tight padding, component internals
- `12px` — Default input/button padding vertical
- `16px` — Standard padding, small section spacing
- `20px` — Medium padding, button horizontal spacing
- `24px` — Comfortable card padding, section gaps
- `28px` — Vertical rhythm breakpoint
- `32px` — Large padding, section padding
- `36px` — Margin between major sections
- `40px` — Large section margin
- `48px` — Extra-large section margin, hero spacing
- `56px` — Hero and landing page sections

**Context Usage:**
- **Tight UI (inputs, buttons):** `8px`–`12px`
- **Card internals:** `24px`–`32px`
- **Section spacing:** `36px`–`56px`
- **Whitespace breathing room:** `40px`–`48px`

### Grid & Container

- **Max Width:** `1280px`
- **Content Container:** Center with `32px` side padding on mobile, `64px` on tablet, `96px` on desktop
- **Column Strategy:** 12-column grid for mobile, 24-column on tablet/desktop
- **Section Patterns:** 
  - Full-width hero with centered content container
  - Alternating light/dark backgrounds for visual separation
  - Feature grid: 3 columns on desktop, 1–2 on tablet, 1 on mobile

### Whitespace Philosophy

Whitespace is an active design element, not a passive absence. Generous margins and padding around content zones reduce cognitive load and guide user focus. Major sections are separated by `48px`–`56px` vertical spacing, creating clear visual hierarchy. Internal component spacing uses `24px`–`32px` to maintain breathing room without excessive gaps. This approach prioritizes readability and hierarchy over density, reflecting the brand's commitment to clarity and user respect.

### Border Radius Scale

- `0px` — Sections, large containers, and navigation
- `8px` — Form inputs and subtle containers
- `14.8px` — Icon buttons and small interactive elements
- `16.8px` — Feature cards and medium containers
- `20px` — Badges and labels
- `32px` — Pill-shaped buttons (border-radius: `999px` equivalent)

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| None | No shadow | Navigation, section backgrounds, large containers |
| Small (sm) | `rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px` | Feature cards, secondary buttons, hover states on light elements |
| Medium (md) | `rgba(239, 68, 68, 0.4) 0px 0px 20px 0px` | Primary CTA buttons, warning badges |
| Large (lg) | `lab(41.2053 -42.9989 1.29547 / 0.16) 0px 12px 30px 0px` | Elevated icon buttons, card hover |
| Extra Large (xl) | `rgba(239, 68, 68, 0.5) 0px 0px 30px 0px` | Danger buttons, error states, modal overlays |

**Shadow Philosophy:**
Shadows are used sparingly to create subtle depth and communicate interactivity. Rather than heavy drop shadows, the system employs gentle glows on interactive elements (buttons) and minimal shadows on cards for layering. This maintains the clean, modern aesthetic while providing tactile feedback. Primary buttons employ colored glows (`md`, `xl`) aligned with their semantic role, while secondary elements use neutral shadows (`sm`). Hover states lift elements subtly, signaling responsiveness without jarring transitions.

## 7. Do's and Don'ts

### Do
- **Use teal (`#006E5E`) for primary actions** — Download buttons, main CTAs, active navigation states
- **Leverage whitespace generously** — Aim for `40px`–`56px` between major sections
- **Stack buttons vertically on mobile** — Ensure touch targets remain at least `44px` tall and `44px` wide
- **Maintain consistent padding** — Use spacing scale (`8px`, `16px`, `24px`, `32px`) across all components
- **Apply shadows on hover** — Lift interactive elements to signal responsiveness
- **Use warning orange (`#F99C00`) for secondary CTAs** — "Report Bug" buttons, alerts, non-destructive warnings
- **Keep typography hierarchy clear** — Never skip heading levels; use weight and size to establish structure
- **Ensure color contrast** — All text meets WCAG AA standards (4.5:1 for body, 3:1 for large text)
- **Employ monospace for technical content** — Version numbers, code snippets, file names
- **Test on touch devices** — All interactive elements must be ≥44px × 44px

### Don't
- **Don't use red except for errors** — `#E40014` is reserved for destructive actions and validation failures
- **Don't overshadow cards** — Keep card shadows subtle (`sm`); avoid depth that competes with content
- **Don't mix button styles on the same line** — Choose primary, secondary, or icon variants consistently
- **Don't reduce line height below 1.3** — Maintain readability in all typography sizes
- **Don't apply animations without purpose** — Transitions should clarify state changes, not distract
- **Don't use more than 3 font weights per section** — Stick to 400, 500, and 600 for clarity
- **Don't place text directly on images** — Always use overlays or solid backgrounds for accessibility
- **Don't nest containers deeper than 3 levels** — Keep layouts flat to maintain visual clarity
- **Don't abbreviate labels without explanation** — Provide full text or tooltips for accessibility
- **Don't forget alt text for icons** — All icons must have semantic descriptions for screen readers

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | 320px–639px | Single column, `16px` padding, buttons full-width, font sizes reduced 10–15%, h1 reduced to `48px` |
| Tablet | 640px–1023px | 2 columns max, `24px` padding, buttons inline if space permits, h1 reduced to `64px` |
| Desktop | 1024px+ | Full 3-column grid, `32px`–`64px` padding, h1 full `88px`, all components at nominal size |
| Wide | 1280px+ | Max-width container activated (`1280px`), centered layout, side spacing optimized |

### Touch Targets
- **Minimum size:** `44px` × `44px` for all interactive elements (buttons, links, inputs)
- **Recommended size:** `48px` × `48px` for primary CTAs and icon buttons
- **Spacing between targets:** Minimum `8px` horizontal, `12px` vertical to prevent accidental taps
- **Form inputs:** Minimum height `36px`, width varies but no narrower than `160px`
- **Text links:** Underline or background highlight required on hover/focus

### Collapsing Strategy
- **Hero section:** Full-height (`100vh`) on desktop; `60vh` on tablet; `50vh` on mobile
- **Feature grid:** 3 columns (desktop) → 2 columns (tablet) → 1 column (mobile)
- **Navigation:** Horizontal menu (desktop/tablet) → Hamburger menu (mobile, `24px` icon)
- **Padding:** `64px` horizontal (desktop) → `32px` (tablet) → `16px` (mobile)
- **Font sizes:** Maintain hierarchy via weight changes rather than extreme reductions; avoid sub-`12px` text
- **Buttons:** `149px` width (desktop) → `120px` (tablet) → full-width (mobile)
- **Spacing:** Reduce between-section margins by 25–30% on mobile (`48px` desktop → `32px` mobile)

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary CTA:** Teal (`#006E5E`) — Download, primary actions
- **Secondary CTA:** Orange (`#F99C00`) — Report Bug, warnings, non-critical actions
- **Danger/Error:** Red (`#E40014`) — Error messages, destructive confirmations
- **Primary Text:** Navy (`#0F172B`) — All body copy, headings
- **Secondary Text:** Dark Slate (`#1D293D`, `#11181F`) — Supporting text, labels
- **Background (Light):** Off-White (`#F8FAFC`) — Section backgrounds, grouped areas
- **Background (Primary):** White (`#FFFFFF`) — Main content, cards
- **Borders/Dividers:** Light Gray (`#E2E8F0`) — Subtle separators
- **Success/Confirmation:** Teal (`#006E5E`) — Active states, validated inputs

### Iteration Guide

1. **Button Style:** Always use `Space Grotesk`, weight `900`, size `11px`. Primary buttons: `#006E5E` background, `#FFFFFF` text, `32px` border radius. Secondary buttons: `transparent` background, `#0F172B` text, `14.8px` radius.

2. **Typography:** Body copy is `18px` / `400` weight / `28px` line height. Headings use weight `600`. Display (H1) is `88px`; H2 is `48px`; H3 is `18px`. Never mix sans-serif and serif in same component.

3. **Spacing:** Margins between sections are multiples of `8px` (e.g., `24px`, `32px`, `48px`). Cards use `32px` internal padding. Buttons use `20px` horizontal padding. Inputs use `12px` vertical, `12px` horizontal.

4. **Cards:** Always include `1px solid #E2E8F0` border and soft shadow (`rgba(0, 0, 0, 0.1) 0px 1px 3px 0px`). Border radius is `16.8px` for medium cards, `0px` for section containers. On hover, lift to `lg` shadow and brighten border.

5. **Colors:** Text is always `#0F172B` on white/light backgrounds. Ensure 4.5:1 contrast ratio minimum. Interactive elements default to `#006E5E`; warnings to `#F99C00`; errors to `#E40014`. Use `#F8FAFC` for subtle background differentiation.

6. **Responsive:** Desktop max-width is `1280px`, centered. Mobile breakpoint (`<640px`) collapses to single column, reduces padding to `16px`, stacks buttons vertically, reduces H1 to `48px`. Tablet breakpoint is `2` columns, `24px` padding, H1 `64px`.

7. **Elevation:** Cards and containers have no shadow by default. Add `sm` shadow on hover. Primary buttons have `md` shadow (teal glow). Danger buttons have `xl` shadow (red glow). Never stack shadows deeper than one level.

8. **Accessibility:** All links must be underlined or have visible background on hover. Form inputs require `:focus` state with teal border and light teal background. Alt text required for all images and icons. Maintain minimum `44px` touch targets on mobile.

9. **Form Inputs:** Default `#FFFFFF` background, `#E2E8F0` border, `36px` height. On focus, change border to `#006E5E` and add `0px 0px 0px 3px rgba(0, 110, 94, 0.1)` shadow. On error, border becomes `#E40014`, background `rgba(228, 0, 20, 0.05)`.

10. **Consistency:** All padding/margin values must be from the spacing scale (`4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `48px`). All text uses `Space Grotesk` or `IBM Plex Mono` (code only). All borders are `1px` or `2px` (buttons). All radii are from the scale (`0px`, `8px`, `14.8px`, `16.8px`, `20px`, `32px`).
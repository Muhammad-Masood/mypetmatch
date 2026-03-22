# Design System Strategy: The Curated Sanctuary

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Curator."** Unlike traditional utility-first applications, this system prioritizes a high-end, editorial experience that feels like a bespoke sanctuary. We move beyond the "template" look by embracing **Intentional Asymmetry** and **Tonal Depth**.

The interface should never feel "built"; it should feel "composed." We achieve this by breaking the rigid 12-column grid with overlapping elements, oversized typography, and a sophisticated layering of soft, organic surfaces that mimic fine parchment and frosted glass.

---

## 2. Color & Surface Philosophy
The palette is rooted in a warm, tactile foundation, punctuated by vibrant energy and soft, sophisticated accents.

### The Palette
* **Primary (`#fd8f13` / `primary_container`):** Our vibrant orange. Used exclusively for "The Golden Path"—the most critical actions that drive the user journey forward.
* **Secondary & Tertiary (`#f4e2ff` / `rgba(244, 226, 255)` & `#f1bfcb` / `rgba(241, 191, 203)`):** Lavender and blush rose. Supporting accents include `#f5e2ff`, `#fdd2dd`, `#fde0c1`, and neutral stone `#dedcda`. Use them for progress indicators, subtle background washes for grouped content, and soft UI accents that prevent the interface from feeling purely utilitarian.
* **Neutrals:** Built on `surface` (`#fcf9f8`), a warm off-white that avoids the sterile coldness of pure `#ffffff`.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders are prohibited for sectioning. Structural boundaries must be defined solely through:
1. **Background Shifts:** e.g., A `surface_container_low` card sitting on a `surface` background.
2. **Tonal Transitions:** Using the hierarchy of `surface_container` tiers to denote change.
3. **Negative Space:** Utilizing the `Spacing Scale` (e.g., `8` or `10`) to create "islands" of content.

### The "Glass & Gradient" Rule
To elevate the experience from "app" to "editorial," use Glassmorphism for floating navigation bars or modal overlays. Apply a semi-transparent `surface` color with a `backdrop-blur`.
* **Signature Textures:** For high-impact CTAs, do not use flat fills. Apply a subtle linear gradient from `primary` (`#904d00`) to `primary_container` (`#fd8f13`) at a 135-degree angle to provide "visual soul."

---

## 3. Typography: Editorial Authority
We use **Plus Jakarta Sans** with an aggressive contrast scale to establish clear hierarchy and a premium feel.

* **Display (`display-lg` to `display-sm`):** Use for hero moments and welcoming the user. These should feel intentional and spacious.
* **The "Editorial" Headline:** `headline-lg` and `headline-md` are the anchors of your pages. They should be set with tight letter-spacing (-0.02em) to feel authoritative.
* **Form Labels (`label-md`):** Following the "Curated Sanctuary" brief, all labels must be **Uppercase**, set in `on_surface_variant` (`#564335`), and given a `0.05em` letter spacing. This reduces their visual weight while maintaining a sophisticated, structured look.
* **Body Copy:** Use `body-lg` for primary reading. Ensure a line height of at least 1.6 to maintain the "breathing room" required for a premium experience.

---

## 4. Elevation, Depth & Layering
We do not use shadows to create "pop"; we use them to create "atmosphere."

### The Layering Principle (Tonal Stacking)
Depth is achieved by stacking `surface-container` tiers.
* **Level 0 (Base):** `surface`
* **Level 1 (Sections):** `surface_container_low`
* **Level 2 (Cards):** `surface_container_lowest` (pure white) to create a subtle "lift" against the off-white background.

### Ambient Shadows
When an element must float (e.g., a FAB or a floating Menu), use **Ambient Shadows**:
* **Blur:** 32px to 64px.
* **Opacity:** 4% - 6%.
* **Color:** Use a tinted version of `on_surface` (e.g., `#1b1c1c` at 5% opacity). Never use pure black `#000000`.

### The "Ghost Border" Fallback
If accessibility requires a border (e.g., in high-contrast modes or specific input states), use the **Ghost Border**: `outline_variant` at **15% opacity**. Total opacity borders are strictly forbidden.

---

## 5. Components & UI Patterns

### Buttons
* **Primary:** Rounded `full` (pill-shape). Background: Gradient `primary` to `primary_container`. Text: `on_primary` (White).
* **Secondary:** Rounded `full`. Background: `secondary_container` (`#f5e2ff`). No border.
* **Tertiary:** No background. Text: `primary`. Used for low-emphasis actions like "Cancel" or "Skip."

### Cards & Lists
* **Forbidden:** Divider lines/rules.
* **Requirement:** Separate list items using `surface_container` shifts or vertical rhythm from the spacing scale (e.g., `spacing-4` between items).
* **Corner Radius:** Use `lg` (`2rem`) for main content cards and `md` (`1.5rem`) for nested elements.

### Form Inputs
* **Visual Style:** Soft, `surface_container_high` backgrounds with `none` or `ghost` borders.
* **Labeling:** Uppercase `label-sm` text placed *above* the input field, never inside as placeholder text.
* **Focus State:** A subtle glow using `primary` at 20% opacity rather than a thick solid line.

### Progress & Accents
* **Signature Progress:** Use `secondary_fixed_dim` (Lavender) for the track and `tertiary_fixed_dim` (Rose) for the progress fill to create a soft, non-alarming visual metaphor for growth.

---

## 6. Do's & Don'ts

### Do
* **Do** use asymmetrical layouts. Let an image bleed off the edge of the screen while text remains centered.
* **Do** use the `xl` (`3rem`) roundedness for large containers to emphasize the "Soft Sanctuary" feel.
* **Do** embrace white space. If a screen feels "busy," increase the spacing between tiers.

### Don't
* **Don't** use 1px solid lines to separate content. It breaks the "Curated" feel and looks like a generic framework.
* **Don't** use standard drop shadows. If you can see the shadow clearly, it’s too heavy. It should feel like a soft glow of light.
* **Don't** use the Primary Orange for everything. It is a "reward" color. If it's everywhere, it loses its premium value.
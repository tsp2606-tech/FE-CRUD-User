---
name: Lumina Management System
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#4cd7f6'
  on-tertiary: '#003640'
  tertiary-container: '#009eb9'
  on-tertiary-container: '#002f38'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
  glass-stroke: rgba(255, 255, 255, 0.1)
  glass-bg: rgba(15, 23, 42, 0.65)
  success-vibrant: '#10B981'
  danger-vibrant: '#EF4444'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is built for a high-end CRUD management environment where precision meets elegance. The brand personality is **sophisticated, technical, and ethereal**, aiming to make data management feel effortless and premium. 

We employ a **Glassmorphism** aesthetic characterized by:
- **Translucency:** UI surfaces utilize background blurs to maintain context and depth.
- **Atmospheric Depth:** Layers are defined by light refraction and soft, tinted shadows rather than heavy borders.
- **Fluidity:** Motion is used to reinforce the "glass" metaphor, with smooth transitions and subtle scale shifts.

The target audience is administrators and developers who value a high-fidelity workspace that reduces cognitive load through visual clarity and modern aesthetics.

## Colors

This design system defaults to a **Sleek Dark Mode**. The palette is anchored by "Midnight Slate" (`#0F172A`) to provide a deep, high-contrast canvas for glass effects.

- **Primary & Secondary:** A gradient of "Electric Blue" and "Royal Violet" drives the primary action items and highlights.
- **Glass Effects:** Surfaces use `glass-bg` with a backdrop blur of at least `12px`. A thin `1px` stroke using `glass-stroke` is essential to define the edges of translucent containers.
- **Functional Colors:** Success and Danger states use high-vibrancy variants to ensure they remain legible and impactful against dark, blurred backgrounds.

## Typography

The system uses **Outfit** for display and headings to provide a modern, geometric character that aligns with the tech-forward aesthetic. **Inter** is used for body text and UI labels to ensure maximum legibility and functional clarity.

- **Headlines:** Use tighter letter spacing for larger sizes to maintain a premium "locked-up" look.
- **Labels:** Small labels and buttons should use `600` weight and slight tracking (letter spacing) to improve readability on dark, blurred backgrounds.
- **Contrast:** Ensure body text uses a high-alpha white (e.g., `rgba(255,255,255,0.9)`) to pass accessibility standards against glass layers.

## Layout & Spacing

This design system follows a **Fluid Grid** model with generous white space to evoke a "premium" feel. 

- **Grid:** A 12-column system is used for desktop layouts. Components should align to a 4px baseline grid to ensure vertical rhythm.
- **Margins:** Large outer margins (`40px`+) on desktop help center the content and create a focused management dashboard experience.
- **Padding:** Use internal container padding of `24px` to `32px` to allow the glass background enough area to "breathe" and show the underlying blur effect.
- **Responsiveness:** On mobile, the layout collapses to a single column, and glass effects are simplified (reduced blur radius) to maintain performance.

## Elevation & Depth

Depth is the core of this design system's identity. We move away from traditional shadows in favor of **refractive layers**.

- **Surface Levels:** 
  - **Level 0 (Base):** Deep Slate background with subtle radial gradients of primary/secondary colors in the corners.
  - **Level 1 (Cards):** 65% opacity glass with `12px` blur and a `1px` top-weighted border.
  - **Level 2 (Modals/Popovers):** 80% opacity glass with `24px` blur and a soft, tinted glow (`primary_color` at 10% opacity) instead of a black shadow.
- **Z-Index:** Modals and Toasts must clearly "float" above the dashboard using intensified backdrop blurs that desaturate the content behind them.

## Shapes

The shape language is **distinctly rounded** to soften the technical nature of the CRUD application. 

- **Base Radius:** 0.5rem (8px) for input fields and small buttons.
- **Container Radius:** 1rem (16px) for cards and main dashboard sections to create a friendly, modern containerized look.
- **Large Radius:** 1.5rem (24px) for modals and primary action buttons to make them feel "squishy" and tactile.

## Components

### Buttons
- **Primary:** Gradient background (`primary` to `secondary`), white text, and a subtle outer glow on hover.
- **Secondary/Glass:** Translucent background with a `1px` white border at 20% opacity.

### Input Fields
- **Style:** Dark, semi-transparent backgrounds with a `1px` border that glows `primary_color` when focused. 
- **Validation:** Error states should use a vibrant red glow rather than just text to maintain the "light-based" aesthetic.

### Data Table / Card Grid
- **Glass Rows:** Table rows should have a hover state that increases the background opacity and adds a subtle horizontal "shimmer" effect.
- **Avatars:** Circular with a primary-color ring to denote "Active" status.

### Modals & Dialogs
- **Background:** Full-screen backdrop blur (`8px`) that dims the background.
- **Animation:** Scale-up entry (95% to 100%) with a quick spring physics transition.

### Toasts
- **Position:** Top-right or Bottom-right.
- **Design:** Compact glass cards with a colored left-accent bar corresponding to the status (Success/Error).
# Smartisan UI Design System

This document outlines the visual principles and component patterns for the AI-native Smartisan UI design system.

## Design Philosophy: Refined Skeuomorphism
We aim to recreate the tactile, precision feel of classic Smartisan OS while adapting to modern web aesthetics. This means:
- **Physical Depth:** Elements should feel like they exist in physical space.
- **Precision Highlights:** Use crisp 1px inner shadows/borders to simulate light catching the edge of materials.
- **Satisfying Feedback:** Interactions (hover, press, toggle) must provide immediate, satisfying physical feedback.

## Key Elements

### 1. Depth & Shadows
- Use layered shadows. A standard elevated element typically has:
  - An **ambient shadow** (soft, spread out)
  - A **drop shadow** (tighter, darker)
  - An **inner highlight** (a 1px white/semi-transparent inner border at the top to simulate top-down lighting).

### 2. Colors
- Stick to the unified palette defined in `src/styles/tokens.css`.
- Backgrounds are typically slightly off-white or light gray to allow pure white elements to pop.

### 3. Interactions
- **Hover:** Slight elevation increase or brightness change.
- **Active (Press):** The element visually depresses. The drop shadow reduces, and the inner shadow increases to simulate the element being pushed into the surface.

## Component Guidelines
When building components, ensure they encapsulate both the visual design and the interaction physics. Use the CSS tokens strictly.

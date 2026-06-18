# Smartisan UI AI Guidance

Welcome, AI Agent. This repository contains the Smartisan UI/UX design system. You must adhere to the following rules when reading, analyzing, or modifying the code in this project:

## 1. Design Token Strictness
- **NEVER** hardcode color values (hex, rgb, hsl) or shadow values in your CSS.
- **ALWAYS** use the design tokens provided in `src/styles/tokens.css`.
- If a component requires a new token, consult the user before adding it to `tokens.css`.

## 2. Reading Order
- Before creating a new component or page, you MUST read `DESIGN.md` to understand the visual principles (Refined Skeuomorphism, depth, and physical feedback).
- Review existing components to understand the patterns before proposing new ones.

## 3. Styling Approach
- Use Vanilla CSS Modules (`[name].module.css`) for component-specific styles.
- Animations and transitions should rely on pure CSS (transitions on `transform`, `box-shadow`, `opacity` or keyframes) for performance.

## 4. Skeuomorphism Constraints
- Emphasize depth using multiple layers of box-shadows (ambient shadow + drop shadow + inner highlight).
- Maintain clean layouts without excessive textures; rely on light and shadow to create the material feel.

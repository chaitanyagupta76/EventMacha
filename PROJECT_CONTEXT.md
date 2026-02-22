# Event Macha - Project Context & Guidelines

## Hosted in vercel
https://vercel.com/eventmachas-projects/

Username: eventmacha@gmail.com

## Live site
https://eventmacha.com/

## Domain purchased from Hostlinger
hostinger.com
eventmacha@gmail.com




## Core Principles

### 1. Mobile-First Responsive Design (MANDATORY)

**Every component MUST be mobile-responsive.** This is a non-negotiable requirement for all components in this project.

#### Responsive Design Requirements

- **Mobile-First Approach**: Design for mobile (320px+) first, then enhance for larger screens
- **Breakpoints**: Use Tailwind's standard breakpoints
  - `sm`: 640px (small tablets)
  - `md`: 768px (tablets)
  - `lg`: 1024px (desktops)
  - `xl`: 1280px (large desktops)
  - `2xl`: 1536px (extra large screens)

#### Component Checklist

Every component must include:

✅ **Responsive Layout**
- Use Tailwind's responsive grid system (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- Flexible containers with `container mx-auto px-4`
- Proper spacing that scales (`space-y-4 md:space-y-6 lg:space-y-8`)

✅ **Responsive Typography**
- Scale font sizes for different screens (`text-2xl md:text-4xl lg:text-5xl`)
- Adjust line heights and letter spacing
- Use `font-serif` for headings, `font-sans` for body

✅ **Responsive Navigation**
- Mobile: Hamburger menu or simplified nav
- Desktop: Full horizontal navigation
- Use `hidden md:flex` and `block md:hidden` patterns

✅ **Touch-Friendly Interactions**
- Minimum tap target size: 44x44px
- Adequate spacing between interactive elements
- Hover states that work on touch devices

✅ **Responsive Images**
- Use `w-full h-auto` for fluid images
- Implement proper aspect ratios
- Lazy loading for performance

✅ **Responsive Spacing**
- Use responsive padding/margin (`p-4 md:p-6 lg:p-8`)
- Adjust gaps in flex/grid layouts (`gap-4 md:gap-6 lg:gap-8`)

---

## Design System

### Brand Colors

```javascript
colors: {
  'brand-navy': '#4A5D82',    // Headings, primary text
  'brand-blue': '#7FA6D1',    // Secondary features, badges
  'brand-grey': '#96A9BC',    // Dividers, icons, borders
  'brand-rose': '#C4847C',    // Primary buttons, accents
  'brand-pink': '#FADADD',    // Background highlights
}
```

### Typography

- **Headings**: Playfair Display (serif) - `font-serif`
- **Body/UI**: Lato (sans-serif) - `font-sans`
- **Color**: `text-brand-navy` for primary text

### Component Patterns

#### Card Component Pattern
```jsx
<div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl 
                transition-all duration-300 hover:-translate-y-1">
  <div className="relative h-48 overflow-hidden">
    <img className="w-full h-full object-cover transition-transform 
                    duration-300 hover:scale-110" />
  </div>
  <div className="p-4 md:p-5 lg:p-6">
    <h3 className="text-lg md:text-xl font-serif font-semibold 
                   text-brand-navy mb-2">
      Title
    </h3>
    <p className="text-sm md:text-base text-gray-600 font-sans">
      Description
    </p>
  </div>
</div>
```

#### Section Pattern
```jsx
<section className="py-12 md:py-16 lg:py-20">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif 
                   font-bold text-brand-navy text-center mb-8 md:mb-12">
      Section Title
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                    gap-6 md:gap-8">
      {/* Content */}
    </div>
  </div>
</section>
```

#### Button Pattern
```jsx
<button className="bg-brand-rose hover:bg-brand-rose/90 text-white 
                   font-sans font-semibold px-6 py-3 md:px-8 md:py-4 
                   rounded-lg text-base md:text-lg transition-all 
                   duration-300 hover:scale-105 shadow-lg">
  Button Text
</button>
```

---

## File Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Sticky header with responsive nav
│   ├── Footer.jsx      # Footer with responsive layout
│   └── Card.jsx        # Reusable card component
├── sections/           # Page sections
│   ├── HeroBanner.jsx
│   ├── CategorySection.jsx
│   └── TrendingSection.jsx
├── pages/              # Route pages (future)
├── data/               # JSON data files
│   ├── banner.json
│   ├── categories.json
│   └── trending.json
├── i18n/               # Internationalization
│   ├── i18n.js
│   └── locales/
│       └── en/
│           └── translation.json
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

---

## Internationalization (i18n)

### Usage Pattern

```jsx
import { useTranslation } from 'react-i18next';

const Component = () => {
  const { t } = useTranslation();
  
  return <h1>{t('key.path')}</h1>;
};
```

### Adding New Translations

1. Add key to `src/i18n/locales/en/translation.json`
2. Use `t('key.path')` in components
3. Never hardcode user-facing text

---

## Component Development Guidelines

### 1. Always Start Mobile-First

```jsx
// ✅ CORRECT: Mobile first, then larger screens
<div className="text-sm md:text-base lg:text-lg">

// ❌ WRONG: Desktop first
<div className="text-lg md:text-sm">
```

### 2. Use Semantic HTML

```jsx
// ✅ CORRECT
<header>, <main>, <section>, <article>, <nav>, <footer>

// ❌ WRONG
<div className="header">, <div className="main">
```

### 3. Implement Proper Accessibility

- Use semantic HTML elements
- Add `alt` text to images
- Ensure keyboard navigation works
- Maintain proper heading hierarchy (h1 → h2 → h3)
- Use ARIA labels when needed

### 4. Performance Optimization

- Lazy load images
- Use `React.memo()` for expensive components
- Avoid inline functions in render
- Use `useCallback` and `useMemo` appropriately

### 5. Data Loading Pattern

```jsx
import { useEffect, useState } from 'react';
import data from '../data/file.json';

const Component = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data);
  }, []);

  return (
    // Render items
  );
};
```

---

## Testing Checklist

Before committing any component, verify:

- [ ] Works on mobile (320px - 640px)
- [ ] Works on tablet (640px - 1024px)
- [ ] Works on desktop (1024px+)
- [ ] All text is readable on all screen sizes
- [ ] Images scale properly
- [ ] Touch targets are at least 44x44px
- [ ] No horizontal scrolling on mobile
- [ ] Hover states work (but don't break touch)
- [ ] All text uses translation keys (i18n)
- [ ] Follows brand color guidelines
- [ ] Uses proper semantic HTML
- [ ] Accessible via keyboard

---

## Common Responsive Patterns

### Responsive Grid

```jsx
// 1 column mobile, 2 tablet, 3 desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
```

### Responsive Flex

```jsx
// Stack on mobile, row on desktop
<div className="flex flex-col md:flex-row gap-4 md:gap-6">
```

### Responsive Text

```jsx
<h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
<p className="text-sm md:text-base lg:text-lg">
```

### Responsive Spacing

```jsx
<section className="py-8 md:py-12 lg:py-16">
<div className="px-4 md:px-6 lg:px-8">
<div className="space-y-4 md:space-y-6 lg:space-y-8">
```

### Show/Hide Based on Screen Size

```jsx
// Show only on mobile
<div className="block md:hidden">Mobile Menu</div>

// Show only on desktop
<nav className="hidden md:flex">Desktop Nav</nav>

// Show on tablet and up
<div className="hidden md:block">Tablet+</div>
```

---

## Git Workflow

**IMPORTANT**: Do not push code to GitHub for every small change. Batch related changes together.

### Best Practices

1. **Work on feature branch** (optional for solo development)
2. **Test responsiveness** on all screen sizes before committing
3. **Batch related changes**: Group related features/fixes into a single commit
4. **Commit with descriptive messages** that explain what was changed and why
5. **Push to GitHub** only when a feature is complete or at logical milestones

### When to Push

✅ **DO push when:**
- A complete feature is implemented and tested
- Multiple related changes are ready (e.g., new language support + UI updates)
- Reaching a logical milestone (e.g., all animations complete)
- End of work session with stable, working code

❌ **DON'T push for:**
- Every single file change
- Work-in-progress code
- Experimental changes that might be reverted
- Minor tweaks or typo fixes (batch these together)

### Example Workflow

```bash
# Make multiple related changes
git add .
git commit -m "Add multi-language support with 5 Indian languages"

# Continue working on related features
# ... make more changes ...

# Commit again when another logical unit is complete
git add .
git commit -m "Add scroll animations to all sections"

# Push when ready (e.g., end of session or major milestone)
git push
```

---

## Deployment

The application is ready to deploy to:
- **Vercel** (recommended for Next.js/React)
- **Netlify**
- **GitHub Pages**
- **Cloudflare Pages**

---

## Summary

**REMEMBER**: Every component must be mobile-responsive from the start. Test on multiple screen sizes before considering it complete. Mobile users are a significant portion of web traffic, and Event Macha must provide an excellent experience on all devices.

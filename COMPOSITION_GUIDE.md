# Brand Composition System

## Overview

This is not a slide template engine — it's a **brand composition engine**.

Every element is:
- ✅ Brand-locked (Inter Tight, #10348C)
- ✅ Spacing-locked (consistent rhythm)
- ✅ Grid-locked (1200×1500)

But composition is **flexible**.

---

## Available Elements

### 1. `headline`
Large, bold headline text.

```json
{
  "type": "headline",
  "text": "Your headline here"
}
```

**Typography:** 60px, SemiBold, #0F172A

---

### 2. `blueBlock`
Uppercase statement in brand blue.

```json
{
  "type": "blueBlock",
  "text": "YOUR STATEMENT",
  "size": "large"
}
```

**Options:**
- `size`: `"large"` (96px) or `"medium"` (72px)

**Typography:** ExtraBold, uppercase, #10348C background

---

### 3. `paragraph`
Body text for explanations.

```json
{
  "type": "paragraph",
  "text": "Your explanation here.",
  "size": "large"
}
```

**Options:**
- `size`: `"normal"` (28px) or `"large"` (38px)

**Typography:** Medium weight, #0F172A

---

### 4. `statBlock`
Number/stat with optional label.

```json
{
  "type": "statBlock",
  "value": "87% REAL",
  "label": "Optional description"
}
```

**Typography:** 72px uppercase for value, 24px for label

---

### 5. `list`
Bulleted or numbered list.

```json
{
  "type": "list",
  "items": ["First point", "Second point", "Third point"],
  "ordered": false
}
```

**Options:**
- `ordered`: `true` for numbers, `false` for bullets

**Typography:** 32px, bullets in brand blue

---

### 6. `quote`
Quoted text with optional attribution.

```json
{
  "type": "quote",
  "text": "Your quote here",
  "author": "Author Name"
}
```

**Typography:** 42px italic, blue left border

---

### 7. `divider`
Horizontal line separator.

```json
{
  "type": "divider",
  "thickness": "medium"
}
```

**Options:**
- `thickness`: `"thin"` (2px), `"medium"` (4px), `"thick"` (6px)

---

### 8. `spacer`
Vertical white space.

```json
{
  "type": "spacer",
  "size": "medium"
}
```

**Options:**
- `size`: `"small"` (16px), `"medium"` (32px), `"large"` (64px)

---

## Example Compositions

### Hook Slide
```json
{
  "type": "composable",
  "elements": [
    { "type": "blueBlock", "text": "YOU CANNOT" },
    { "type": "blueBlock", "text": "CALL THIS" },
    { "type": "blueBlock", "text": "EVIDENCE" }
  ]
}
```

### Stat Comparison
```json
{
  "type": "composable",
  "elements": [
    { "type": "headline", "text": "Most AI detection tools only provide a probability score." },
    { "type": "statBlock", "value": "87% REAL" },
    { "type": "statBlock", "value": "92% FAKE" },
    { "type": "spacer", "size": "medium" },
    { "type": "paragraph", "text": "That is not evidence.", "size": "large" }
  ]
}
```

### List with Headline
```json
{
  "type": "composable",
  "elements": [
    { "type": "headline", "text": "Three Key Principles" },
    { "type": "divider", "thickness": "medium" },
    { "type": "spacer", "size": "small" },
    { "type": "list", "items": [
      "First principle here",
      "Second principle here",
      "Third principle here"
    ], "ordered": true }
  ]
}
```

### Quote Slide
```json
{
  "type": "composable",
  "elements": [
    { "type": "quote", "text": "The best way to predict the future is to invent it.", "author": "Alan Kay" },
    { "type": "spacer", "size": "large" },
    { "type": "paragraph", "text": "This shaped how I think about building products." }
  ]
}
```

---

## Design Philosophy

**Guardrails, not prison.**

- Fixed: Container, colors, fonts, spacing rhythm
- Flexible: Element arrangement, text content, composition flow

Every post will:
- Feel different (varied composition)
- Look consistent (brand-locked styling)
- Feel premium (engineered spacing)
- Feel institutional (typography authority)

---

## Legacy Format Support

Old slide types still work:

```json
{
  "type": "hook",
  "lines": ["LINE 1", "LINE 2", "LINE 3"]
}
```

```json
{
  "type": "headlineWithBlocks",
  "headline": "Your headline",
  "blocks": ["BLOCK 1", "BLOCK 2"],
  "closing": "Closing line."
}
```

But the new composable format gives you **full creative control** within brand constraints.

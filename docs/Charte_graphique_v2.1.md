# Charte Graphique v2.1 — Grow App

## Vision

Direction visuelle :

> Calm Dark horticole + Compact Tent Workspace

Objectifs :

- confortable visuellement
- mobile-first
- faible fatigue oculaire
- premium mais sobre
- pensée pour usage quotidien
- optimisée pour compréhension rapide

La V2.1 introduit :

```txt
0-scroll primary workflow
```

L’utilisateur doit ressentir :

```txt
j’ouvre ma tente
→ je comprends immédiatement
→ j’agis rapidement
→ je continue ma journée
```

---

# Core Design Principles

L’application doit être :

- calm
- premium
- nature-inspired
- focused
- fast to use
- low cognitive load
- fold-first

Toujours privilégier :

```txt
Maximum insight
Minimum friction
```

---

# Fold‑First Design

Principe majeur V2.1 :

> les actions critiques doivent être visibles sans scroll.

Above-the-fold obligatoire :

```txt
Tent Header
Status Hero
Quick Actions
```

À éviter :

```txt
scroll obligatoire
cards infinies
render all sections
```

---

# Information Hierarchy

## Tier 1 — Always Visible

Toujours visibles :

```txt
Tent Header
Status Hero
Quick Actions
```

Règles :

```txt
large touch targets
high visual priority
readable instantly
```

## Tier 2 — Contextual

Affiché seulement si utile :

```txt
Today Summary
Missing observation
Important reminders
```

Pattern :

```txt
adaptive card
```

Peut disparaître complètement.

## Tier 3 — On Demand

Accessible via switch local :

```txt
Timeline | Tasks | Photos
```

Règle :

```txt
do not render everything
```

---

# Mood

Le produit doit évoquer :

```txt
Calm
Control
Clarity
Confidence
Focus
```

Jamais :

```txt
industrial admin panel
ERP
monitoring overload
```

---

# Color Palette

| Token | Hex | Usage |
|---|---:|---|
| Background | #0F1412 | fond |
| Surface | #171D1A | containers |
| Card | #1F2824 | cards |
| Primary | #7BC67B | CTA |
| Secondary | #79B8FF | support |
| Warning | #E8C36A | warning |
| Danger | #D97777 | danger |
| Text | #E7ECE9 | texte |
| Text Muted | #A7B0AA | secondaire |
| Border | #2C3731 | borders |

Règle :

```txt
jamais de noir pur
```

---

# Layout Philosophy

Pattern :

```txt
Header
Status Hero
Quick Actions
Adaptive Context
Workspace Switcher
```

Desktop :

```txt
enhancement
```

Mobile :

```txt
priority
```

---

# Component Rules

## Status Hero

Objectif :

```txt
Understand in < 3 sec
```

Doit afficher :

```txt
Temperature
Humidity
Light state
Global state
```

Toujours :

```txt
large typography
minimal density
```

## Quick Actions

Toujours :

```txt
thumb friendly
one tap feeling
44px+ touch targets
```

Exemple :

```txt
💧 Watering
🧪 Feeding
📝 Note
⚠ Issue
```

## Contextual Observation

Éviter :

```txt
long form
permanent sliders
```

Préférer :

```txt
Missing observation
[Complete check-in]
```

→ ouvre une sheet.

---

# Workspace Switcher

Pattern :

```txt
Timeline | Tasks | Photos
```

Objectif :

```txt
reduce scroll
maintain context
```

Ne doit PAS ressembler à :

```txt
deep navigation
```

---

# Accessibility Rules

Toujours :

- contraste suffisant
- labels visibles
- spacing généreux
- grandes zones tactiles

Éviter :

```txt
crowded screens
tiny buttons
dense dashboards
```

---

# Guiding Principle

Toujours privilégier :

```txt
Maximum insight
Minimum friction
```

Si une UI :

```txt
ajoute du scroll
ralentit l’action
complexifie la lecture
```

alors :

> elle doit être simplifiée ou déplacée.

# Charte Graphique v2.1 — Grow App

## Vision

Direction visuelle :

> Calm Dark horticole + Compact Tent Workspace

Objectifs :

- confortable visuellement
- premium mais sobre
- mobile-first
- faible fatigue oculaire
- optimisée pour workflow quotidien
- pensée pour compréhension immédiate

La V2.1 introduit :

```txt
0-scroll primary workflow
One glance UX
Progressive disclosure
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
- low cognitive load
- fast to use
- fold-first
- mobile-first

Principe directeur :

```txt
Maximum insight
Minimum friction
```

---

# UX Design Rules

## 1. Fold‑First Design

Principe :

> les éléments critiques doivent être visibles sans scroll.

Above the fold obligatoire :

```txt
Tent Header
Status Hero
Quick Actions
```

Objectifs :

```txt
Understand < 3 sec
Act < 15 sec
No mandatory scroll
```

À éviter :

```txt
long pages
stacked cards everywhere
render all sections
```

---

## 2. One Glance UX

Principe :

> l’état de la tente doit être compris en un regard.

Toujours privilégier :

```txt
hero information
global interpretation
readability
```

Éviter :

```txt
dense metrics
multiple equal-priority cards
spread attention
```

Bon :

```txt
Stable environment
24°C · RH58%
Lights ON
```

Mauvais :

```txt
Temp 24.2
RH 58
Power 612
VPD 1.03
EC 1.4
```

---

## 3. Progressive Disclosure

Principe :

> montrer seulement ce qui est utile maintenant.

Pattern :

```txt
show essentials
reveal details on demand
```

Exemples :

Observation :

```txt
Complete observation
```

→ sheet.

Environment :

```txt
View details
```

→ dedicated screen.

Tasks :

```txt
2 tasks due
```

→ open Tasks.

---

## 4. Contextual UI

L’interface ne doit pas être statique.

Le système affiche :

```txt
what matters today
```

Exemples :

```txt
Observation missing
2 tasks due
Everything looks good
```

Éviter :

```txt
always render everything
```

---

# Mood

Le produit doit évoquer :

```txt
Calm
Control
Confidence
Clarity
Focus
Nature
```

Le produit doit ressembler à :

```txt
soft horticultural workspace
```

et jamais à :

```txt
industrial dashboard
ERP
gaming UI
monitoring overload
```

---

# Color Palette

## Core Tokens

| Token | Hex | Usage |
|---|---:|---|
| Background | #0F1412 | Fond global |
| Surface | #171D1A | Containers |
| Card | #1F2824 | Cards |
| Primary | #7BC67B | Primary CTA |
| Primary Hover | #69B869 | Hover |
| Secondary | #79B8FF | Secondary actions |
| Warning | #E8C36A | Warning |
| Danger | #D97777 | Danger |
| Text | #E7ECE9 | Main text |
| Text Muted | #A7B0AA | Secondary text |
| Border | #2C3731 | Borders |

Règle :

```txt
Never use pure black
```

---

# Typography

Police recommandée :

```txt
Inter
```

Principes :

```txt
Readable
Breathing room
Soft hierarchy
Comfortable on mobile
```

## Scale

| Usage | Tailwind |
|---|---|
| H1 | text-3xl |
| H2 | text-xl |
| H3 | text-lg |
| Body | text-base |
| Meta | text-sm |
| Caption | text-xs |

Toujours :

```txt
comfortable spacing
semi-bold headings
clear hierarchy
```

---

# Layout Philosophy

Le layout V2.1 suit :

```txt
Header
Status Hero
Quick Actions
Today Panel (contextual)
Workspace Pills
```

Objectif :

```txt
minimal vertical friction
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
high visual priority
large touch targets
fast readability
```

---

## Tier 2 — Contextual

Visible seulement si utile :

```txt
Today Panel
Observation missing
Pending work
```

Pattern :

```txt
adaptive compact card
```

Peut disparaître.

---

## Tier 3 — On Demand

Accessible via :

```txt
segmented pills
```

Pattern :

```txt
[Timeline] [Tasks] [Photos]
```

Objectif :

```txt
reduce scroll
keep context
```

---

# Components

## Tent Header

Toujours :

```txt
readable instantly
minimal
calm
```

Contenu :

```txt
Tent
Run
Stage
Day count
```

---

## Status Hero

Objectif :

```txt
Understand instantly
```

Toujours :

```txt
large typography
minimal metrics
soft interpretation
```

Contenu MVP :

```txt
Global state
Temperature
Humidity
Light state
```

Lecture :

```txt
< 3 sec
```

---

## Quick Actions

Objectif :

```txt
one tap feeling
```

Règles :

```txt
44px+ targets
thumb friendly
short labels
clear affordance
```

Exemple :

```txt
💧 Watering
🧪 Feeding
📝 Note
⚠ Issue
```

---

## Today Panel

Responsabilité :

```txt
what matters today
```

Exemple :

```txt
Observation missing
2 tasks due
Last watering: 09:12
```

Pattern :

```txt
small contextual card
```

---

## Daily Observation

Éviter :

```txt
permanent sliders
large forms
```

Préférer :

```txt
Complete observation
```

→ sheet

→ save

→ close

---

## Workspace Pills

Pattern officiel :

```txt
[Timeline] [Tasks] [Photos]
```

Objectifs :

```txt
maintain context
reduce scroll
mobile-friendly switching
```

---

## Collapsed Sticky Hero

La V2.1 introduit :

```txt
collapsed hero
```

Avant scroll :

```txt
Tent 1
FLOWER · Day 42
24°C RH58 Lights ON
```

Après scroll :

```txt
Tent 1 · D42 · 24°C · RH58%
```

Objectifs :

```txt
less fatigue
persistent awareness
more usable space
```

---

# Accessibility Rules

Toujours :

- contraste suffisant
- labels visibles
- spacing confortable
- targets larges

Éviter :

```txt
crowded screens
tiny buttons
dense UI
```

---

# Guiding Principle

Toujours privilégier :

```txt
Maximum insight
Minimum friction
```

Si une interface :

```txt
augmente le scroll
augmente la charge cognitive
ralentit l’action
```

alors :

> elle doit être simplifiée, déplacée ou supprimée.

---

## Status

Cette charte sert de **source de vérité visuelle officielle V2.1** et guide toute évolution UI/UX future.

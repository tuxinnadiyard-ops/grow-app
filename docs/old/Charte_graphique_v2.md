# Charte Graphique v2 — Grow App

## Vision

Cette application adopte une direction :

> Calm Dark horticole

Objectifs :

- confortable visuellement
- utilisable le soir ou dans un garage
- mobile-first
- faible fatigue oculaire
- premium mais sobre
- orientée monitoring doux
- pensée pour l’usage quotidien

La V2 introduit une philosophie :

> Tent-centric workspace

L’utilisateur doit ressentir :

```txt
j’ouvre ma tente
→ je comprends immédiatement l’état
→ j’agis rapidement
→ je continue ma journée
```

L’UI doit réduire la friction et favoriser la répétition quotidienne.

---

# Design Principles

L’application doit être :

- calm
- premium
- nature-inspired
- functional
- focused
- fast to use
- low cognitive load

Toujours privilégier :

> Maximum insight, minimum friction

---

# Mood

Le produit doit évoquer :

```txt
Calm
Nature
Control
Soft monitoring
Confidence
Simplicity
```

L’interface doit donner une sensation :

```txt
soft dashboard
```

et jamais :

```txt
industrial admin panel
```

---

# What We Avoid

Éviter absolument :

- RGB / gaming aesthetics
- contrastes agressifs
- dashboards anxiogènes
- surcharge d’information
- interfaces type ERP
- micro-textes
- formulaires complexes
- workflows profonds
- interactions inutiles

L’utilisateur ne doit jamais ressentir :

```txt
fatigue
confusion
friction
```

---

# Design Philosophy

Le produit suit une règle simple :

```txt
See
→ Understand
→ Act
```

Un écran ne doit jamais demander :

```txt
ouvrir écran
→ chercher
→ ouvrir sous-écran
→ faire action
```

Toujours favoriser :

```txt
1 screen
1 understanding
1 action
```

---

# Color Palette

## Core Tokens

| Token | Hex | Usage |
|--------|-----|-------|
| Background | `#0F1412` | Fond global |
| Surface | `#171D1A` | Zones UI |
| Card | `#1F2824` | Cards |
| Primary | `#7BC67B` | Action principale |
| Primary Hover | `#69B869` | Hover |
| Secondary | `#79B8FF` | Action secondaire |
| Warning | `#E8C36A` | Warning |
| Danger | `#D97777` | Erreur / suppression |
| Text | `#E7ECE9` | Texte principal |
| Text Muted | `#A7B0AA` | Texte secondaire |
| Border | `#2C3731` | Bordures |

---

# Semantic Usage

## Background

Usage :

```txt
App shell
Sidebar
Page background
```

Règle :

Jamais de noir pur.

```txt
#000000 ❌
```

Toujours préférer :

```txt
soft dark
```

---

## Surface

Usage :

```txt
Sidebar
Drawer
Panels
Sections
Containers
```

---

## Card

Usage :

```txt
Tent cards
Journal entries
Tasks
Metrics
Quick status
```

Le produit est principalement :

```txt
card-based
```

---

## Primary

Usage :

```txt
Primary CTA
Save
Add entry
Confirm
```

Exemples MVP :

```txt
+ Watering
+ Feeding
+ Note
+ Issue
```

---

## Secondary

Usage :

```txt
Secondary actions
Navigation
Supporting interactions
```

---

## Warning

Usage :

```txt
Threshold reached
Humidity warning
Missing task
```

---

## Danger

Usage :

```txt
Delete
Critical alert
Finish run
```

Doit rester rare.

---

# Typography

Police recommandée :

```txt
Inter
```

Principes :

- lisible
- respirante
- mobile-friendly
- hiérarchie claire

---

## Typography Scale

| Usage | Tailwind |
|--------|-----------|
| H1 | `text-3xl` |
| H2 | `text-xl` |
| H3 | `text-lg` |
| Body | `text-base` |
| Meta | `text-sm` |
| Caption | `text-xs` |

---

## Typography Rules

Toujours :

- semi-bold pour les titres
- spacing généreux
- contraste doux
- taille confortable

Éviter :

```txt
tiny text everywhere
```

---

# Layout Philosophy

## Mobile-First

Le produit est pensé d’abord pour :

```txt
Une personne dans une tente
Téléphone à la main
Interaction rapide
```

Desktop :

```txt
enhancement
```

et non priorité.

---

# App Shell

La V2 introduit un layout standardisé.

Pattern :

```txt
App Shell
├── Sidebar / Drawer
└── Content Area
```

Objectif :

```txt
fast predictable navigation
```

---

## Desktop Layout

Structure :

```txt
┌──────── Sidebar ───────┬──────── Content ───────┐
│ Dashboard              │ Tent Working Screen    │
│ Tent 1                 │ Quick Status           │
│ Tent 2                 │ Quick Actions          │
│ Settings               │ Journal Timeline       │
│ Logout                 │ Tasks                  │
└────────────────────────┴────────────────────────┘
```

Pattern :

```txt
Sidebar + Content
```

Sidebar persistante.

---

## Mobile Layout

Pattern :

```txt
Drawer navigation
```

Exemple :

```txt
☰ Tent 1
```

ouvre :

```txt
Dashboard
Tent 1
Tent 2
+ Add Tent
Settings
Logout
```

Objectif :

> maximiser l’espace utile

---

# Spacing System

## Vertical Rhythm

| Usage | Tailwind |
|--------|-----------|
| Tight | `gap-2` |
| Standard | `gap-4` |
| Section | `gap-6` |
| Screen | `gap-8` |

---

## Padding

| Usage | Tailwind |
|--------|-----------|
| Small | `p-3` |
| Standard | `p-5` |
| Large | `p-6` |

Objectif :

```txt
comfortable touch UI
```

---

# Components

## Cards

Style :

- rounded corners
- subtle borders
- soft contrast
- generous spacing

Direction Tailwind :

```tsx
rounded-2xl
border
bg-card
p-5
```

Usage :

```txt
Tent summary
Journal entry
Quick status
Tasks
Photos
```

---

## Buttons

Types :

```txt
Primary
Secondary
Danger
Ghost
```

Principes :

- larges zones tactiles
- labels courts
- obvious affordance
- mobile-first

Minimum recommandé :

```txt
44px touch target
```

Toujours :

```txt
thumb friendly
```

---

## Inputs

Principes :

- full width mobile
- bordures subtiles
- focus visible
- spacing confortable

Pattern recommandé :

```tsx
<div className="flex flex-col gap-2 sm:flex-row">
```

---

# Sidebar Rules

## Desktop Sidebar

Toujours visible.

Contenu MVP :

```txt
Dashboard

Tent 1
Tent 2

+ Add Tent

Settings

Login / Logout
```

Doit rester :

```txt
minimal
predictable
fast
```

---

## Mobile Drawer

Accessible via :

```txt
☰
```

Doit être :

```txt
one-thumb friendly
```

Temps d’accès cible :

```txt
< 1 second
```

---

# Tent Working Screen Rules

Le Tent Working Screen devient :

> le cœur du produit

Structure MVP :

```txt
Tent Header

Quick Status

Quick Actions

Daily Observation

Journal Timeline

Tasks

Photos
```

Ordre :

```txt
See state
→ Understand
→ Act
→ Review
```

---

## Tent Header

Toujours visible.

Contenu :

```txt
Tent 1
Critical CBD
FLOWER · Day 42
```

Actions secondaires :

```txt
Change stage
Run details
Finish run
```

---

## Quick Status

Toujours visible en haut.

Contenu MVP :

```txt
Temperature
Humidity
Light state
```

Lecture cible :

```txt
< 3 sec
```

Éviter surcharge.

Pas de :

```txt
advanced analytics
dense metrics
```

en MVP.

---

## Quick Actions

MVP strict :

```txt
+ Watering
+ Feeding
+ Note
+ Issue
```

Objectif :

```txt
one tap logging
```

Éviter :

```txt
too many buttons
```

---

## Daily Observation

Toujours visible dans le workflow.

Contenu :

```txt
Health score
Stress
Vigour
```

Interaction :

```txt
fast sliders
```

Objectif :

```txt
daily check-in in seconds
```

---

## Journal Timeline

Toujours :

- chronologique
- grouped by day
- mobile readable
- card-based

Jamais :

```txt
dense tables
```

---

## Tasks

Dans le MVP :

```txt
tent-local only
```

Pas de task center global.

Usage :

```txt
Tent
→ see due task
→ complete
```

---

## Photos

Dans le MVP :

```txt
tent-local only
```

Pas de galerie globale.

Usage :

```txt
Tent
→ add photo
→ review growth
```

---

# Accessibility Rules

Toujours :

- contraste suffisant
- spacing confortable
- labels visibles
- touch targets larges

Éviter :

```txt
tiny buttons
hidden actions
crowded screens
```

---

# Tailwind Direction

```ts
colors: {
  background: "#0F1412",
  surface: "#171D1A",
  card: "#1F2824",
  primary: "#7BC67B",
  secondary: "#79B8FF",
  warning: "#E8C36A",
  danger: "#D97777",
  text: "#E7ECE9",
  muted: "#A7B0AA",
  border: "#2C3731",
}
```

---

# Guiding Principle

Toujours privilégier :

```txt
Maximum insight
Minimum friction
```

Si une interface semble :

```txt
plus jolie
mais plus lente
```

alors :

```txt
préférer la simplicité
```

---

## Status

Ce document sert de **source de vérité visuelle officielle V2** du projet et doit guider toute évolution UI/UX future.
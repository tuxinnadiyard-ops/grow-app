# Screens & Navigation Strategy v2.1 — Grow App

## Purpose

Ce document définit les écrans, la navigation et les règles UX officielles de l’application.

Objectifs :

- clarifier le scope UI/UX
- standardiser la navigation
- réduire la friction quotidienne
- formaliser le Compact Tent Workspace
- éviter la surcharge visuelle

Cette version introduit :

> Fold‑First Navigation

---

# UX Principles

L’application est :

- mobile-first
- tent-centric
- compact
- action-oriented
- low cognitive load
- optimized for daily usage

Principe UX :

```txt
Maximum insight
Minimum friction
```

Objectif principal :

```txt
Open tent
→ Understand
→ Act
```

---

# Navigation Philosophy

La navigation produit devient :

```txt
Sidebar-driven
Tent-centric
Contextual
```

Toujours viser :

```txt
≤ 2 interactions
```

pour les actions fréquentes.

Éviter :

```txt
screen
→ screen
→ sub screen
→ modal
```

Préférer :

```txt
screen
→ action
```

ou :

```txt
screen
→ local context switch
```

---

# App Shell

Pattern :

```txt
AppShell
├── Sidebar / Drawer
└── Content Area
```

Sidebar :

```txt
Dashboard
Tent 1
Tent 2
+ Add Tent
Settings
Logout
```

---

# Dashboard

## Purpose

Vue globale rapide.

Objectif :

```txt
understand all tents in < 5 sec
```

Le dashboard reste :

```txt
overview only
```

Pas :

```txt
dense monitoring
charts
analytics overload
```

---

## Tent Card

Contenu MVP :

```txt
Tent name
Stage
Day count
Temperature
Humidity
Light state
```

Exemple :

```txt
Tent 1
FLOWER · Day 42
24°C · RH58%
Lights ON
```

Actions :

```txt
Open tent
Start run
```

---

# Tent Workspace (V2.1)

## Purpose

Le Tent Workspace devient :

> le cœur du produit

Objectif :

```txt
Understand in < 3 sec
Act in < 15 sec
No mandatory scroll
```

---

## Tent Workspace Layout

Structure officielle :

```txt
Tent Header

Status Hero

Quick Actions

Adaptive Context (optional)

Workspace Switcher
├── Timeline
├── Tasks
└── Photos
```

Important :

```txt
not render all sections
```

---

## 1. Tent Header

Contenu :

```txt
Tent name
Run name
Stage
Day count
```

Exemple :

```txt
Tent 1
Critical CBD
FLOWER · Day 42
```

Actions secondaires :

```txt
Run details
Change stage
Finish run
```

Règle :

```txt
readable instantly
```

---

## 2. Status Hero

Responsabilité :

```txt
Understand state instantly
```

Contenu MVP :

```txt
Temperature
Humidity
Light state
Global state
```

Exemple :

```txt
24°C
RH58%
Lights ON
Stable environment
```

Lecture cible :

```txt
< 3 sec
```

Règles :

```txt
large values
minimal density
no clutter
```

---

## 3. Quick Actions

Objectif :

```txt
one tap logging
```

MVP strict :

```txt
+ Watering
+ Feeding
+ Note
+ Issue
```

Règles :

```txt
thumb friendly
44px+
short labels
obvious affordance
```

Temps cible :

```txt
< 15 sec
```

---

## 4. Adaptive Context

Section conditionnelle.

Exemples :

```txt
Observation missing
2 tasks due
Last watering today
```

Pattern :

```txt
compact adaptive card
```

Peut disparaître si inutile.

---

## Daily Observation

N’est plus une section permanente.

Pattern :

```txt
Observation missing
[Complete check‑in]
```

Action :

```txt
open sheet
```

Temps cible :

```txt
few seconds
```

---

## 5. Workspace Switcher

Pattern officiel :

```txt
Timeline | Tasks | Photos
```

But :

```txt
reduce scroll
keep context
```

L’utilisateur reste dans :

```txt
Tent Workspace
```

---

### Timeline

Objectif :

```txt
review history quickly
```

Structure :

```txt
Today
08:42 Watering
14:22 Note
```

Toujours :

```txt
chronological
grouped by day
card-based
```

---

### Tasks

Règle MVP :

```txt
tent-local only
```

Contenu :

```txt
Due today
Upcoming
Completed
```

Actions :

```txt
Complete task
Create task
```

---

### Photos

Règle MVP :

```txt
tent-local only
```

Actions :

```txt
Upload photo
Review growth
```

---

# Secondary Experiences

Déplacées hors workflow principal.

Inclut :

```txt
Environment
Insights
Monitoring details
Advanced charts
```

Accès :

```txt
secondary CTA
sheet
dedicated screen
```

Principe :

> ne jamais ralentir le workflow quotidien

---

# Settings

## Profile

Contenu :

```txt
Email
Password
```

---

## Home Assistant

Phase 2 :

```txt
URL
Token
Connection status
Device mapping
```

---

# MVP Screen Set

```txt
Login
Register
Dashboard
Tent Workspace
Run Details
Settings
```

---

# Recommended Build Order

```txt
1. Compact Tent Workspace
2. Status Hero
3. Quick Actions
4. Adaptive Context
5. Timeline
6. Tasks
7. Photos
8. Fake provider
9. Home Assistant
```

---

# Guiding Principle

Toujours privilégier :

```txt
Open tent
→ Understand
→ Act
```

Si une navigation :

```txt
ajoute du scroll
augmente les clics
complexifie la lecture
```

alors :

> elle doit être simplifiée, déplacée ou supprimée.

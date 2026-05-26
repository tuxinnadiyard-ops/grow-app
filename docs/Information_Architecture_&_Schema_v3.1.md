# Information Architecture & Schema v3.1 — Grow App

## Purpose

Ce document sert de source de vérité architecturelle du projet.

Objectifs :

- aligner produit, UX et modèle de données
- stabiliser Prisma avant ajout massif de features
- formaliser la séparation Domain Model / UX Model
- adapter l’UX à la philosophie Compact Tent Workspace
- éviter les refactors coûteux

Cette version V3.1 introduit :

> une évolution UX forte sans modifier le modèle métier fondamental.

---

# Architecture Principles

Le système doit être :

- mobile-first
- tent-centric côté UX
- compact côté expérience utilisateur
- orienté workflow quotidien
- extensible
- compatible Home Assistant
- pensé pour post‑analyse
- utile avant hardware réel

Principe :

```txt
Maximum insight
Minimum friction
```

Architecture générale :

```txt
Manual Input
+ Monitoring
+ Derived Metrics
=
Post-analysis capable grow journal
```

---

# Foundational Principle

## Domain Model ≠ UX Model

Principe majeur :

> le modèle métier n’est pas le modèle UX.

Le backend est structuré pour :

```txt
consistency
history
analytics
extensibility
```

Le frontend est structuré pour :

```txt
speed
daily workflow
clarity
low friction
```

---

# Domain Model (Business Architecture)

Structure métier cible :

```txt
User
└── GrowSpace
    └── Tent
        ├── Device
        └── Run
            ├── JournalEntry
            ├── Observation
            ├── SensorSnapshot
            ├── Photo
            ├── Task
            ├── Harvest
            └── Alert
```

Important :

```txt
No structural changes in v3.1
```

Le modèle Prisma reste stable.

---

# UX Model (Frontend Architecture)

La navigation produit devient :

```txt
Dashboard
→ Tent Workspace
```

Le Tent Workspace suit un modèle :

```txt
Fold-first
Compact
Contextual
```

Le système charge implicitement :

```txt
Tent
→ active run
→ quick status
→ quick actions
→ contextual signals
→ timeline
→ tasks
→ photos
```

L’utilisateur interagit rarement directement avec :

```txt
Run
```

Le run reste :

```txt
secondary workflow
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

Responsabilité :

```txt
Understand
Act
```

---

## Tier 2 — Contextual

Visible seulement si utile :

```txt
Today summary
Missing observation
Pending actions
```

Pattern :

```txt
adaptive UI
```

Exemples :

```txt
Observation missing
2 tasks due
Last watering 09:12
```

Peut disparaître.

---

## Tier 3 — On Demand

Accessible via :

```txt
Timeline | Tasks | Photos
```

Responsabilité :

```txt
review
support workflow
```

Important :

```txt
Do not render everything at once
```

---

# Screen → Data Mapping

## Dashboard

Affiche :

```txt
overview multi‑tentes
```

Données :

```txt
Tent
Run(active)
SensorSnapshot(latest)
```

---

## Tent Workspace

Affiche :

```txt
Tent Header
Status Hero
Quick Actions
Adaptive Context
Workspace Switcher
```

Données :

```txt
Tent
Run(active)
SensorSnapshot(latest)
Task
Observation
JournalEntry
Photo
```

### Workspace Switcher

Pattern :

```txt
Timeline | Tasks | Photos
```

#### Timeline

Données :

```txt
JournalEntry
Observation
```

#### Tasks

Données :

```txt
Task
```

#### Photos

Données :

```txt
Photo
```

---

## Run Details

Responsabilités :

```txt
metadata
history
stage management
finish run
```

Ne doit PAS contenir :

```txt
duplicated workspace
duplicated timeline
daily workflow
```

---

## Environment Screen

Status :

```txt
Phase 2
```

Responsabilité :

```txt
detailed monitoring
```

Contenu :

```txt
temperature
humidity
power
charts
```

Accès :

```txt
secondary workflow
```

Important :

```txt
outside primary workflow
```

---

# Entity Model

## Tent

Responsabilité :

> workspace principal du produit

Expose directement :

```txt
active run
status hero
quick actions
timeline
tasks
photos
```

---

## Run

Responsabilité :

```txt
metadata
history
stage management
analytics
```

Toujours :

```txt
secondary workflow
```

Accessible via :

```txt
Tent
→ Run Details
```

---

## Observation

Responsabilité :

```txt
daily subjective check‑in
```

UX Rules :

```txt
contextual
not permanently rendered
fast interaction
```

Pattern :

```txt
Complete observation
→ sheet
→ save
```

---

## SensorSnapshot

Responsabilité :

```txt
environment history
```

Dans le MVP :

```txt
Quick Status only
```

Pas :

```txt
advanced monitoring
```

---

## Task

Responsabilité :

```txt
tent-local support workflow
```

Règle MVP :

```txt
tent-local only
```

---

## Photo

Responsabilité :

```txt
visual tracking
```

Règle MVP :

```txt
tent-local only
```

---

# API Map

## MVP

```txt
/api/auth/login
/api/auth/register

/api/dashboard
/api/tents
/api/runs

/api/journal
/api/observations
/api/tasks
/api/photos

/api/settings
```

---

## Phase 2

```txt
/api/environment
/api/home-assistant/connect
/api/snapshots
```

---

# Backend Rules

Toujours :

```txt
ownership validation
scoped queries
mobile-friendly payloads
no cross-user access
```

Exemple :

```txt
Run
→ Tent
→ GrowSpace
→ User
```

---

# Development Direction

Ordre recommandé :

```txt
1. Compact Tent Workspace
2. Status Hero
3. Quick Actions
4. Adaptive Context
5. Timeline
6. Tasks
7. Photos
8. Fake Monitoring
9. Home Assistant
10. Analytics
```

---

# Guiding Principle

Toujours privilégier :

```txt
Open tent
→ Understand
→ Act
```

Si une architecture UX :

```txt
augmente la friction
ajoute du scroll
ralentit l’usage
```

alors :

> elle doit être simplifiée ou déplacée hors workflow principal.

---

## Status

Ce document sert de source de vérité officielle V3.1 de l’architecture métier, UX architecture, API et séparation Domain Model / UX Model.

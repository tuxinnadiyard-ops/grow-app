# Overview v2.1 — Grow App

## Purpose

Ce document sert de **source de vérité produit officielle** du projet.

Objectifs :

- aligner vision produit, UX et architecture
- clarifier les principes structurants du système
- stabiliser les décisions fondamentales avant implémentation
- guider les documents fonctionnels et techniques
- éviter les incohérences entre UX, backend et roadmap

Cette version V2.1 formalise une évolution majeure :

> le passage d’un écran tente “render-all” à un **Compact Tent Workspace** mobile-first, pensé pour un usage quotidien rapide et confortable.

---

# Product Vision

Grow App est un :

> journal horticole indoor mobile-first, tent-centric et orienté post‑analyse.

L’application doit permettre :

> de piloter, documenter et comprendre une culture indoor de manière simple, rapide et exploitable.

Le système doit rester utile :

- avant le hardware réel
- pendant les cultures actives
- après récolte pour l’analyse

Question centrale :

> Pourquoi ce run a mieux fonctionné qu’un autre ?

---

# Product Philosophy

Principe directeur :

```txt
Maximum insight
Minimum friction
```

Le produit doit :

- réduire la charge cognitive
- favoriser un usage quotidien rapide
- fonctionner confortablement sur mobile
- réduire le scroll inutile
- permettre des interactions rapides
- produire des données réellement utiles

Le produit doit être :

- calme
- rapide
- lisible
- structuré
- agréable quotidiennement
- exploitable dans le temps

Éviter volontairement :

```txt
ERP UI
admin dashboard feel
monitoring overload
deep navigation
dense workflows
visual clutter
```

---

# UX Vision — Compact Tent Workspace

La V2 introduisait :

```txt
Tent-centric workflow
```

La V2.1 ajoute :

```txt
Compact Tent Workspace
```

Objectif :

> ouvrir une tente, comprendre immédiatement la situation et agir rapidement sans friction.

Le Tent Workspace n’est plus :

```txt
render all sections
```

Il devient :

```txt
priority-based workspace
```

---

# Core UX Principles

La V2.1 introduit 6 principes structurants.

## 1. Fold‑First UX

Principe :

> les actions critiques doivent être accessibles sans scroll.

Le workflow principal doit être visible :

```txt
above the fold
```

Objectifs :

```txt
Understand < 3 sec
Act < 15 sec
No mandatory scroll
```

---

## 2. One Glance UX

Principe :

> l’état de la tente doit être compris en un regard.

L’utilisateur ne doit pas devoir :

```txt
scanner plusieurs cards
interpréter plusieurs métriques
naviguer pour comprendre
```

Préférer :

```txt
hero information
global state
soft interpretation
```

Exemple :

Bon :

```txt
Stable environment
24°C · RH58%
Lights ON
```

À éviter :

```txt
Temp 24.2
Humidity 58
Power 612
VPD 1.03
EC 1.4
```

---

## 3. Progressive Disclosure

Principe :

> montrer seulement ce qui est utile maintenant.

Le système doit :

```txt
show only what matters now
reveal details on demand
```

Exemples :

Observation :

```txt
Complete observation
```

→ ouvre une sheet.

Tasks :

```txt
2 tasks due
```

→ ouvre Tasks.

Environment :

```txt
See environment details
```

→ ouvre écran secondaire.

---

## 4. Tent‑Centric Workflow

Workflow principal :

```txt
Dashboard
→ Tent Workspace
→ Action
→ Save
```

Le run devient :

```txt
secondary workflow
```

Accessible via :

```txt
Run Details
```

---

## 5. Contextual UX

Tout ne doit pas être affiché en permanence.

L’interface doit s’adapter au contexte réel :

Exemples :

```txt
Observation missing
2 tasks due
Nothing actionable
```

L’utilisateur doit voir :

```txt
what matters today
```

et non :

```txt
everything always
```

---

## 6. Low Friction Mobile

Usage attendu :

```txt
phone in hand
inside tent
fast interaction
```

Priorités :

```txt
thumb friendly
few taps
fast feedback
large targets
```

---

# Tent Workspace Model

Le Tent Workspace devient :

> le cœur du produit.

Structure officielle :

```txt
Tent Header

Status Hero

Quick Actions

Today Panel (contextual)

Workspace Switcher
```

Important :

```txt
Do not render all sections
```

---

# Tiered Information Hierarchy

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

Ces éléments doivent fonctionner :

```txt
without scroll
```

---

### Tent Header

Contient :

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

---

### Status Hero

Responsabilité :

> comprendre l’état immédiatement.

Contenu MVP :

```txt
Temperature
Humidity
Light state
Global state
```

Exemple :

```txt
Stable environment
24°C · RH58%
Lights ON
```

Lecture cible :

```txt
< 3 sec
```

---

### Quick Actions

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

Temps cible :

```txt
< 15 sec
```

---

## Tier 2 — Contextual

Visible seulement si utile.

### Today Panel

Le Today Panel remplace le concept précédent d’Adaptive Context.

Objectif :

> montrer ce qui mérite attention aujourd’hui.

Exemples :

```txt
Observation missing
2 tasks due
Last watering: 09:12
```

Pattern :

```txt
compact contextual card
```

Si rien n’est utile :

```txt
Everything looks good
```

ou disparition du panneau.

---

### Daily Observation

La Daily Observation n’est plus une grosse section permanente.

Pattern :

```txt
Observation missing
[Complete check‑in]
```

Action :

```txt
open sheet
save
close
```

Objectif :

```txt
few seconds
```

---

## Tier 3 — On Demand Workspace

L’information secondaire est accessible :

```txt
on demand
```

via :

```txt
segmented pills switcher
```

Pattern officiel :

```txt
[Timeline] [Tasks] [Photos]
```

Objectifs :

```txt
reduce scroll
maintain context
progressive disclosure
```

---

### Timeline

Objectif :

```txt
review history quickly
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

---

### Photos

Règle MVP :

```txt
tent-local only
```

---

# Collapsed Hero Behavior

La V2.1 introduit :

```txt
collapsed sticky hero
```

Quand l’utilisateur scrolle :

Avant :

```txt
Tent 1
FLOWER · Day 42

24°C RH58 Lights ON
```

Après :

```txt
Tent 1 · D42 · 24°C · RH58%
```

Objectif :

```txt
reduce fatigue
maximize workspace
maintain awareness
```

---

# Secondary Experiences

Déplacées hors workflow principal :

```txt
Environment
Insights
Advanced monitoring
Analytics
```

Accès :

```txt
secondary CTA
sheet
dedicated screen
```

Principe :

> ne jamais ralentir le workflow quotidien.

---

# Domain Model ≠ UX Model

Principe conservé.

## Domain Model (backend)

```txt
User
└── GrowSpace
    └── Tent
        └── Run
            ├── JournalEntry
            ├── Observation
            ├── SensorSnapshot
            ├── Photo
            ├── Task
            └── Harvest
```

## UX Model (frontend)

```txt
Dashboard
→ Tent Workspace
```

Chargement implicite :

```txt
Tent
→ active run
→ quick status
→ contextual state
→ timeline
→ tasks
→ photos
```

Principe :

```txt
backend complexity
frontend simplicity
```

---

# Product Scope

## MVP IN

```txt
✓ auth
✓ dashboard
✓ compact tent workspace
✓ status hero
✓ quick actions
✓ today panel
✓ contextual observation
✓ timeline
✓ tasks
✓ photos
✓ fake monitoring provider
✓ quick status
✓ settings
```

## MVP OUT

```txt
✗ automation engine
✗ predictive analytics
✗ dense monitoring dashboard
✗ recommendation engine
✗ irrigation automation
✗ global task center
✗ global photo gallery
✗ advanced insights
```

---

# Success Criteria

Le produit est réussi si un grower peut :

```txt
ouvrir une tente
→ comprendre immédiatement la situation
→ journaliser une action en quelques secondes
→ continuer sa journée sans friction
→ comprendre plus tard pourquoi un run a fonctionné
```

Temps cibles :

```txt
Understand < 3 sec
Action < 15 sec
No mandatory scroll
```

---

# Guiding Principle

Toujours privilégier :

```txt
Maximum insight
Minimum friction
```

Si une feature :

```txt
ajoute du scroll
augmente les clics
ralentit le workflow
augmente la charge cognitive
```

alors :

> elle doit être simplifiée, déplacée ou supprimée.

---

## Status

Ce document sert de **source de vérité produit officielle V2.1** et doit guider les décisions UX, architecture et roadmap futures.

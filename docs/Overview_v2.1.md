# Overview v2.1 — Grow App

## Purpose

Ce document sert de **source de vérité produit officielle** du projet.

Objectifs :

- aligner vision produit, UX et architecture
- clarifier les principes structurants du système
- stabiliser les décisions fondamentales avant implémentation
- guider les documents fonctionnels et techniques
- réduire les incohérences entre UX, backend et roadmap

Cette version V2.1 introduit une évolution majeure :

> le passage d’un écran tente “render-all” à un **Compact Tent Workspace** mobile-first.

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

Le système doit :

- réduire la charge cognitive
- permettre une saisie ultra rapide
- favoriser un usage quotidien
- rester confortable sur mobile
- produire des données utiles

Le produit doit être :

- calme
- rapide
- lisible
- structuré
- agréable quotidiennement
- exploitable dans le temps

Éviter volontairement :

- interfaces type ERP
- surcharge visuelle
- navigation profonde
- dashboards anxiogènes
- workflows lents

---

# UX Vision — Compact Tent Workspace

La V2 introduisait :

```txt
Tent-centric
```

La V2.1 ajoute :

```txt
Compact Tent Workspace
```

Objectif :

> ouvrir une tente et pouvoir comprendre + agir sans scroll inconfortable.

Le Tent Working Screen n’est plus :

```txt
render all sections
```

Il devient :

```txt
priority-based workspace
```

---

# Fold‑First Philosophy

Principe majeur V2.1 :

> les actions quotidiennes critiques doivent être accessibles sans scroll.

Objectifs UX :

```txt
Understand in < 3 sec
Act in < 15 sec
0-scroll primary workflow
```

Workflow cible :

```txt
Open tent
→ Understand
→ Act
→ Continue day
```

---

# Tent Workspace Model

## Tier 1 — Always Visible

Toujours visibles :

```txt
Tent Header
Status Hero
Quick Actions
```

Ces éléments constituent le cœur quotidien.

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

### Status Hero

Responsabilité :

> comprendre immédiatement l’état.

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
RH 58%
Lights ON
Stable environment
```

Temps cible :

```txt
< 3 sec
```

### Quick Actions

MVP strict :

```txt
+ Watering
+ Feeding
+ Note
+ Issue
```

Règle :

```txt
one tap access
thumb friendly
```

---

## Tier 2 — Contextual / Adaptive

Éléments visibles seulement si utiles.

### Today Summary

Bloc adaptatif.

Exemples :

```txt
2 tasks due
Observation missing
Last watering 09:12
```

Le bloc peut disparaître si :

```txt
No pending task
Observation completed
Nothing actionable
```

### Daily Observation

Ne doit plus être affichée comme un gros formulaire.

Pattern :

```txt
Missing daily observation
[Complete check‑in]
```

Ouvre :

```txt
bottom sheet / modal
```

Objectif :

```txt
few seconds
```

---

## Tier 3 — On‑Demand Workspace

Accessible depuis un switch local.

Pattern :

```txt
Timeline | Tasks | Photos
```

L’utilisateur reste dans :

```txt
Tent Workspace
```

sans navigation profonde.

### Timeline

Historique journalier :

```txt
Today
08:42 Watering
14:22 Note
```

### Tasks

Tent‑local only.

### Photos

Suivi visuel croissance.

---

# Secondary Experiences

Déplacées hors workflow principal :

```txt
Environment
Insights
Advanced monitoring
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
            ├── Task
            ├── SensorSnapshot
            ├── Photo
            └── Harvest
```

## UX Model (frontend)

```txt
Dashboard
→ Tent Workspace
```

Le système charge implicitement :

```txt
Tent
→ active run
→ quick status
→ timeline
→ tasks
→ photos
```

---

# Navigation Philosophy

Toujours optimiser :

```txt
screen
→ action
```

La V2.1 autorise :

```txt
screen
→ local context switch
```

Exemple :

```txt
Timeline | Tasks | Photos
```

Mais éviter :

```txt
screen
→ screen
→ sub screen
→ modal
```

---

# Product Scope — MVP

## MVP IN

```txt
✓ auth
✓ dashboard
✓ tent workspace
✓ status hero
✓ quick actions
✓ contextual observation
✓ timeline
✓ tasks
✓ photos
✓ fake monitoring provider
✓ quick monitoring
✓ settings
```

## MVP OUT

```txt
✗ automation engine
✗ predictive analytics
✗ dense monitoring dashboard
✗ recommendation engine
✗ irrigation automation
✗ multi-user collaboration
✗ global task center
✗ global photo gallery
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
Primary workflow with no mandatory scroll
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
complexifie le workflow quotidien
ralentit l’usage mobile
```

alors :

> elle doit être simplifiée, déplacée ou supprimée.

---

## Status

Ce document sert de **source de vérité produit officielle V2.1** et doit guider les décisions UX, architecture et roadmap futures.

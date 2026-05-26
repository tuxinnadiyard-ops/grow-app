# Overview v2 — Grow App

## Purpose

Ce document sert de **source de vérité produit officielle** du projet.

Objectifs :

- aligner vision produit, UX et architecture
- clarifier les principes structurants du système
- stabiliser les décisions fondamentales avant implémentation
- guider les documents fonctionnels et techniques
- éviter les incohérences entre UX, backend et roadmap

Ce document doit rester cohérent avec :

- Charte Graphique Grow App v2
- Screens & Navigation Strategy v2
- Information Architecture & Schema v3
- Use Cases & User Flows v2
- Product Roadmap & Backlog v2

---

# Product Vision

Grow App est un :

> journal horticole indoor mobile-first, tent-centric et orienté post-analyse.

L’application doit permettre :

> de piloter, documenter et comprendre une culture indoor de manière simple, rapide et exploitable.

Le système doit rester utile :

- avant le hardware réel
- pendant les cultures actives
- après récolte pour l’analyse

Le produit n’est pas seulement un journal.

L’objectif est de répondre à une question centrale :

> Pourquoi ce run a mieux fonctionné qu’un autre ?

---

# Product Philosophy

Grow App suit un principe directeur :

```txt
Maximum insight
Minimum friction
```

Le système doit :

- réduire la charge cognitive
- permettre une saisie ultra rapide
- favoriser un usage quotidien
- rester confortable sur mobile
- produire des données réellement utiles

Le produit doit être :

- calme
- rapide
- lisible
- structuré
- agréable à utiliser quotidiennement
- exploitable dans le temps

Éviter volontairement :

- interfaces type ERP
- workflows profonds
- surcharge visuelle
- complexité gratuite
- gamification excessive

---

# UX Vision — Tent-Centric Product

## Changement majeur V2

La V1 du projet suivait implicitement un modèle métier :

```txt
GrowSpace
→ Tent
→ Run
→ Journal
```

Ce modèle reste correct côté backend.

Mais il crée trop de friction pour l’usage réel.

Dans la pratique, un grower pense :

```txt
Je vais dans Tent 1
→ je regarde l’état
→ j’ajoute une action
→ je continue ma journée
```

et non :

```txt
Je vais ouvrir un run
→ ouvrir un journal
→ créer une entrée
```

La V2 adopte donc un modèle :

> Tent-centric

La tente devient :

> le workspace principal du produit

---

# UX Model

La navigation produit devient :

```txt
Dashboard
├── Tent 1
├── Tent 2
├── Add Tent
└── Settings
```

L’écran principal d’une tente devient :

```txt
Tent Working Screen
├── Quick Status
├── Quick Actions
├── Daily Observation
├── Journal Timeline
├── Tasks
└── Photos
```

Principe :

> ouvrir une tente doit suffire pour travailler

Le workflow quotidien doit nécessiter :

```txt
≤ 2 interactions
```

---

# Working Screen Philosophy

Le **Tent Working Screen** devient le cœur du produit.

Objectif :

> permettre l’usage quotidien avec un minimum de friction.

L’utilisateur doit pouvoir :

- comprendre immédiatement l’état
- journaliser rapidement
- effectuer ses actions quotidiennes
- reprendre son activité sans navigation inutile

Exemple de workflow :

```txt
Open Tent
→ See state
→ + Watering
→ Save
→ Continue day
```

Temps cible :

```txt
< 15 sec
```

Le journal n’est plus un écran séparé.

Le journal devient :

> un workflow intégré

---

# Domain Model ≠ UX Model

Principe structurant V2 :

> le modèle métier n’est pas le modèle UX

## Domain Model (backend)

Le backend reste structuré pour :

```txt
consistency
analytics
history
extensibility
```

Structure :

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

---

## UX Model (frontend)

Le frontend est structuré pour :

```txt
simplicity
speed
daily workflow
```

Structure UX :

```txt
Dashboard
→ Tent
→ Working Screen
```

Le système charge implicitement :

```txt
Tent
→ active run
→ latest snapshots
→ journal
→ tasks
→ photos
```

Le run devient secondaire.

Il reste nécessaire pour :

```txt
metadata
history
stage management
analytics
harvest
```

Principe :

> backend complexity, frontend simplicity

---

# GrowSpace Strategy

Le modèle métier conserve :

```txt
GrowSpace
```

Mais dans le MVP :

> GrowSpace est invisible côté UX

Décision :

```txt
1 hidden grow space
auto-created at registration
```

Exemple :

```txt
My Indoor Space
```

Pourquoi ?

Pour :

- réduire la complexité UX
- accélérer l’onboarding
- simplifier le MVP

Plus tard :

```txt
multi grow spaces UI
```

si nécessaire.

---

# Design Principles

## Mobile-First

Usage principal attendu :

```txt
Dans une tente
Téléphone à la main
Interaction rapide
```

Priorités :

- gros targets tactiles
- lecture immédiate
- formulaires courts
- one-thumb friendly
- faible friction

Desktop :

```txt
enhancement
```

et non priorité.

---

## Calm Dark

Direction visuelle :

> horticultural calm dark

Le système doit être :

- confortable le soir
- agréable dans un garage ou local horticole
- doux visuellement
- lisible rapidement

Éviter :

```txt
RGB / gaming UI
admin dashboards
visual overload
```

---

## Daily Workflow First

Toujours optimiser :

```txt
Open tent
→ Understand
→ Act
```

Avant :

- analytics avancées
- automatisations
- intelligence métier

Le cœur produit reste :

```txt
daily cultivation workflow
```

---

## Action-Oriented Design

Chaque écran doit favoriser :

```txt
See
→ Understand
→ Act
```

Éviter :

```txt
screen
→ sub screen
→ modal
→ action
```

Préférer :

```txt
screen
→ action
```

---

# Product Scope

## MVP IN

```txt
✓ auth
✓ sidebar navigation
✓ dashboard
✓ tents
✓ active run
✓ tent working screen
✓ quick status
✓ quick actions
✓ observation scoring
✓ journal timeline
✓ tasks (tent-local)
✓ photos (tent-local)
✓ fake monitoring provider
✓ temp/humidity snapshots
✓ settings
```

---

## MVP OUT

```txt
✗ automation engine
✗ predictive analytics
✗ recommendation engine
✗ advanced alerting
✗ irrigation automation
✗ multi-user collaboration
✗ multi grow spaces UI
```

---

# Technical Direction

Architecture recommandée :

```txt
Frontend → Next.js
UI → Tailwind CSS
ORM → Prisma
DB → PostgreSQL
Auth → Better Auth / NextAuth
Monitoring → Home Assistant
Devices → Zigbee
```

Principe :

> software first, hardware later

Le produit doit rester utile :

- avant installation physique
- avec données simulées
- avant intégration Home Assistant réelle

---

# Product Strategy

Le développement suit une logique incrémentale.

## Phase 1 — Digital Grow Journal

Objectif :

> remplacer un carnet papier

Inclut :

- dashboard
- tent workspace
- journal
- quick actions
- observation scoring
- photos
- tasks

---

## Phase 2 — Monitoring Ready

Objectif :

> préparer le branchement réel

Inclut :

- fake provider
- snapshots
- device mapping
- monitoring avancé

---

## Phase 3 — Home Assistant Connected

Objectif :

> brancher les tentes réelles

Inclut :

- Home Assistant sync
- entity mapping
- automatic snapshots
- auto journal events

---

## Phase 4 — Analytics & Post-Analysis

Objectif :

> comprendre les runs

Inclut :

- averages
- stability metrics
- cost estimation
- comparisons
- success patterns

---

# Success Criteria

Le produit est réussi si un grower peut :

```txt
ouvrir une tente
→ comprendre immédiatement la situation
→ journaliser une action en quelques secondes
→ suivre sa culture sans friction
→ comprendre plus tard pourquoi un run a fonctionné
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
ajoute des clics
complexifie l’usage
ralentit le workflow quotidien
```

alors :

> elle doit être simplifiée, déplacée ou supprimée.

---

## Status

Ce document sert de **source de vérité produit officielle V2** et doit guider toutes les décisions UX, architecture et roadmap futures.
# Screens & Navigation Strategy v2 — Grow App

## Purpose

Ce document définit les écrans, la navigation et les règles UX de l’application.

Objectifs :

- clarifier le scope produit
- définir une navigation cohérente
- éviter les écrans redondants
- guider le développement UI/UX
- servir de source de vérité navigationnelle

Ce document doit rester cohérent avec :

- Overview v2
- Charte Graphique Grow App v2
- Information Architecture & Schema v3
- Use Cases & User Flows v2
- Product Roadmap & Backlog v2

---

# Design Principles

L’application est :

- mobile-first
- tent-centric
- card-based
- action-oriented
- pensée pour usage quotidien
- optimisée pour faible friction

Principe UX :

> Maximum insight, minimum friction

L’objectif principal :

> réduire le nombre d’étapes nécessaires à une action quotidienne.

---

# Core UX Model

La V2 introduit un changement majeur :

> la tente devient le centre de l’expérience utilisateur

Avant :

```txt
Dashboard
→ GrowSpace
→ Tent
→ Run
→ Journal
```

Après :

```txt
Dashboard
→ Tent
→ Action
```

Le journal n’est plus un écran séparé.

Le journal devient :

> un workflow intégré

---

# Navigation Philosophy

Le produit suit une navigation :

```txt
Sidebar-driven
Tent-centric
```

Le système doit permettre :

```txt
Open app
→ Open tent
→ Understand situation
→ Act quickly
```

Navigation profonde à éviter.

Toujours viser :

```txt
≤ 2 interactions
```

pour les actions fréquentes.

---

# App Shell

La V2 standardise un layout :

```txt
AppShell
├── Sidebar / Drawer
└── Content Area
```

Objectif :

```txt
predictable navigation
minimal friction
```

---

# Desktop Navigation

Structure recommandée :

```txt
Sidebar
├── Dashboard
├── Tent 1
├── Tent 2
├── Add Tent
├── Settings
└── Login / Logout
```

Le contenu principal s’affiche à droite.

Pattern :

```txt
Sidebar + Content
```

Sidebar persistante.

---

# Mobile Navigation

Navigation recommandée :

```txt
Drawer navigation
```

Pattern :

```txt
☰ Menu
```

Contenu :

```txt
Dashboard
Tent 1
Tent 2
+ Add Tent
Settings
Login / Logout
```

Principe :

> navigation compacte, espace utile maximisé

Temps d’accès cible :

```txt
< 1 sec
```

---

# Navigation Rules

Toujours :

- accès rapide aux tentes
- retour simple
- actions fréquentes visibles
- navigation plate
- faible charge cognitive

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

---

# Screen Inventory

## 1. Authentication

### Login

Objectif :

connexion simple.

Contenu :

- email
- password
- login button

Actions :

```txt
login
```

Status :

```txt
MVP
```

---

### Register

Objectif :

création compte.

Contenu :

- email
- password
- confirm password

Status :

```txt
MVP
```

---

# 2. Dashboard

## Dashboard Overview

Objectif :

vue globale rapide.

L’utilisateur doit comprendre :

```txt
quel est l’état général
```

en quelques secondes.

Le dashboard est volontairement :

```txt
minimal
overview-first
```

---

## Dashboard Card

Contenu MVP par tente :

```txt
Tent 1
FLOWER · Day 42
24°C · RH 58%
Lights ON
```

Éviter surcharge.

Pas de :

```txt
dense analytics
too many metrics
power details
```

en MVP.

Actions :

```txt
Open tent
Start run
```

Status :

```txt
MVP
```

---

## Dashboard Rules

Toujours :

```txt
scanable in < 5 sec
```

Éviter :

- tableaux complexes
- graphiques
- analytics détaillées
- surcharge visuelle

Le dashboard doit rester :

```txt
overview only
```

---

# 3. Tent Working Screen

## Purpose

Le Tent Working Screen devient :

> le cœur du produit

Cet écran remplace fonctionnellement :

```txt
Tent screen
Run screen
Journal screen
```

dans le workflow quotidien.

Objectif :

```txt
Open tent
→ Understand
→ Act
```

---

## Tent Screen Layout

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

Ordre UX :

```txt
See state
→ Understand
→ Act
→ Review
```

---

## Tent Header

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

Status :

```txt
MVP
```

---

## Quick Status

Objectif :

comprendre immédiatement l’état.

Contenu MVP :

```txt
Temperature
Humidity
Light state
```

Exemple :

```txt
24°C
RH 58%
Lights ON
```

Lecture :

```txt
< 3 sec
```

Pas de monitoring dense.

Power :

```txt
later
```

---

## Quick Actions

Objectif :

journalisation ultra rapide.

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
```

Temps cible :

```txt
< 15 sec
```

Éviter :

```txt
too many buttons
```

---

## Daily Observation

Objectif :

check-in rapide quotidien.

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

Temps cible :

```txt
few seconds
```

Status :

```txt
MVP
```

---

## Journal Timeline

Objectif :

voir rapidement l’historique.

Contenu :

- événements chronologiques
- groupés par jour
- metadata structurée

Exemple :

```txt
08:42
Watering
2L
runoff pH 6.3
```

Types MVP :

```txt
WATERING
FEEDING
NOTE
ISSUE
```

Later :

```txt
PRUNING
TRAINING
HARVEST
DEFOLIATION
```

Règles :

```txt
chronological
grouped by day
card-based
mobile readable
```

Status :

```txt
MVP
```

---

## Tasks

Objectif :

support du workflow quotidien.

Dans le MVP :

```txt
tent-local only
```

Pas d’écran global.

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

Status :

```txt
MVP
```

---

## Photos

Objectif :

suivi visuel de croissance.

Dans le MVP :

```txt
tent-local only
```

Pas de galerie globale.

Actions :

```txt
Upload photo
Review growth
```

Status :

```txt
MVP
```

---

# 4. Run Details

## Purpose

Le run devient :

```txt
secondary workflow
```

Il ne doit plus dupliquer le Tent Working Screen.

---

## Run Detail Scope

Responsabilités :

```txt
Metadata
Stage management
History
Finish run
```

Contenu :

```txt
Strain
Breeder
Medium
Pot size
Nutrient line
Phenotype notes
Start date
End date
```

Actions :

```txt
Edit metadata
Change stage
Finish run
```

Ne contient PAS :

```txt
full journal
duplicated timeline
analytics dashboard
```

Status :

```txt
MVP
```

---

# 5. Environment

## Environment Screen

Objectif :

monitoring détaillé.

Contenu :

```txt
Temperature chart
Humidity chart
Power chart
```

Status :

```txt
Phase 2
```

Décision :

```txt
Not MVP
```

Le MVP expose seulement :

```txt
Quick Status
```

dans la tente.

---

## Device Mapping

Objectif :

associer Home Assistant.

Contenu :

```txt
Temperature → sensor.xxx
Humidity → sensor.xxx
Light → switch.xxx
Power → sensor.xxx
```

Status :

```txt
Phase 2
```

---

# 6. Settings

## Profile

Contenu :

```txt
Email
Password
```

Status :

```txt
MVP
```

---

## Home Assistant Settings

Contenu :

```txt
URL
Token
Connection status
```

Status :

```txt
Phase 2
```

---

# MVP Screen Set

Strict MVP :

```txt
Login
Register
Dashboard
Tent Working Screen
Run Details
Settings
```

---

# Recommended Build Order

```txt
1. App shell + sidebar
2. Tent working screen
3. Dashboard v2
4. Quick actions
5. Journal timeline
6. Daily observation
7. Tasks
8. Photos
9. Run details
10. Fake monitoring provider
11. Home Assistant sync
12. Environment dashboard
```

---

# Guiding Principle

Toujours privilégier :

```txt
Open tent
→ Understand
→ Act
```

Si une navigation ajoute :

```txt
clics
friction
complexité
```

alors :

> elle doit être simplifiée.

---

## Status

Ce document sert de **source de vérité officielle V2 des écrans, navigation et structure UX du projet**.
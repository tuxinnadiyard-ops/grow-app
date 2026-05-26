# Product Roadmap & Backlog v2 — Grow App

## Purpose

Ce document transforme la vision produit en :

> plan d’exécution concret

Objectifs :

- transformer la vision en backlog actionnable
- guider les sprints
- éviter le scope creep
- prioriser le MVP
- permettre une progression incrémentale
- garder un produit utilisable à chaque étape

Ce document doit rester cohérent avec :

- Overview v2
- Charte Graphique Grow App v2
- Screens & Navigation Strategy v2
- Information Architecture & Schema v3
- Use Cases & User Flows v2

---

# Product Vision

Objectif produit :

> construire un journal horticole indoor mobile-first, tent-centric, orienté post-analyse et intégrable Home Assistant.

Principe UX :

```txt
Maximum insight
Minimum friction
```

Toujours optimiser :

```txt
Open tent
→ Understand
→ Act
```

Le produit doit rester :

- rapide à utiliser
- agréable quotidiennement
- utilisable sans hardware réel
- extensible vers monitoring réel
- centré workflow quotidien

---

# Product Philosophy

La V2 introduit une priorité explicite :

> Daily workflow first

Toujours optimiser :

```txt
Open tent
→ Understand
→ Act
```

Avant :

```txt
analytics avancées
automatisations
intelligence métier
```

Le cœur produit reste :

```txt
daily cultivation workflow
```

---

# Scope Strategy

## MVP IN

```txt
✓ auth
✓ sidebar navigation
✓ dashboard overview
✓ tent working screen
✓ active run
✓ quick status
✓ quick actions
✓ daily observation
✓ journal timeline
✓ tasks (tent-local)
✓ photos (tent-local)
✓ fake monitoring provider
✓ snapshots temp/humidity
✓ settings
```

---

## MVP OUT

```txt
✗ automation engine
✗ predictive analytics
✗ recommendation engine
✗ advanced monitoring
✗ advanced alerting
✗ irrigation automation
✗ multi grow spaces UI
✗ global task center
✗ global photo gallery
✗ multi-user collaboration
```

---

# Definition of Done

Une feature est DONE uniquement si :

```txt
✓ Prisma model OK
✓ API route OK
✓ ownership validation OK
✓ loading state OK
✓ error state OK
✓ mobile-first UI OK
✓ responsive OK
✓ Calm Dark compliant
✓ manual testing OK
✓ usable in real workflow
```

Question obligatoire :

> Est-ce que cela améliore réellement le workflow quotidien ?

---

# Sprint Strategy

Cadence recommandée :

```txt
1 sprint = 2–5 jours
```

Règle :

```txt
Ship usable increments
```

Toujours livrer :

```txt
usable product
```

À la fin de chaque sprint :

```txt
app still coherent
```

---

# Sprint 0 — Foundation & App Shell

Goal :

> construire la base UX V2

Priority :

```txt
Critical
```

---

## EPIC — Calm Dark Foundation

### Story — Theme Tokens

Priority :

```txt
Critical
```

Tasks :

- color palette
- typography
- spacing tokens
- dark surfaces
- semantic colors

Acceptance criteria :

```txt
Calm Dark palette implemented
Reusable tokens available
```

---

### Story — Component System

Priority :

```txt
Critical
```

Components :

```txt
Button
Card
Input
Badge
Modal
Drawer
Select
Container
```

Acceptance :

```txt
Reusable
Responsive
Touch friendly
Consistent spacing
```

---

## EPIC — App Shell

### Story — Sidebar Navigation

Priority :

```txt
Critical
```

Goal :

Créer navigation tent-centric.

Desktop :

```txt
persistent sidebar
```

Mobile :

```txt
drawer navigation
```

Contenu MVP :

```txt
Dashboard
Tent list
Add Tent
Settings
Login / Logout
```

Acceptance :

```txt
Responsive
Fast navigation
Minimal friction
```

---

### Story — App Layout

Goal :

Créer structure UI stable.

Layout :

```txt
AppShell
├── Sidebar / Drawer
└── Content Area
```

Acceptance :

```txt
Sidebar + content layout
Responsive
Mobile-first
Predictable navigation
```

---

# Sprint 1 — Tent Working Screen

Goal :

> construire le cœur du produit

Priority :

```txt
Highest
```

Pourquoi ?

Le Tent Working Screen est :

```txt
daily workspace
```

---

## EPIC — Tent Workspace

### Story — Tent Header

Contenu :

```txt
Tent name
Run name
Stage
Day count
```

Actions :

```txt
Change stage
Run details
Finish run
```

Acceptance :

```txt
Readable instantly
```

---

### Story — Quick Status

Priority :

```txt
Critical
```

Contenu MVP :

```txt
Temperature
Humidity
Light state
```

Acceptance :

```txt
Understand state in < 3 sec
```

Pas de :

```txt
advanced monitoring
```

en MVP.

---

### Story — Quick Actions

Priority :

```txt
Critical
```

MVP strict :

```txt
+ Watering
+ Feeding
+ Note
+ Issue
```

Acceptance :

```txt
One tap logging
< 15 sec
```

---

### Story — Daily Observation

Priority :

```txt
Critical
```

Contenu :

```txt
Health score
Stress
Vigour
```

Acceptance :

```txt
Fast check-in
Few seconds
```

---

### Story — Journal Timeline

Priority :

```txt
Critical
```

Acceptance :

```txt
Chronological
Grouped by day
Card-based
Readable on mobile
```

---

### Story — Tasks Section

Priority :

```txt
MVP
```

Rules :

```txt
tent-local only
```

Acceptance :

```txt
Due today
Upcoming
Completed
```

---

### Story — Photos Section

Priority :

```txt
MVP
```

Rules :

```txt
tent-local only
```

Acceptance :

```txt
Upload
Review growth
```

---

# Sprint 2 — Dashboard v2

Goal :

> comprendre les tentes rapidement

Priority :

```txt
High
```

---

## EPIC — Dashboard

### Story — Tent Cards

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

Acceptance :

```txt
Scanable in < 5 sec
```

Éviter :

```txt
dense metrics
analytics overload
```

---

### Story — Dashboard Overview

Acceptance :

```txt
Responsive
Card-based
Overview-first
Mobile readable
```

---

# Sprint 3 — Run Management

Goal :

> gérer une culture sans complexité

---

## EPIC — Run Lifecycle

### Story — Start Run

Acceptance :

```txt
Create run
Attach to tent
Visible immediately
```

---

### Story — Change Stage

Acceptance :

```txt
VEG
FLOWER
DRY
CURE
```

---

### Story — Finish Run

Acceptance :

```txt
Harvest summary
Run archived
```

---

### Story — Run Details

Scope :

```txt
metadata
history
stage management
finish run
```

Must NOT include :

```txt
duplicated journal
duplicated timeline
analytics dashboard
```

---

# Sprint 4 — Fake Monitoring Provider

Goal :

> développer avant hardware réel

---

## EPIC — Mock Environment

### Story — Fake Sensor Provider

Acceptance :

```txt
Temperature simulation
Humidity simulation
Light state simulation
```

Payload example :

```json
{
  "temperature": 24.2,
  "humidity": 58,
  "lightOn": true
}
```

---

### Story — Snapshot History

Acceptance :

```txt
Generated every X min
Visible in tent
Visible in dashboard
```

---

### Story — Quick Status Integration

Acceptance :

```txt
Temperature visible
Humidity visible
Light state visible
```

---

# Sprint 5 — Home Assistant Ready

Goal :

> préparer connexion réel

---

## EPIC — Home Assistant Connector

### Story — Home Assistant Settings

Acceptance :

```txt
URL
Token
Connection status
Connection test
```

---

### Story — Device Mapping

Acceptance :

```txt
Temperature → sensor.x
Humidity → sensor.y
Light → switch.x
```

---

### Story — Automatic Snapshots

Acceptance :

```txt
Persisted
Every 5–10 min
Linked to run
```

---

### Story — Auto Journal Events

Acceptance :

```txt
Lights ON
Lights OFF
Photoperiod changed
```

---

# Sprint 6 — Monitoring & Environment

Goal :

> monitoring exploitable

Status :

```txt
Phase 2
```

---

## EPIC — Environment Dashboard

### Story — Environment Charts

Acceptance :

```txt
Temperature chart
Humidity chart
Light chart
```

---

### Story — Threshold Alerts

Acceptance :

```txt
Configurable
Visible in UI
```

---

# Sprint 7 — Analytics Foundation

Goal :

> première post-analyse utile

---

## EPIC — Run Analytics

### Story — Daily Averages

Acceptance :

```txt
Avg temp
Avg humidity
```

---

### Story — Cost Estimation

Acceptance :

```txt
Energy estimate
Cost estimate
```

---

### Story — Stability Metrics

Acceptance :

```txt
Stage duration
Out of range time
Environment stability
```

---

# Sprint 8+ — Advanced Features

Later :

```txt
Automation rules
Predictive analytics
Recommendation engine
Run comparison
Decision support
Multi grow spaces UI
Global task center
Global photo gallery
```

---

# Milestones

## Milestone 1 — Usable Grow Journal

Done when :

```txt
Tent working screen
Journal
Observation
Tasks
Photos
Dashboard
```

---

## Milestone 2 — Monitoring Ready

Done when :

```txt
Snapshots
Fake provider
Quick status
Dashboard metrics
```

---

## Milestone 3 — Home Assistant Connected

Done when :

```txt
Entity mapping
Sync
Automatic snapshots
Auto journal events
```

---

## Milestone 4 — Analytics Useful

Done when :

```txt
Averages
Cost
Stability metrics
Run comparison
```

---

# Recommended Development Order

```txt
1. Calm Dark foundation
2. App shell + sidebar
3. Tent working screen
4. Dashboard v2
5. Journal V1
6. Daily observation
7. Tasks
8. Photos
9. Run lifecycle
10. Fake monitoring provider
11. Home Assistant connector
12. Environment dashboard
13. Analytics
```

---

# Guiding Principle

Toujours privilégier :

```txt
Open tent
→ Understand
→ Act
```

Si une feature :

```txt
augmente la friction
ralentit l’usage
complexifie le quotidien
```

alors :

> elle doit être simplifiée, déplacée hors MVP ou supprimée.

---

## Status

Ce document sert de **source de vérité officielle V2 de la roadmap produit, backlog, sprints et ordre d’exécution du projet**.
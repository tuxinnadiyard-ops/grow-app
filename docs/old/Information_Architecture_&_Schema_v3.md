# Information Architecture & Schema v3 — Grow App

## Purpose

Ce document sert de **source de vérité architecturelle** du projet.

Objectifs :

- aligner produit, UX et modèle de données
- stabiliser Prisma avant ajout massif de features
- clarifier MVP vs phases ultérieures
- formaliser la séparation Domain Model / UX Model
- éviter les refactors coûteux

Ce document doit rester cohérent avec :

- Overview v2
- Charte Graphique Grow App v2
- Screens & Navigation Strategy v2
- Use Cases & User Flows v2
- Product Roadmap & Backlog v2

---

# Architecture Principles

Le système doit être :

- mobile-first
- tent-centric côté UX
- orienté journal horticole
- extensible
- multi-tentes
- compatible Home Assistant
- pensé pour post-analyse
- utile avant hardware réel

Principe :

> Maximum insight, minimum friction

Architecture générale :

```txt
Manual Input
+ Home Assistant
+ Derived Metrics
=
Post-analysis capable grow journal
```

---

# Foundational Principle

## Domain Model ≠ UX Model

Principe majeur V2 :

> le modèle métier n’est pas le modèle UX

Le backend est structuré pour :

```txt
consistency
analytics
history
extensibility
```

Le frontend est structuré pour :

```txt
simplicity
speed
daily workflow
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

Cette structure ne doit pas être influencée par les contraintes UX.

---

# GrowSpace Strategy

Le système conserve :

```txt
GrowSpace
```

mais dans le MVP :

> GrowSpace est invisible côté utilisateur.

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

- simplifier l’UX
- réduire le nombre d’écrans
- éviter friction onboarding
- préparer multi-grow-spaces plus tard

Plus tard :

```txt
multi grow spaces UI
```

---

# UX Model (Frontend Architecture)

La navigation produit devient :

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

L’utilisateur interagit rarement directement avec :

```txt
Run
```

Le run devient :

```txt
secondary workflow
```

---

# Entity Model

## User

Responsabilité :

gestion du compte utilisateur.

### MVP Fields

- id
- email
- password
- sessionToken
- createdAt

Relations :

```txt
User
└── GrowSpace[]
```

---

## GrowSpace

Responsabilité :

espace horticole.

Exemple :

```txt
Garage Indoor
```

### MVP Fields

- id
- name
- description (later)
- createdAt

Relations :

```txt
GrowSpace
└── Tent[]
```

### UX Rules

Dans le MVP :

```txt
hidden from UI
```

Pas d’écran :

```txt
Grow Space
```

---

## Tent

Responsabilité :

représente une tente physique.

La tente devient :

> pivot UX principal

### MVP Fields

- id
- name
- surfaceM2
- createdAt

### Phase 2+

- notes
- zoneName
- targetEnvironment

Relations :

```txt
Tent
├── Device[]
└── Run[]
```

---

### UX Responsibilities

La tente expose directement :

```txt
active run
quick status
quick actions
daily observation
journal
tasks
photos
```

---

## Run

Responsabilité :

une culture donnée.

### MVP Fields

- id
- strain
- breeder
- medium
- potSize
- nutrientLine
- phenotypeNotes
- stage
- startDate
- endDate
- isActive
- createdAt

Enum stage :

```txt
VEG
FLOWER
DRY
CURE
```

Relations :

```txt
Run
├── JournalEntry[]
├── Observation[]
├── SensorSnapshot[]
├── Photo[]
├── Task[]
├── Harvest?
└── Alert[]
```

---

### UX Rules

Le run devient :

```txt
secondary workflow
```

Accessible via :

```txt
Tent
→ Run Details
```

Responsabilités UX :

```txt
metadata
history
stage management
finish run
```

Le run ne doit PAS dupliquer :

```txt
journal
timeline
working screen
```

---

## JournalEntry

Responsabilité :

timeline structurée.

Source :

```txt
Manual
```

### MVP Types

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
DEFOLIATION
TRANSPLANT
LIGHT_CHANGE
HARVEST
```

### Fields

- id
- type
- note
- metadata (JSON)
- createdAt

### Example Metadata

WATERING :

```json
{
  "volume_ml": 2000,
  "runoff_ec": 1.6,
  "runoff_ph": 6.2
}
```

FEEDING :

```json
{
  "nutrient_product": "Biobizz Bloom",
  "dose_ml_l": 2,
  "ec": 1.5,
  "ph": 6.3
}
```

Relations :

```txt
JournalEntry
→ Run
```

### UX Rules

Toujours visible dans :

```txt
Tent Working Screen
```

---

## Observation

Responsabilité :

scoring quotidien subjectif.

Objectif :

```txt
daily check-in
```

### MVP Fields

- id
- vigour
- leafColor
- stressLevel
- growthSpeed
- healthScore
- stressDetected
- anomalyDetected
- note
- createdAt

Échelle :

```txt
1–5
```

Relations :

```txt
Observation
→ Run
```

### UX Rules

Visible directement dans :

```txt
Tent Working Screen
```

Pas caché dans un sous écran.

---

## SensorSnapshot

Responsabilité :

historique environnemental.

Source :

```txt
Home Assistant
```

Cadence recommandée :

```txt
5–10 min
```

### MVP Fields

- id
- timestamp
- temperature
- humidity
- lightOn

### Phase 2+

- power
- co2
- soilMoisture
- waterTemperature
- leafTemperature

Relations :

```txt
SensorSnapshot
→ Run
```

### UX Rules

Dans le MVP :

```txt
Quick Status only
```

Pas de dashboard monitoring complet.

---

## Device

Responsabilité :

mapping Home Assistant.

### MVP Fields

- id
- type
- entityId
- displayName
- enabled

Types :

```txt
TEMPERATURE
HUMIDITY
POWER
LIGHT
FAN
IRRIGATION
```

Relations :

```txt
Device
→ Tent
```

Status :

```txt
Phase 2
```

---

## Task

Responsabilité :

actions récurrentes.

### MVP Fields

- id
- title
- note
- dueDate
- completed
- recurrenceRule
- createdAt

Relations :

```txt
Task
→ Run
```

### UX Rules

Dans le MVP :

```txt
tent-local only
```

Pas de :

```txt
global task center
```

---

## Photo

Responsabilité :

suivi visuel.

### MVP Fields

- id
- url
- note
- createdAt

Relations :

```txt
Photo
→ Run
```

### UX Rules

Dans le MVP :

```txt
tent-local only
```

Pas de galerie globale.

---

## Harvest

Responsabilité :

résultat culture.

### Fields

- wetWeight
- dryWeight
- qualityScore
- note

Relations :

```txt
Harvest
→ Run
```

---

## Alert

Responsabilité :

événement anormal.

Types :

```txt
TEMP_HIGH
HUMIDITY_HIGH
POWER_ANOMALY
MISSED_TASK
```

### MVP Fields

- id
- type
- severity
- message
- createdAt
- acknowledged

Relations :

```txt
Alert
→ Run
```

Status :

```txt
Phase 3
```

---

# Screen → Data Mapping

## Dashboard

Affiche :

```txt
overview multi-tentes
```

Données :

```txt
Tent
Run(active)
SensorSnapshot(latest)
```

---

## Tent Working Screen

Affiche :

```txt
Quick Status
Quick Actions
Daily Observation
Journal Timeline
Tasks
Photos
```

Données :

```txt
Tent
Run(active)
JournalEntry
Observation
SensorSnapshot(latest)
Task
Photo
```

---

## Run Details

Affiche :

```txt
metadata
history
stage management
```

Données :

```txt
Run
Harvest
```

---

## Environment Screen

Affiche :

```txt
Temperature
Humidity
Power
Charts
```

Status :

```txt
Phase 2
```

Données :

```txt
SensorSnapshot
Device
```

---

# API Map

## MVP

```txt
/api/auth/login
/api/auth/register
/api/logout

/api/dashboard

/api/tents
/api/tents/[id]

/api/runs
/api/runs/stage

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
/api/home-assistant/devices
/api/snapshots
```

---

## Phase 3+

```txt
/api/alerts
/api/analytics
/api/run-comparison
```

---

# MVP vs Later

## MVP

```txt
✓ auth
✓ dashboard
✓ tents
✓ active run
✓ tent working screen
✓ quick actions
✓ observation scoring
✓ journal
✓ tasks (tent-local)
✓ photos (tent-local)
✓ snapshots
```

---

## Later

```txt
✗ multi grow spaces UI
✗ automation rules
✗ predictive analytics
✗ recommendation engine
✗ advanced monitoring
✗ global task center
✗ global photo gallery
```

---

# Backend Rules

Toujours :

- ownership validation
- scoped queries
- no cross-user access
- mobile-friendly payloads

Exemple :

```txt
Run
must belong to
Tent
must belong to
GrowSpace
must belong to
User
```

---

# Development Order

```txt
1. Calm Dark UI
2. App shell + sidebar
3. Tent working screen
4. Dashboard
5. Journal V1
6. Daily observation
7. Tasks
8. Photos
9. Fake monitoring provider
10. Home Assistant sync
11. Environment dashboard
12. Analytics
```

---

## Status

Ce document sert de **source de vérité officielle V3 de l’architecture métier, Prisma, API et relations du projet**.
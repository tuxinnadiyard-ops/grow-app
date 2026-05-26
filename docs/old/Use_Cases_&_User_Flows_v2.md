# Use Cases & User Flows v2 — Grow App

## Purpose

Ce document définit les principaux **use cases métier** et **user flows** du produit.

Objectifs :

- aligner produit, UX et architecture
- guider le backlog de développement
- prioriser le MVP
- clarifier les workflows utilisateur
- garantir une UX faible friction

Ce document doit rester cohérent avec :

- Overview v2
- Charte Graphique Grow App v2
- Screens & Navigation Strategy v2
- Information Architecture & Schema v3
- Product Roadmap & Backlog v2

---

# Product Vision

Grow App doit permettre :

> de piloter, documenter et comprendre une culture indoor de manière simple, rapide et exploitable.

Principe UX :

> Maximum insight, minimum friction

Contrainte forte :

```txt
mobile-first
daily usage
fast interactions
low cognitive load
```

L’usage principal attendu :

```txt
Open tent
→ Understand state
→ Act quickly
→ Continue day
```

---

# Actors

## Grower (Primary Actor)

Utilisateur principal.

Objectifs :

- suivre ses cultures
- documenter ses actions
- monitorer l’environnement
- améliorer ses runs
- comprendre ses résultats

---

# UX Philosophy

La V2 introduit une philosophie :

> Tent-centric workflow

Avant :

```txt
Dashboard
→ Tent
→ Run
→ Journal
```

Après :

```txt
Dashboard
→ Tent
→ Quick Action
→ Save
```

Le run devient secondaire.

Le workflow quotidien devient prioritaire.

---

# Use Case Categories

```txt
1. Setup & Onboarding
2. Tent Management
3. Run Management
4. Daily Cultivation Workflow
5. Monitoring & Environment
6. Tasks & Reminders
7. Photos & Visual Tracking
8. Analytics & Post-analysis
9. Settings & Integrations
```

---

# 1. Setup & Onboarding

## UC-001 — Register Account

Priority :

```txt
MVP
```

Goal :

Créer un compte.

Flow :

```txt
Register
→ email
→ password
→ account created
→ hidden grow space created
→ dashboard
```

System behavior :

```txt
Default GrowSpace auto-created
```

Exemple :

```txt
My Indoor Space
```

Success criteria :

```txt
User authenticated
```

---

## UC-002 — Login

Priority :

```txt
MVP
```

Goal :

Se connecter.

Flow :

```txt
Login
→ email
→ password
→ dashboard
```

---

# 2. Tent Management

## UC-003 — View Dashboard

Priority :

```txt
MVP
```

Goal :

Voir rapidement l’état général.

Flow :

```txt
Open app
→ Dashboard
→ Tent overview
```

Résultat attendu :

```txt
understand all tents in < 5 sec
```

---

## UC-004 — Open Tent

Priority :

```txt
MVP
```

Goal :

Accéder au workspace quotidien.

Flow :

```txt
Dashboard
→ Tent
```

Résultat :

```txt
Tent Working Screen visible immediately
```

---

## UC-005 — Create Tent

Priority :

```txt
MVP
```

Goal :

Créer une tente.

Flow :

```txt
Sidebar
→ Add Tent
→ name
→ surface
→ save
```

Success :

```txt
Tent visible in sidebar
```

---

# 3. Run Management

## UC-006 — Start Run

Priority :

```txt
MVP
```

Goal :

Créer une culture active.

Flow :

```txt
Tent
→ Start Run
→ strain
→ save
```

Résultat :

```txt
Run active visible in Tent Working Screen
```

---

## UC-007 — Change Stage

Priority :

```txt
MVP
```

Goal :

Passer :

```txt
VEG → FLOWER → DRY → CURE
```

Flow :

```txt
Tent
→ Change Stage
→ Save
```

Success :

```txt
Stage immediately visible
```

---

## UC-008 — Finish Run

Priority :

```txt
MVP
```

Goal :

Clôturer une culture.

Flow :

```txt
Tent
→ Run Details
→ Finish Run
→ Harvest summary
→ Save
```

Résultat :

```txt
Run archived
```

---

## UC-009 — View Historical Runs

Priority :

```txt
MVP
```

Goal :

Consulter historique culture.

Flow :

```txt
Tent
→ Run Details
→ Run History
→ Open run
```

---

# 4. Daily Cultivation Workflow

## UC-010 — Quick Watering Log

Priority :

```txt
MVP
```

Goal :

Journaliser un arrosage en :

```txt
< 15 sec
```

Flow :

```txt
Tent
→ + Watering
→ volume
→ Save
```

Metadata :

```txt
volume_ml
runoff_ec
runoff_ph
```

---

## UC-011 — Feeding Log

Priority :

```txt
MVP
```

Goal :

Tracer une fertilisation.

Flow :

```txt
Tent
→ + Feeding
→ nutrient
→ dose
→ Save
```

---

## UC-012 — Quick Note

Priority :

```txt
MVP
```

Goal :

Ajouter une observation libre.

Flow :

```txt
Tent
→ + Note
→ text
→ Save
```

---

## UC-013 — Report Issue

Priority :

```txt
MVP
```

Goal :

Déclarer un problème culture.

Flow :

```txt
Tent
→ + Issue
→ severity
→ note
→ Save
```

Exemple :

```txt
Leaf yellowing
```

---

## UC-014 — Daily Observation Scoring

Priority :

```txt
MVP
```

Goal :

Faire un check-in rapide.

Flow :

```txt
Tent
→ Daily Observation
→ sliders
→ Save
```

Contenu :

```txt
Health score
Stress
Vigour
```

Temps cible :

```txt
few seconds
```

---

# 5. Monitoring & Environment

## UC-015 — View Tent Status

Priority :

```txt
MVP
```

Goal :

Comprendre immédiatement la situation.

Flow :

```txt
Open Tent
→ Quick Status visible
```

Métriques MVP :

```txt
Temperature
Humidity
Light state
```

Temps cible :

```txt
< 3 sec
```

---

## UC-016 — View Environment Details

Priority :

```txt
Phase 2
```

Goal :

Voir monitoring détaillé.

Flow :

```txt
Tent
→ Environment
→ Charts
```

Contenu :

```txt
Temperature chart
Humidity chart
Power chart
```

---

## UC-017 — Receive Alert

Priority :

```txt
Phase 3
```

Goal :

Être averti d’une anomalie.

Exemple :

```txt
Humidity too high
```

---

# 6. Tasks & Reminders

## UC-018 — Create Task

Priority :

```txt
MVP
```

Goal :

Créer tâche culture.

Flow :

```txt
Tent
→ Tasks
→ Add task
→ recurrence
→ save
```

Règle MVP :

```txt
tent-local only
```

---

## UC-019 — Complete Task

Priority :

```txt
MVP
```

Goal :

Marquer tâche faite.

Flow :

```txt
Tent
→ Task
→ Complete
```

---

## UC-020 — Snooze Task

Priority :

```txt
Later
```

Goal :

Reporter tâche.

---

# 7. Photos & Visual Tracking

## UC-021 — Add Photo

Priority :

```txt
MVP
```

Goal :

Suivi visuel croissance.

Flow :

```txt
Tent
→ Photos
→ Upload
→ Save
```

Règle MVP :

```txt
tent-local only
```

---

## UC-022 — Review Growth

Priority :

```txt
MVP
```

Goal :

Consulter évolution.

Flow :

```txt
Tent
→ Photos
→ Review
```

---

## UC-023 — Compare Growth

Priority :

```txt
Phase 2
```

Goal :

Comparer jours différents.

Flow :

```txt
Photos
→ Compare Days
```

---

# 8. Home Assistant Integration

## UC-024 — Connect Home Assistant

Priority :

```txt
Phase 2
```

Goal :

Connecter Home Assistant.

Flow :

```txt
Settings
→ URL
→ Token
→ Connect
```

---

## UC-025 — Map Devices

Priority :

```txt
Phase 2
```

Goal :

Associer entités.

Flow :

```txt
Settings
→ Device Mapping
→ Save
```

Exemple :

```txt
Temperature → sensor.xxx
Humidity → sensor.xxx
Light → switch.xxx
```

---

## UC-026 — Automatic Snapshots

Priority :

```txt
Phase 2
```

Goal :

Historiser automatiquement.

Trigger :

```txt
every 5–10 min
```

---

## UC-027 — Auto Journal Events

Priority :

```txt
Phase 2
```

Goal :

Créer événements automatiques.

Exemples :

```txt
Lights ON
Lights OFF
Photoperiod changed
```

---

# 9. Analytics & Post-Analysis

## UC-028 — Compare Runs

Priority :

```txt
Phase 3
```

Goal :

Comparer deux runs.

Flow :

```txt
Analytics
→ Compare run A/B
```

---

## UC-029 — Analyze Costs

Priority :

```txt
Phase 3
```

Goal :

Calcul coût énergétique.

---

## UC-030 — Identify Success Patterns

Priority :

```txt
Phase 4
```

Goal :

Trouver corrélations.

Exemple :

```txt
Successful runs
→ lower humidity
→ stable temperature
```

---

# MVP Use Cases

Strict MVP :

```txt
UC-001 → UC-022
except Phase 2+
```

---

# Core Daily Workflow

Le workflow principal devient :

```txt
Open app
→ Open tent
→ Understand state
→ Add action
→ Continue day
```

Exemple :

```txt
Dashboard
→ Tent 1
→ + Watering
→ Save
```

Temps cible :

```txt
< 15 sec
```

---

# Recommended Implementation Order

```txt
1. Auth
2. Sidebar
3. Tent working screen
4. Dashboard
5. Quick actions
6. Journal
7. Daily observation
8. Tasks
9. Photos
10. Fake provider
11. Home Assistant connector
```

---

# Guiding Principle

Toujours privilégier :

```txt
Open tent
→ Understand
→ Act
```

Si un workflow ajoute :

```txt
clics
friction
complexité
```

alors :

> il doit être simplifié.

---

## Status

Ce document sert de **source de vérité officielle V2 des use cases métier, workflows et parcours utilisateur** du projet.
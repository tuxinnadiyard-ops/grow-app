# Use Cases & User Flows v2.1 — Grow App

## Purpose

Ce document définit les principaux use cases métier et workflows utilisateur.

Objectifs :

- réduire la friction quotidienne
- formaliser le Compact Tent Workspace
- aligner UX et produit
- garantir un workflow rapide mobile-first

Cette version introduit :

> 0-scroll primary workflow

---

# Product Vision

Grow App doit permettre :

> de piloter, documenter et comprendre une culture indoor de manière simple, rapide et exploitable.

Principe UX :

```txt
Maximum insight
Minimum friction
```

Workflow principal :

```txt
Open tent
→ Understand
→ Act
→ Continue day
```

---

# UX Philosophy

Le modèle V2.1 devient :

```txt
Dashboard
→ Tent Workspace
→ Quick Action
→ Save
```

Le workflow quotidien devient prioritaire.

Objectifs UX :

```txt
Understand < 3 sec
Action < 15 sec
Low cognitive load
No mandatory scroll
```

---

# Use Case Categories

```txt
1. Setup & Onboarding
2. Tent Management
3. Run Management
4. Daily Cultivation Workflow
5. Tasks & Reminders
6. Photos & Tracking
7. Monitoring
8. Settings & Integrations
```

---

# 1. Setup & Onboarding

## UC‑001 — Register Account

Goal :

```txt
Create account
```

Flow :

```txt
Register
→ email
→ password
→ account created
→ hidden grow space created
→ dashboard
```

Success :

```txt
Authenticated user
```

---

## UC‑002 — Login

Flow :

```txt
Login
→ dashboard
```

---

# 2. Tent Management

## UC‑003 — View Dashboard

Goal :

```txt
understand all tents in < 5 sec
```

Flow :

```txt
Open app
→ Dashboard
```

Result :

```txt
Overview of tents
```

---

## UC‑004 — Open Tent Workspace

Goal :

```txt
Access daily workspace
```

Flow :

```txt
Dashboard
→ Tent
```

Result :

```txt
Understand immediately
```

Success criteria :

```txt
No mandatory scroll
```

---

## UC‑005 — Create Tent

Flow :

```txt
Sidebar
→ Add Tent
→ save
```

Success :

```txt
Tent visible immediately
```

---

# 3. Run Management

## UC‑006 — Start Run

Flow :

```txt
Tent
→ Start run
→ strain
→ save
```

Success :

```txt
Active run visible immediately
```

---

## UC‑007 — Change Stage

Flow :

```txt
Tent
→ Change stage
→ Save
```

Stages :

```txt
VEG
FLOWER
DRY
CURE
```

---

## UC‑008 — Finish Run

Flow :

```txt
Tent
→ Run details
→ Finish run
→ Harvest summary
```

Result :

```txt
Run archived
```

---

# 4. Daily Cultivation Workflow

## Core Daily Workflow

Workflow principal :

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

## UC‑009 — Quick Watering Log

Goal :

```txt
Log watering quickly
```

Flow :

```txt
Tent
→ Watering
→ Save
```

Target :

```txt
few seconds
```

---

## UC‑010 — Feeding Log

Flow :

```txt
Tent
→ Feeding
→ Save
```

---

## UC‑011 — Quick Note

Flow :

```txt
Tent
→ Note
→ Save
```

---

## UC‑012 — Report Issue

Flow :

```txt
Tent
→ Issue
→ Save
```

---

## UC‑013 — Daily Observation

Goal :

```txt
Quick daily check‑in
```

Pattern :

```txt
Observation missing
→ Complete check‑in
```

Flow :

```txt
Tent
→ CTA
→ sheet opens
→ save
```

Target :

```txt
few seconds
```

Important :

```txt
Not permanent
Not large form
```

---

## UC‑014 — View Tent Status

Goal :

```txt
Understand situation instantly
```

Flow :

```txt
Open Tent
→ Status Hero visible
```

Metrics MVP :

```txt
Temperature
Humidity
Light state
Global state
```

Target :

```txt
< 3 sec
```

---

# 5. Tasks & Reminders

## UC‑015 — View Tasks

Pattern :

```txt
Workspace Switcher
→ Tasks
```

Goal :

```txt
See due work quickly
```

---

## UC‑016 — Create Task

Flow :

```txt
Tasks
→ Add task
→ Save
```

Rule :

```txt
tent-local only
```

---

## UC‑017 — Complete Task

Flow :

```txt
Task
→ Complete
```

---

# 6. Photos & Tracking

## UC‑018 — View Photos

Pattern :

```txt
Workspace Switcher
→ Photos
```

---

## UC‑019 — Add Photo

Flow :

```txt
Photos
→ Upload
→ Save
```

Rule :

```txt
tent-local only
```

---

# 7. Monitoring

## UC‑020 — View Timeline

Pattern :

```txt
Workspace Switcher
→ Timeline
```

Goal :

```txt
Review history quickly
```

---

## UC‑021 — View Environment Details

Status :

```txt
Phase 2
```

Flow :

```txt
Tent
→ Environment
```

Important :

```txt
outside primary workflow
```

---

# 8. Settings & Integrations

## UC‑022 — Profile Settings

Content :

```txt
Email
Password
```

---

## UC‑023 — Home Assistant Connection

Phase 2 :

```txt
Settings
→ URL
→ Token
→ Connect
```

---

# MVP Use Cases

Strict MVP :

```txt
UC‑001 → UC‑023
except Phase 2+
```

---

# Success Criteria

Le workflow principal est réussi si :

```txt
Open app
→ Open tent
→ Understand
→ Act
→ Continue day
```

respecte :

```txt
Understand < 3 sec
Action < 15 sec
No mandatory scroll
```

---

# Guiding Principle

Toujours privilégier :

```txt
Open tent
→ Understand
→ Act
```

Si un workflow :

```txt
ajoute du scroll
ajoute des clics
ralentit l’action
```

alors :

> il doit être simplifié ou déplacé hors workflow principal.

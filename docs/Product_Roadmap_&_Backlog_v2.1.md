# Product Roadmap & Backlog v2.1 — Grow App

## Purpose

Ce document transforme la vision produit V2.1 en :

> plan d’exécution concret

Objectifs :

- transformer la vision en backlog actionnable
- réaligner les sprints avec le Compact Tent Workspace
- réduire la friction UX
- prioriser le workflow quotidien
- éviter le scope creep
- garder un produit utilisable à chaque étape

Principe UX :

```txt
Maximum insight
Minimum friction
```

Workflow prioritaire :

```txt
Open tent
→ Understand
→ Act
```

---

# Product Philosophy

La V2.1 introduit une priorité explicite :

```txt
Compact Tent Workspace
```

Objectifs UX :

```txt
Understand < 3 sec
Act < 15 sec
No mandatory scroll
Low cognitive load
```

Toujours optimiser :

```txt
daily cultivation workflow
```

Avant :

```txt
analytics avancées
monitoring dense
automations
```

---

# MVP Strategy

## MVP IN

```txt
✓ auth
✓ dashboard
✓ tent workspace
✓ status hero
✓ quick actions
✓ adaptive context
✓ contextual observation
✓ timeline
✓ tasks
✓ photos
✓ fake monitoring provider
✓ settings
```

## MVP OUT

```txt
✗ automation engine
✗ predictive analytics
✗ recommendation engine
✗ dense monitoring dashboard
✗ advanced alerting
✗ irrigation automation
✗ global task center
✗ global photo gallery
✗ multi-user collaboration
```

---

# Definition of Done

Une feature est DONE uniquement si :

```txt
✓ mobile-first UI OK
✓ calm dark compliant
✓ responsive OK
✓ ownership validation OK
✓ loading state OK
✓ error state OK
✓ usable in real workflow
✓ no unnecessary friction
```

Question obligatoire :

> améliore-t-elle réellement le workflow quotidien ?

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
coherent usable product
```

---

# Sprint 0 — Compact Workspace Foundation

Goal :

> réduire immédiatement la friction de la page tente

Priority :

```txt
Critical
```

---

## EPIC — Compact Tent Workspace

### Story — Tent Header

Contenu :

```txt
Tent name
Run name
Stage
Day count
```

Acceptance :

```txt
Readable instantly
```

---

### Story — Status Hero

Priority :

```txt
Critical
```

Goal :

```txt
Understand in < 3 sec
```

Contenu :

```txt
Temperature
Humidity
Light state
Global state
```

Acceptance :

```txt
Minimal density
Large values
Fast reading
```

---

### Story — Quick Actions

Priority :

```txt
Critical
```

Goal :

```txt
one tap logging
```

Actions :

```txt
Watering
Feeding
Note
Issue
```

Acceptance :

```txt
< 15 sec
44px+
Thumb friendly
```

---

### Story — Adaptive Context

Goal :

```txt
show only useful information
```

Exemples :

```txt
Observation missing
2 tasks due
Last watering
```

Acceptance :

```txt
Contextual only
Can disappear
No clutter
```

---

### Story — Contextual Observation

Goal :

```txt
daily check‑in in seconds
```

Pattern :

```txt
Observation missing
→ CTA
→ Sheet
→ Save
```

Acceptance :

```txt
Few seconds
Not permanent
Not large form
```

---

### Story — Workspace Switcher

Goal :

```txt
reduce scroll
```

Pattern :

```txt
Timeline | Tasks | Photos
```

Acceptance :

```txt
No render-all
Fast switching
Keep context
```

---

# Sprint 1 — Timeline / Tasks / Photos

Goal :

> stabiliser le workflow quotidien

---

## EPIC — Timeline

Acceptance :

```txt
Grouped by day
Readable mobile
Chronological
Card-based
```

---

## EPIC — Tasks

Rules :

```txt
tent-local only
```

Acceptance :

```txt
Due today
Upcoming
Complete task
```

---

## EPIC — Photos

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

# Sprint 2 — Dashboard v2.1

Goal :

> comprendre les tentes rapidement

Acceptance :

```txt
understand all tents in < 5 sec
```

Dashboard card :

```txt
Tent name
Stage
Day count
Temp
Humidity
Light state
```

Avoid :

```txt
dense metrics
charts
overload
```

---

# Sprint 3 — Run Lifecycle

Goal :

> gérer une culture sans friction

Stories :

```txt
Start run
Change stage
Finish run
Run details
```

Important :

```txt
secondary workflow only
```

Must NOT include :

```txt
duplicated workspace
duplicated timeline
```

---

# Sprint 4 — Fake Monitoring Provider

Goal :

> développer avant hardware réel

Acceptance :

```txt
Temperature simulation
Humidity simulation
Light simulation
```

Quick status visible immediately.

---

# Sprint 5 — Home Assistant Ready

Goal :

> préparer connexion réelle

Stories :

```txt
URL
Token
Connection test
Device mapping
Automatic snapshots
```

Important :

```txt
outside primary workflow
```

---

# Sprint 6 — Environment Monitoring

Status :

```txt
Phase 2
```

Goal :

```txt
detailed monitoring
```

Scope :

```txt
Temperature chart
Humidity chart
Power chart
```

Important :

```txt
secondary workflow
```

---

# Sprint 7 — Analytics Foundation

Goal :

```txt
understand why a run worked
```

Stories :

```txt
Daily averages
Cost estimation
Stability metrics
```

---

# Milestones

## Milestone 1 — Usable Tent Workspace

Done when :

```txt
Status Hero
Quick Actions
Adaptive Context
Timeline
Tasks
Photos
```

---

## Milestone 2 — Monitoring Ready

Done when :

```txt
Fake provider
Quick monitoring
Snapshots
```

---

## Milestone 3 — Home Assistant Connected

Done when :

```txt
Entity mapping
Automatic snapshots
Sync
```

---

## Milestone 4 — Useful Analytics

Done when :

```txt
Averages
Cost estimation
Stability metrics
```

---

# Recommended Development Order

```txt
1. Compact Tent Workspace
2. Status Hero
3. Quick Actions
4. Adaptive Context
5. Contextual Observation
6. Timeline
7. Tasks
8. Photos
9. Dashboard v2.1
10. Run lifecycle
11. Fake monitoring
12. Home Assistant
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
ajoute du scroll
ralentit l’action
augmente les clics
```

alors :

> elle doit être simplifiée, déplacée ou supprimée.

---

## Status

Ce document sert de source de vérité officielle V2.1 de la roadmap produit, backlog, sprints et ordre d’exécution.

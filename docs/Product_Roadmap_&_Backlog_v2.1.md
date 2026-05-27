# Product Roadmap & Backlog v2.1 — Grow App

## Purpose

Ce document définit la roadmap officielle du produit et l’ordre d’implémentation recommandé.

Objectifs :

- transformer la vision produit en plan d’exécution
- réduire les refactors coûteux
- préserver le Compact Tent Workspace
- aligner développement et UX
- éviter le feature creep

Cette version V2.1 introduit :

> UX-first execution

Principe :

```txt
Fix workflow first
Polish later
```

---

# Product Philosophy

Principe directeur :

```txt
Maximum insight
Minimum friction
```

Priorité absolue :

```txt
Open tent
→ Understand
→ Act
```

Avant toute feature :

Question obligatoire :

```txt
Does this reduce friction?
```

---

# Product Priorities

Ordre de priorité :

```txt
1. Workflow quality
2. Mobile usability
3. Information clarity
4. Data consistency
5. Feature breadth
```

Toujours privilégier :

```txt
better workflow
```

avant :

```txt
more features
```

---

# Delivery Philosophy

La V2.1 suit :

```txt
Architecture first
Workflow second
Polish third
Features fourth
```

Important :

```txt
No premature polish
```

On ne polit pas :

```txt
broken UX
wrong IA
bad workflow
```

---

# Phase 0 — Freeze UX (NOW)

Objectif :

> figer la direction produit V2.1 avant refactor.

Décisions figées :

```txt
Compact Tent Workspace
Today Panel
One Glance UX
Progressive Disclosure
Segmented Pills
Collapsed Sticky Hero
0-scroll primary workflow
```

Success :

```txt
No more product pivots
```

---

# Phase 1 — Workspace Refactor (Highest Priority)

## Goal

Transformer la page tente actuelle en :

```txt
Compact Tent Workspace
```

---

## Sprint UI‑01 — Structural Refactor

Objectif :

```txt
Fix information architecture
Reduce scroll immediately
```

Tasks :

```txt
[ ] Remove render-all layout
[ ] Build Tent Header
[ ] Build Status Hero
[ ] Refactor Quick Actions
[ ] Remove permanent Daily Observation
[ ] Add Today Panel
[ ] Add Segmented Pills switcher
[ ] Move Timeline to pills
[ ] Move Tasks to pills
[ ] Move Photos to pills
[ ] Remove Environment from primary workflow
[ ] Remove Insights from primary workflow
```

Success criteria :

```txt
Understand < 3 sec
No mandatory scroll
```

---

## Sprint UI‑02 — Interaction Model

Objectif :

```txt
Fix interaction quality
```

Tasks :

```txt
[ ] Daily Observation sheet
[ ] Watering flow
[ ] Feeding flow
[ ] Note flow
[ ] Issue flow
[ ] Empty states
[ ] Contextual Today Panel behavior
[ ] Segmented pills behavior
```

Success :

```txt
Action < 15 sec
```

---

## Sprint UI‑03 — Mobile Experience

Objectif :

```txt
Optimize mobile comfort
```

Tasks :

```txt
[ ] Collapsed Sticky Hero
[ ] Mobile spacing
[ ] Thumb-friendly targets
[ ] Scroll reduction
[ ] Responsive polish
```

Success :

```txt
Feels calm on mobile
```

---

# Phase 2 — Monitoring Foundation

Objectif :

```txt
Light monitoring
```

Scope :

```txt
Fake provider
Sensor snapshots
Quick status refresh
Basic environment data
```

Important :

```txt
No dense monitoring dashboard
```

Success :

```txt
One glance status
```

---

# Phase 3 — Home Assistant Integration

Objectif :

```txt
Connect real devices
```

Scope :

```txt
Home Assistant URL
Token
Connection test
Device mapping
Snapshot sync
```

Important :

```txt
Keep workflow simple
```

---

# Phase 4 — Growth Tracking

Objectif :

```txt
Improve cultivation memory
```

Scope :

```txt
Photos
Timeline improvements
Task refinements
Run completion
Harvest metadata
```

---

# Phase 5 — Environment Experience

Status :

```txt
Phase 2+
```

Scope :

```txt
Environment screen
Charts
Historical monitoring
Detailed metrics
```

Important :

```txt
Secondary workflow only
```

Never :

```txt
inside daily workflow
```

---

# Phase 6 — Insights & Analytics

Status :

```txt
Later
```

Goal :

```txt
understand why runs succeeded
```

Scope :

```txt
Run comparison
Correlations
Derived metrics
Insights
Performance summaries
```

Important :

```txt
after workflow maturity
```

---

# MVP Scope

## IN

```txt
✓ Auth
✓ Dashboard
✓ Compact Tent Workspace
✓ Status Hero
✓ Quick Actions
✓ Today Panel
✓ Observation Sheet
✓ Timeline
✓ Tasks
✓ Photos
✓ Fake monitoring
✓ Run details
✓ Settings
```

## OUT

```txt
✗ Dense monitoring
✗ AI recommendations
✗ Automation
✗ Predictive systems
✗ Advanced analytics
✗ Collaboration
✗ Global task center
✗ Global photo gallery
```

---

# Anti‑Patterns

Toujours éviter :

```txt
feature creep
render-all UI
premature polish
desktop-first thinking
dense monitoring
backend-shaped UX
scroll-first workflow
```

---

# Success Metrics

Le MVP est réussi si :

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

L’utilisateur doit ressentir :

```txt
calm
clarity
speed
control
confidence
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
augmente la friction
complexifie le workflow
ralentit le mobile
```

alors :

> elle doit être simplifiée, déplacée ou supprimée.

---

## Status

Ce document sert de **source de vérité officielle V2.1 de la roadmap produit et du backlog d’implémentation**.

---
title: "English Hub — React Native cross-platform app"
summary: "Built and maintained a React Native learning app shipping to Android and iOS from a single codebase. Redux for predictable state, REST integrations against the backend, and UI iteration driven by user-facing feedback in Agile sprints."
role: "junior react native developer"
year: 2022
stack:
  - "react native"
  - "redux"
  - "rest"
  - "javascript"
  - "android"
  - "ios"
metrics:
  - "engagement: Mar 2022 → Jul 2022"
  - "platforms: Android + iOS, single codebase"
  - "delivery: Agile sprints, iterative UI"
draft: false
---

## context

English Hub needed a mobile experience that worked consistently across Android and iOS without forking the codebase. The brief covered new feature delivery and ongoing maintenance against an existing REST backend.

## constraints

- One codebase, two platforms — feature parity without per-platform forks.
- Predictable state across screens and navigation flows.
- Responsive UI on a wide range of device sizes.
- Sprint-paced delivery alongside ongoing bug triage.

## architecture

React Native handled the rendering layer; Redux owned cross-screen state with explicit action / reducer flow so state mutations were traceable in dev tools. REST integration was wrapped in service modules that isolated network concerns from view code. UI work followed iterative review cycles — design adjustments shipped as small PRs rather than large rewrites.

## trade-offs

- **Redux for state vs. lighter alternatives.** Redux chosen for explicit state transitions and dev-tool traceability, accepting more boilerplate for clearer mental model on a junior-tier codebase.
- **Cross-platform abstraction vs. native polish.** React Native's shared codebase was the right call for the team size; platform-specific UX nuances were addressed where they mattered, not blanket-customized.

## outcome

- Stable cross-platform builds shipped from a unified codebase.
- UI iteration loop tightened through small PRs and direct sprint feedback.
- Foundation laid for ongoing feature delivery without per-platform divergence.

---
title: "TD (Chatblix) — Lead software developer"
summary: "Leading backend systems and full-stack delivery at TD (Chatblix). NestJS + TypeScript + PostgreSQL services built around Domain-Driven Design and Clean Architecture, shipped through Docker / GitHub Actions / AWS / GCP pipelines."
role: "lead software developer"
year: 2025
homepage: "https://chatblix.com"
stack:
  - "nestjs"
  - "typescript"
  - "postgresql"
  - "react"
  - "tailwindcss"
  - "gsap"
  - "docker"
  - "github actions"
  - "aws"
  - "gcp"
metrics:
  - "engagement: Jan 2025 → present"
  - "scope: backend services + frontend delivery"
  - "team: scrum, multi-disciplinary"
  - "delivery: zero-downtime CI/CD across AWS / GCP"
draft: false
---

## context

TD -- operating [Chatblix](https://chatblix.com) needed a lead engineer to anchor the backend platform and align the wider product team around predictable delivery. The role spans architecture decisions, sprint leadership, and hands-on implementation across backend, frontend, and DevOps.

## constraints

- Modular service boundaries that survive feature churn — no monolithic blast radius.
- Contract clarity at the API edge: explicit OpenAPI specs, versioned endpoints, and contract-first integration with consumers.
- Predictable deployments under business pressure — every change must be rollbackable, observable, and traceable.
- Junior team members ramping up; the architecture must be teachable, not just correct.

## architecture

Backend is structured as modular NestJS services backed by PostgreSQL, with bounded contexts derived from Domain-Driven Design. Each context owns its data, exposes a typed REST surface, and integrates through clearly named contracts rather than implicit shared state.

Clean Architecture separates domain, application, and infrastructure layers. Use cases sit in the application layer, depend on interfaces, and are exercised by both API controllers and async workers without leaking framework concerns into the domain.

Frontends are React + TailwindCSS, with GSAP for motion that needs to feel deliberate. UI state stays close to the components that own it; cross-cutting state is hoisted only when justified by usage, not anticipation.

DevOps runs on Docker images deployed via GitHub Actions to AWS and GCP. Pipelines enforce build → test → migration check → deploy, with environment promotion gated on automated checks. Zero-downtime is the default deployment posture.

## trade-offs

- **DDD scope vs. velocity.** Full DDD ceremony rejected for early-stage modules — used a pragmatic subset (aggregates and explicit boundaries) without forcing tactical patterns where they didn't earn their cost.
- **REST + OpenAPI over GraphQL.** Chosen for contract clarity, codegen ergonomics, and lower operational surface. GraphQL revisitable when consumer aggregation patterns demand it.
- **Mentorship as architecture investment.** Deliberate slow-down on review depth so the team's median PR quality improves over time — short-term velocity cost, long-term throughput gain.

## outcome

- Backend services follow a consistent module shape that lets new endpoints land with minimal architecture debate.
- API surface is fully described in OpenAPI; consumers integrate against generated clients rather than ad-hoc requests.
- Deployment cadence and confidence are stable; incidents are diagnosed against logs and traces rather than guessed at.
- Team operates in functioning Scrum rhythm — sprint goals tracked, retrospectives drive concrete process changes.

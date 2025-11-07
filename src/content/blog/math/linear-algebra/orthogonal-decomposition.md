---
categories:
- Math
- Linear Algebra 
createdAt: '2025-11-07'
description: $$
tags:
- Math
- Linear Algebra 
title: Orthogonal Decomposition 
---


## What's that?

Let $V$ be a subspace of $\R^d$. Then any vector $w \in \R^d$ can be uniquely decomposed as:

$$
w = w_{||} + w_{\perp}
$$

where

- $w_{||} \in V$
- $w_{\perp} \in V^\perp$
- $V^{\perp} = \{v \in \R^d : v^\intercal u = 0 \quad \forall u,\; u \in V\}$

## Proof

![clipboard.png](/orthogonal-decomposition/7fPC_766-clipboard.webp)

- Let $V = span\{x^{(i)}, \dots, x^{(N)}\}$

### 1. Define $w_{||}$ as an orthogonal projection

$$
w_{||} = proj_V(w)
$$

- $proj_V(w)$ is a unique vector that is closest to $w$ $(\min_{v \in V} ||w-v||)$

### 2. Define $w_\perp$

$$
w_\perp = w - w_{||}
$$

### 3. Show $w_\perp \perp V$

By the properties of orthogonal projection, $w_\perp$ is orthogonal to every vector in $V$.

$$
w_\perp^\intercal x^{(j)} = (w - w_{||})^\intercal x^{(j)} = 0
$$

### Express $w_{||}$ in terms of basis vector

Since $w_{||} \in V = span\{x^{(1)}, \dots, x^{(N)}\}$, by definition of span:

$$
w_{||} = \sum^N_{j = 1} \alpha^{(j)}x^{(j)}
$$

for some coefficient $\alpha^{(1)}, \dots \alpha^{(N)} \in \R$

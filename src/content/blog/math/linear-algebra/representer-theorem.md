---
categories:
- Machine Learning
createdAt: '2025-09-20'
description: 'The proof of representer theorem'
tags:
- Proof
- Machine Learning
- AI
title: 'Supplement: Representer Theorem'
---
Any optimal solution $w^*$ can be expressed as:

$$
w^* = \sum^N_{j = 1} \alpha^{(j)}x^{(j)}
$$

for some coefficients $\alpha^{(i)}, \dots, \alpha^{(N)} \in \R$

considering the regularized empirical risk minimization problem:

$$
\min_{w \in \R^d} \mathcal{J}(w) = \sum^N_{i = 1} L(y^{(i)}, w^\intercal x^{(i)}) + \lambda \mid\mid w\mid\mid^2
$$

where

- $L:$ a loss function
- $\{x^{(i)}, y^{(i)}\}_{i = 1}^{N}:$ the training examples
- $\lambda > 0:$ a regularization parameter
- $w \in \R^d:$ the weight vector

## Proof

### 1. Decompose w

Any vector $w \in \R^d$ can be uniquely decomposed into two orthogonal components:

$$
w = w_{||} + w_{\perp}
$$

where

- $w_{||} \in span\{x^{(i)}, \dots, x^{(N)}\}$ (parallel component)
- $w_{\perp} \perp span\{x^{(i)}, \dots, x^{(N)}\}$ (parallel component)

### 2. Rewrite $w_{||}$

$$
w_{||} = \sum^N_{j = 1} \alpha^{(j)}x^{(j)}
$$

for some coefficient $\alpha^{(1)}, \dots, \alpha^{(N)}$

> [!TIP]
>
> Full proof can be found in [Orthogonal Decomposition Theorem](/blog/math/linear-algebra/orthogonal-decomposition)

### 3. Analyze predictions on training data

$$
w^\intercal x^{(i)} = (w_{||} + w_{\perp})^\intercal x^{(i)}
$$

Given that $w_\perp\perp x^{(i)}$

$$
\begin{align*}
w^\intercal x^{(i)} &= w_{||}^\intercal x^{(i)} + w_\perp^\intercal x^{(i)} \\
                    &= w_{||}^\intercal x^{(i)}
\end{align*}
$$

### 4. Compare ERM functions

Given that $$w_{||} \perp w_{\perp}$$

$$
||w||^2 = ||w_{||} + w_\perp ||^2 = ||w_{||}||^2 + ||w_\perp||^2
$$

Then, plug them back to risk minimization functions

$$
\begin{align*}
&\mathcal{J}(w) = \sum^N_{i = 1} L(y^{(i)}, w_{||}^\intercal x^{(i)}) + \lambda||w_{||}||^2 + \lambda||w_{\perp}||^2\\
\\
&\mathcal{J}(w_{||}) = \sum^N_{i = 1} L(y^{(i)}, w_{||}^\intercal x^{(i)}) + \lambda||w_{||}||^2 \\
\\
&\because \lambda ||w_{\perp}||^2 \ge 0 \text{ and } \mathcal{J}(w) = \mathcal{J}(w_{||}) + \lambda ||w_{\perp} ||^2\\
\\
&\therefore \mathcal{J}(w) \ge \mathcal{J}(w_{||}) \\
\\
&\implies w^* = \sum^N_{j = 1} \alpha^{(j)}x^{(j)}
\end{align*}
$$

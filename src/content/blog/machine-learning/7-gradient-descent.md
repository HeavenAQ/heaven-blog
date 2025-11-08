---
categories:
- Machine Learning
- lectures
createdAt: '2025-10-17'
description: '- Function $f: \R^d \rightarrow \R $ is `convex` if $\forall x_1 \in
 \R^d, x_2 \R^d, 0 \le t \le 1$'
tags:
- Machine Learning
- Machine Learning
- lectures
- AI
title: 9. Gradient Descent
---
# 7. Gradient Descent

## Convex Function

![clipboard.png](/blog/7-gradient-descent/sGf6vjto-clipboard.webp)

- Function $f: \R^d \rightarrow \R $ is `convex` if $\forall x_1 \in \R^d, x_2 \R^d, 0 \le t \le 1$

$$
f(tx_1 + (1 - t)x_2) \le tf(x_1) + (1 - t)f(x_2)
$$

### Minimize a convex, continuous and differentiable function

![clipboard.png](/blog/7-gradient-descent/7dSLWPya-clipboard.webp)

## Taylor Expansion

![clipboard.png](/blog/7-gradient-descent/7uQJqecy-clipboard.webp)

$$
\ell(w + s) \approx \ell(w) + g(w)^\intercal s
$$

where

- $g(w) = \nabla \ell(w)$ is the gradient

$$
l(w + s) \approx \ell(w) + g(w)^\intercal s + \frac{1}{2} s^\intercal H(w)s
$$

where

- $H(w) = \nabla^2 \ell(w)$ is the Hessian of $\ell$

## Gradient Descent

- Use the first order approximation
- Assume that the function $\ell$ around $w$ is linear and behaves like $\ell(w) + g(w)^\intercal s$

1. Find a vector s that minimized $\ell$
 $$
 s = - \alpha g(w)
 $$

- for some small $\alpha$ as the `learning rate`

2. After one update

$$
\ell(w + (-\alpha g(w))) \approx \ell(w) - \underbrace{\alpha g(w)^\intercal g(w)}_{>0} < \ell(b)
$$

---

### Choosing the step

![clipboard.png](/blog/7-gradient-descent/O2ZFQopZ-clipboard.webp)

- A safe choice is to set $\alpha = \frac{c}{t}$
 - $c:$ some constant
 - $t:$ the number of updates taken
 - Guarantees that the gradient descent eventually become small enough to converge

---

### Types

#### $\bullet$ Batch Gradient

- use error over <mark>the entire training set</mark> $\mathcal D$
- Do until satisfied:

 $$
 \begin{align*}
 &\text{Compute the graident: } \nabla \ell_D(w) \\
 &\text{Update the vector of parameters: } w \leftarrow w - \alpha \nabla \ell_D(w)
 \end{align*}
 $$

#### $\bullet$ Stochastic Gradient

- use error over <mark>a single training example</mark> from $\mathcal D$
- Do until satisfied:

 $$
 \begin{align*}
 &\text{Choose (with replacement) a random training example} (x^{(i)}, y^{(i)}) \in \mathcal D \\
 &\text{Compute the graident just for them: } \nabla \ell_{(x^{(i)}, y^{(i)})}(w) \\
 &\text{Update the vector of parameters: } w \leftarrow w - \alpha \nabla \ell_{(x^{(i)}, y^{(i)})}(w)
 \end{align*}
 $$

> [!TIP]
>
> - Stochastic approximates Batch arbitrarily closely as $\alpha \rightarrow 0$
> - Stochastic can be much faster when $\mathcal D$ is very large
> - Interemediate approach: use error over subsets of $\mathcal D$
> - Gradient descent is **slow** when it is **close to minimum**

## Where to converge?

![clipboard.png](/blog/7-gradient-descent/IgC_xJE4-clipboard.webp)

## Newton's Method: Use $2^{nd}$ order approximation

$$
\ell (w + s) \approx \ell(w) + g(w)^\intercal s + \frac{1}{2} s^\intercal H(w)s
$$

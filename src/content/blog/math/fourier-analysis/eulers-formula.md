---
categories:
- Math
- Fourier Analysis
createdAt: '2025-09-06'
description: '---'
tags:
- Fourier Analysis
- Math
title: Euler's Formula
---

---
description: "Full derivation of Euler's Formula"
slug: euler-formula
public: true
---
# Euler's Formula



## Euler's Formula

$$
e^{ix} = \cos(x) + i\sin(x)
$$

where:

- $e$ is Euler’s number (\~2.718), the base of natural logarithms,
- $i$ is the imaginary unit ($i^2 = -1$),
- $x$ is a real number (often thought of as an angle in radians).

---

### Properties

1. **Bridge between algebra and geometry**

 - The exponential function $e^{ix}$ traces out points on the unit circle in the complex plane as $x$ changes.
 - This makes a direct link between exponential growth/decay and circular motion.

2. **Trigonometry becomes exponential**

 - With this formula, sine and cosine can be expressed in terms of exponentials:

 $$
 \cos(x) = \frac{e^{ix} + e^{-ix}}{2}, \quad \sin(x) = \frac{e^{ix} - e^{-ix}}{2i}
 $$

 - These are known as Euler’s identities.

---

### Euler’s Identity

By plugging in $x = \pi$ into Euler’s formula:

$$
e^{i\pi} + 1 = 0
$$

This equation connects five of the most fundamental constants in mathematics: $e, i, \pi, 1, 0$. Many mathematicians consider it the most beautiful equation ever written.

---

### Proof

- **Euler's Formula** can be proved with $e^x$, $sinx$, $cosx$, and **Maclaurin's Series**.

#### 1. $f(x) = e^x$

- First, check the recurrence relation of $e^x$'s derivatives when $x = 0$

$$
\begin{align*}
 &f^{(1)}(x) = f^{(2)}(x) = f^{(3)}(x) = \ldots = f^{(n)}(x) = e^x \\
 &f^{(1)}(0) = f^{(2)}(0) = f^{(3)}(0) = \ldots = f^{(n)}(0) = 1 \\
\end{align*}
$$

- Then, expand $e^x$ with Maclaurin' Series

$$
\begin{align*}
 \therefore e^x &= f(0) + \frac{f^{(1)}(0)}{1!}x + \frac{f^{(2)}(0)}{2!}x^2 + \ldots + \frac{f^{(n)}(0)}{n!}x^n + \ldots \\
 &= 1 + \frac{1}{1!}x + \frac{1}{2!}x^2 + \ldots + \frac{1}{n!}x^n + \ldots \\
 &= 1 + \frac{x}{1!} + \frac{x^2}{2!} + \ldots + \frac{x^n}{n!} + \ldots \\
\end{align*}
$$

#### 2. $f(x) = sin(x)$

- Now, check the recurrence relation of $sin(x)$'s derivatives when $x = 0$

$$
\begin{align*}
 &f^{(1)}(x) = cos(x) \quad f^{(2)}(x) = -sin(x) \\
 &f^{(3)}(x) = -cos(x) \quad f^{(4)}(x) = sin(x) \\
\end{align*}
$$

$$
\begin{align*}
 &f^{(1)}(0) = 1 \quad f^{(2)}(0) = 0 \\
 &f^{(3)}(0) = -1 \quad f^{(4)}(0) = 0 \\
\end{align*}
$$

- Then, expand $sin(x)$ with Maclaurin's Series as well

$$
\begin{align*}
 \therefore sin(x) &= f(0) + \frac{f^{(1)}(0)}{1!}x + \frac{f^{(2)}(0)}{2!}x^2 + \ldots + \frac{f^{(n)}(0)}{n!}x^n + \ldots \\
 &= 0 + \frac{1}{1!}x - \frac{1}{3!}x^3 + \ldots + (-1)^{(n -1)}\frac{1}{(2n - 1)!}x^{(2n - 1)} + \ldots \\
 &= \frac{x}{1!} + \frac{-x^3}{3!} + \ldots + \frac{(-1)^{(n - 1)}x^{(2n-1)}}{(2n-1)!} + \ldots \\
\end{align*}
$$

#### 3. $f(x) = cos(x)$

- Movign on, check the recurrence relation of $cos(x)$'s derivatives when $x = 0$

$$
\begin{align*}
 &f^{(1)}(x) = -sin(x) \quad f^{(2)}(x) = -cos(x) \\
 &f^{(3)}(x) = sin(x) \quad f^{(4)}(x) = cos(x) \\
\end{align*}
$$

$$
\begin{align*}
 &f^{(1)}(0) = 0 \quad f^{(2)}(0) = -1 \\
 &f^{(3)}(0) = 0 \quad f^{(4)}(0) = 1 \\
\end{align*}
$$

- Then, expand $cos(x)$ with Maclaurin's Series as well

$$
\begin{align*}
 \therefore cos(x) &= f(0) + \frac{f^{(1)}(0)}{1!}x + \frac{f^{(2)}(0)}{2!}x^2 + \ldots + \frac{f^{(n)}(0)}{n!}x^n + \ldots \\
 &= 1 - \frac{1}{2!}x^2 + \frac{1}{4!}x^4 + \ldots + (-1)^n\frac{1}{(2n)!}x^{2n} + \ldots \\
 &= \frac{x}{1!} + \frac{-x^3}{3!} + \ldots + \frac{(-1)^{n}x^{2n}}{(2n)!} + \ldots \\
\end{align*}
$$

#### 4. Bring everything together

$$
\begin{align*}
 \because e^x &= 1 + \frac{x}{1!} + \frac{x^2}{2!} + \ldots + \frac{x^n}{n!} + \ldots \\
 \therefore e^{i\theta} &= 1 + \frac{i\theta}{1!} + \frac{(i\theta)^2}{2!} + \ldots + \frac{(i\theta)^n}{n!} + \ldots \\
 e^{i\theta} &= 1 + \frac{i\theta}{1!} - \frac{\theta^2}{2!} - \frac{i\theta^3}{3!} + \frac{\theta^4}{4!} + \frac{i\theta^5}{5!} - \frac{\theta^6}{6!} - \frac{i\theta^7}{7!} + \ldots \\
 &= cos\theta + isin\theta
\end{align*}
$$

- Here we are, the Euler's Formula

$$
e^{i\theta}= cos\theta + isin\theta
$$

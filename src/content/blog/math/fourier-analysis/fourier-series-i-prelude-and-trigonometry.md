---
categories:
- Math
- Fourier Analysis
createdAt: '2025-09-05'
description: '- defined on $(-\pi, \pi]$'
tags:
- Fourier Analysis
- Math
title: 1. Fourier Series - Prelude and Trigonometry
---

## Fourier Series - Prelude

### $\bullet$ From Sinusoid ($sin(kx)$) to Square Wave

#### 1. Assume a function $y = f(x)$

- defined on $(-\pi, \pi]$
- discontinuous at $x = 0$

$$
y = f(x) =
\begin{cases}
 &-\frac{\pi}{4} &\quad (-\pi < x \le 0) \\
 &\frac{\pi}{4} &\quad (0 < x \le \pi)
\end{cases}
$$

![clipboard.png](/blog/fourier-series-i-prelude-and-trigonometry/qJAPEvkh-clipboard.webp)

#### 2. The Fourier Series of $sin(kx)$

$$
\begin{align*}
 & y = f(x) = \sum_{k = 1}^{\infty} b_k sin(kx) \\
 &\cdot where\ b_k =
 \begin{cases}
 &b_{2k} = 0 \\
 &b_{2k-1} = \frac{1}{2k - 1}
 \end{cases}
\end{align*}
$$

#### 3. Expand $y$

$$
\begin{align*}
 y = f(x) &= \sum_{k = 1}^{\infty} \frac{1}{2k - 1} sin(2k - 1)x \\
 &= sinx + \frac{1}{3} sin3x + \frac{1}{5}sin5x + \ldots
\end{align*}
$$

- The shapes of three sinusoids

![clipboard.png](/blog/fourier-series-i-prelude-and-trigonometry/dut_omYR-clipboard.webp)

- $sinx + \frac{1}{3}sin3x + \frac{1}{5}sin5x$

![clipboard.png](/blog/fourier-series-i-prelude-and-trigonometry/7xpF1lIT-clipboard.webp)

- $\sum_{k = 1}^{10000} \frac{1}{2k - 1} sin(2k - 1)x$

![clipboard.png](/blog/fourier-series-i-prelude-and-trigonometry/WiYuTE4l-clipboard.webp)

 > [!TIP]
 >
 > - As we accumulate more sinusoids, $f(x)$ approaches a square wave
 > - $n = 300$ is the boundary where our eyes can barely tell the difference between sinusoids and a square wave

---

## Gibb's Phenomenon

![clipboard.png](/blog/fourier-series-i-prelude-and-trigonometry/t8QpK2qx-clipboard.webp)

- **Overshoot** occurs near the jump of discontinuity in the singal
- It's an error with about $9\%$ of the jump size
- It's fixed when $n \rightarrow \infty$

---

## Trignometry Recap

![clipboard.png](/blog/fourier-series-i-prelude-and-trigonometry/vr8H4GvC-clipboard.webp)

### 1. Properties

#### $\cdot$ Even function

$$
cos(-x) = cos(x)
$$

#### $\cdot$ Odd function

$$
\begin{align*}
 &sin(-x) = -sin(x) \\
 &tan(-x) = -tan(x)
\end{align*}
$$

### 2. Basic Formulas

$$
\begin{align*}
&(i)&\quad cos^2x + sin^2x = 1 \\
&(ii)&\quad tanx = \frac{sinx}{cosx} \\
&(iii)&\quad 1 + tan^2x = \frac{1}{cos^2x} \\
\end{align*}
$$

### 3. Addition Theorem

$$
\begin{align*}
&(i)&\quad cos(\alpha \pm \beta) = cos\alpha \cdot cos\beta \mp sin\alpha \cdot sin\beta \\
&(ii)&\quad sin(\alpha \pm \beta) = sin\alpha \cdot cos\beta \pm cos\alpha \cdot sin\beta \\
\end{align*}
$$

### 4. Double Angle Formulas

$$
\begin{align*}
cos2\alpha &= cos^2\alpha - sin^2\alpha \\
 &=2cos^2\alpha - 1 \\
 &=1-2sin^2\alpha \\
\end{align*}
$$

$$
sin2\alpha = 2sin\alpha \cdot cos\alpha
$$

### 5. Half Angle Formulas

$$
\begin{align*}
&(i)&\quad cos^2\alpha = \frac{(1 + cos2\alpha)}{2} \\
&(ii)&\quad sin^2\alpha = \frac{(1 - cos2\alpha)}{2} \\
\end{align*}
$$

### 6. Product $\rightarrow$ Sum Formulas

$$
\begin{align*}
&(i)&\quad cos\alpha \cdot cos\beta = \frac{1}{2} \{cos(\alpha + \beta) + cos(\alpha - \beta)\} \\
&(ii)&\quad sin\alpha \cdot sin\beta = \frac{1}{2} \{cos(\alpha + \beta) - cos(\alpha - \beta)\} \\
&(iii)&\quad sin\alpha \cdot cos\beta = \frac{1}{2} \{sin(\alpha + \beta) - sin(\alpha - \beta)\} \\
\end{align*}
$$

---

## Periodic Functions

![clipboard.png](/blog/fourier-series-i-prelude-and-trigonometry/16N0vrIr-clipboard.webp)

- Given $x \in \R$ and $\exists L \in K$, $f(x)$ is a **periodic function** of $2L$

 $$
 \begin{align*}
 &f(x + 2L) = f(x) \\
 \end{align*}
 $$

---

### 1. $sin(kx)$

- The period of $sin(x)$ is $2\pi$

 $$
 \begin{align*}
 &y = sin(x) \Rightarrow L = 2\pi \\
 &y = sin(2x) \Rightarrow L = \frac{2\pi}{2} \\
 &y = sin(3x) \Rightarrow L = \frac{2\pi}{3} \\
 &\ldots \\
 &y = sin(kx) \Rightarrow L = \frac{2\pi}{k} \\
 \end{align*}
 $$

- By adding every multiple the period, we derive a function with $L = 2\pi$

 $$
 \begin{align*}
 y = \sum^{\infty}_{k = 1} b_k sin(kx)
 \end{align*}
 $$

---

### 2. Approximate the Function of Square Wave

#### Square Wave

$$
\begin{align*}
y &= f(x) \quad (-\pi < x \le \pi) \\
 &=
 \begin{cases}
 &\frac{-\pi}{4} &\quad (-\pi < x \le 0)\\
 &\frac{\pi}{4} &\quad (0 < x \le \pi)
 \end{cases}
\end{align*}
$$

![clipboard.png](/blog/fourier-series-i-prelude-and-trigonometry//blog/fourier-series-i-prelude-and-trigonometry/qJAPEvkh-clipboard.webp)

#### Fourier Series

$$
y = \sum_{k = 1}^{\infty} \frac{sin(2k-1)x}{2k-1}
$$

![clipboard.png](/blog/fourier-series-i-prelude-and-trigonometry/EhjtvOBL-clipboard.webp)

> [!TIP]
>
> - Both functions have the period of $2\pi$
> - The **discontinuities** are shown with **Gibb's Overshoot**.

## Even and Odd Functions

![clipboard.png](/blog/fourier-series-i-prelude-and-trigonometry/N4JFWmFB-clipboard.webp)

### 1. Even function

$$
\begin{align*}
 &\cdot f(-x) = f(x) \\
 &\cdot \int_{-a}^{a} f(x)dx = 2\int_{0}^{a}f(x)dx
\end{align*}
$$

- $cos(x)$

 $$
 \int_{-\pi}^{\pi} cos(x)dx = 2\int_{0}^{\pi}cos(x)dx
 $$

### 2. Odd function

$$
\begin{align*}
 &\cdot f(-x) = -f(x) \\
 &\cdot \int_{-a}^{a} f(x)dx = 0
\end{align*}
$$

- $sin(x)$

 $$
 \int_{-\pi}^{\pi} sin(x)dx = 0
 $$

> [!IMPORTANT]
>
> **Properties**
>
> $$
> \begin{align*}
> &\cdot \quad even \times even = even \\
> &\cdot \quad odd \times odd = even \\
> &\cdot \quad even \times odd = odd
> \end{align*}
> $$

## Trignometry and Integration

$$
\begin{align}
 &\int_{-\pi}^{\pi} cos(mx)dx = 0
 \quad \quad
 \int_{-\pi}^{\pi} sin(mx)dx = 0
 \quad \quad \\

 &\int_{-\pi}^{\pi} sin(mx) \cdot cos(nx)dx = 0
 \quad \quad \\

 &\int^{\pi}_{-\pi} cos(mx) \cdot cos(nx)dx =
 \begin{cases}
 \pi \quad(m = n) \\
 0 \quad(m \ne n)
 \end{cases} \\

 &\int^{\pi}_{-\pi} sin(mx) \cdot sin(nx)dx =
 \begin{cases}
 \pi \quad(m = n) \\
 0 \quad(m \ne n)
 \end{cases}
\end{align} \\
$$

where

- $n, m \in \mathbb{N}$

### (1) Integration of the $sin$ and $cos$ functions

#### $\cdot \int_{-\pi}^{\pi} cos(mx)dx = 0$

$$
\begin{align*}
 \int_{-\pi}^{\pi} cos(mx)dx &= \frac{1}{m} [sin(mx)]^{\pi}_{-\pi} \\
 &= \frac{1}{m} [sin(m\pi) - sin(-m\pi)] \\
 &= \frac{1}{m} [sin(m\pi) + sin(m\pi)] \\
 &\because sin(m\pi) = 0 \\
 &\therefore \frac{1}{m} [sin(m\pi) + sin(m\pi)] = 0 \\
 &\Rightarrow 0
\end{align*}
$$

#### $\cdot \int_{-\pi}^{\pi} sin(mx)dx = 0$

$$
\begin{align*}
 \int_{-\pi}^{\pi} sin(mx)dx &= -\frac{1}{m} [cos(mx)]^{\pi}_{-\pi} \\
 &= -\frac{1}{m} [cos(m\pi) - cos(-m\pi)] \\
 &= -\frac{1}{m} [cos(m\pi) - cos(m\pi)] \\
 &\because cos(m\pi) = -1 \\
 &\therefore \frac{1}{m} [cos(m\pi) + cos(m\pi)] = 0 \\
 &\Rightarrow 0
\end{align*}
$$

### (2) $\int_{-\pi}^{\pi} sin(mx) \cdot cos(nx)dx = 0$

$$
\begin{align*}
&\int_{-\pi}^{\pi}
 \underbrace{sin(mx)}_{odd\ func}
 \cdot
 \underbrace{cos(nx)}_{even\ func}
 dx \\
 &\because odd\times even = odd \\
 &\therefore \int_{-\pi}^{\pi} sin(mx) \cdot cos(nx)dx = 0
\end{align*}
$$

### (3) $\int^{\pi}\_{-\pi} cos(mx) \cdot cos(nx)dx = \begin{cases} \pi \quad(m = n) \\ 0 \quad(m \ne n) \end{cases} \\ $

#### $\cdot (m = n)$

$$
\begin{align*}
 &\int^{\pi}_{-\pi} cos(mx) \cdot cos(nx)dx \\
 &= \int^{\pi}_{-\pi} cos^2(mx) dx\\
 &= \int^{\pi}_{-\pi} cos^2(mx) dx\quad\quad (\text{Half angle formula})\\
 &= \frac{1}{2}[\int^{\pi}_{-\pi} dx + \underbrace{\int^{\pi}_{-\pi} cos(2mx)dx}_{0}] \\
 &= \pi + 0 \\
 &= \pi
\end{align*}
$$

#### $\cdot (m \ne n)$

$$
\begin{align*}
 &\int^{\pi}_{-\pi} cos(mx) \cdot cos(nx)dx \\
 &= \frac{1}{2}\int^{\pi}_{-\pi} cos(mx + nx) + cos(mx-nx)dx\\
 &= \frac{1}{2}[\int^{\pi}_{-\pi} cos(mx + nx) + \int^{\pi}_{-\pi} cos(mx-nx)dx]\\
 &= \frac{1}{2}[\underbrace{\int^{\pi}_{-\pi} cos(m + n)xdx}_{0}+ \underbrace{\int^{\pi}_{-\pi} cos(m-n)xdx}_{0}]\\
 &= 0
\end{align*}
$$

### (4) $\int^{\pi}_{-\pi} sin(mx) \cdot sin(nx)dx = \begin{cases} \pi \quad(m = n) \\ 0 \quad(m \ne n) \end{cases} \\$

> [!TIP]
> The proof is the same as the one given in (3)

---

## Inner Product and Norm

- Given two functions $f$ and $g$ that are continuous on the closed interval $[-\pi, \pi]$

$$
\begin{align*}
 &\cdot \text{The inner product of $f$ and $g$: } \\
 &\begin{align}
 (f, g) = \int_{-\pi}^{\pi} f(x)g(x) dx
 \quad\quad
 \end{align} \\
\end{align*}
$$

$$
\begin{align*}
 &\cdot \text{The norm (magnitude) of $f$ is: } \\
 &\begin{align}
 ||f|| = \sqrt{(f, f)} = \sqrt{\int_{-\pi}^{\pi} \{f(x)\}^2 dx}
 \quad\quad
 \end{align}
\end{align*}
$$

---

### Orthogonality relations of trigonometric functions

1. **Constant vs. cosine and sine**

$$
\int_{-\pi}^{\pi} \cos(mx)\, dx = 0 \quad \Rightarrow \quad (1, \cos(mx)) = 0
$$

$$
\int_{-\pi}^{\pi} \sin(mx)\, dx = 0 \quad \Rightarrow \quad (1, \sin(mx)) = 0
$$

So, the constant function $1$ is orthogonal to both $\cos(mx)$ and $\sin(mx)$.

---

2. **Sine vs. cosine**

$$
\int_{-\pi}^{\pi} \sin(mx)\cos(nx)\, dx = 0 \quad \Rightarrow \quad (\sin(mx), \cos(nx)) = 0
$$

Thus, sine and cosine are orthogonal to each other.

---

3. **Cosine vs. cosine**

$$
\int_{-\pi}^{\pi} \cos(mx)\cos(nx)\, dx =
\begin{cases}
\pi & m = n \\[6pt]
0 & m \ne n
\end{cases}
\quad \Rightarrow \quad (\cos(mx), \cos(nx)) =
\begin{cases}
\pi & m = n \\[6pt]
0 & m \ne n
\end{cases}
$$

---

4. **Sine vs. sine**

$$
\int_{-\pi}^{\pi} \sin(mx)\sin(nx)\, dx =
\begin{cases}
\pi & m = n \\[6pt]
0 & m \ne n
\end{cases}
\quad \Rightarrow \quad (\sin(mx), \sin(nx)) =
\begin{cases}
\pi & m = n \\[6pt]
0 & m \ne n
\end{cases}
$$

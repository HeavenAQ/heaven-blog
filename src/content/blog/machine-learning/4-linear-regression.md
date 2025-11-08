---
categories:
- Machine Learning
- lectures
createdAt: '2025-10-13'
description: $$
tags:
- Machine Learning
- Machine Learning
- lectures
- AI
title: 6. Linear Regression
---
# 4. Linear Regression

## Regression

$$
f: X \rightarrow Y
$$

- where $Y$ is continuous

### Approach

- Choose parameterized form for $P(Y \mid X, w)$
- Derive learning algorithm as **MLE** or **MAP**

---

## Parameterized form for $P(Y \mid X, w)$

- Y is some **deterministic** $f(X)$, plus random noise

 $$
 y = f(x) + \epsilon \quad where \ \epsilon \sim \mathcal{N}(0, \sigma^2)
 $$

- Therefore, Y is a r.v. that follows

$$
p(y \mid x) = \mathcal{N}(f(x), \sigma^2)
$$

---

## Consider Linear Regression

$$
\begin{align*}
&f(x) = w^Tx + w_0 \quad (w \in \R^d, w_0 \in \R) \\
&p(y \mid x) = N(w^Tx + w_0, \sigma^2)
\end{align*}
$$

- Let $x = \begin{bmatrix}x \\ 1\end{bmatrix}, w = \begin{bmatrix}w \\ w_0\end{bmatrix}$

$$
p(y \mid x) = N(w^Tx, \sigma^2)
$$

## MLE

### Quardratic Form

- First, expand the prediction function

 $$
 \begin{align*}
 p(y \mid x, w) &= N(w^Tx, \sigma^2) \\
 &= \frac{1}{\sqrt{2 \pi \sigma^2}} e^{-\frac{(y - w^\intercal x)^2}{2\sigma^2}}
 \end{align*}
 $$

- Then, calculate the $w$ that maximizes this function ($\hat{w}^{MLE}$)

$$
\begin{align*}
\hat{w}^{MLE} &= \argmax_w \prod^N_{i = 1} \frac{1}{\sqrt{2 \pi \sigma^2}} e^{-\frac{(y^{(i)} - w^\intercal x^{(i)})^2}{2\sigma^2}} \\
 &= \argmax_w \sum^N_{i = 1} \log \frac{1}{\sqrt{2 \pi \sigma^2}} + \log e^{-\frac{(y^{(i)} - w^\intercal x^{(i)})^2}{2\sigma^2}} \\
 &= \argmax_w \sum^N_{i = 1} \log \frac{1}{\sqrt{2 \pi \sigma^2}} -\frac{(y^{(i)} - w^\intercal x^{(i)})^2}{2\sigma^2} \quad (\text{Remove irrelevant term and flip sign})\\
 &= \argmin_w \sum^N_{i = 1} \frac{(y^{(i)} - w^\intercal x^{(i)})^2}{2\sigma^2} \\
 &= \argmin_w \sum^N_{i = 1} (y^{(i)} - w^\intercal x^{(i)})^2 \\
 &= \argmin_w \sum^N_{i = 1} (y^{(i)} - w^\intercal x^{(i)})^2 \quad (\text{Take the average})\\
 &= \argmin_w \sum^N_{i = 1} (y^{(i)} - w^\intercal x^{(i)})^2 \\
\end{align*}
$$

> [!TIP]
>
> Therefore, we derive that, the MLE is the minimization of the Ordinary Least Squares (OLS)
>
> $$
> l(w) = \frac{1}{N}\sum^N_{i = 1} (y^{(i)} - w^\intercal x^{(i)})^2
> $$

---

### Matrix Form

let $y = \begin{bmatrix} y^{(i)} \\ \vdots \\y^{(N)}\end{bmatrix}, \quad X = \begin{bmatrix}x^{(i)\intercal} \\ \vdots \\ x^{(N)\intercal}\end{bmatrix}$

$$
\begin{align*}
w &= \argmin_w l(w) \\
 &= \argmin_w \frac{1}{N} \sum^N_{i = 1} (y^{(i)} - w^\intercal x^{(i)})^2 \\
 &= \argmin_w (y - Xw)^T(y - Xw) \\
 &= \argmin_w (y^\intercal y - (Xw)^\intercal y - y^\intercal Xw + w^\intercal X^\intercal Xw) \\
 &= \argmin_w (y^\intercal y - 2y^\intercal Xw + (Xw)^\intercal Xw) \\
 \frac{\partial l}{\partial w}&= - 2y^\intercal X + X^\intercal Xw + (Xw)^\intercal X = 0 \\
 0 &= -2y^\intercal X + 2X^\intercal Xw \\
 X^\intercal y &= X^\intercal Xw \\
 (X^\intercal X)^{-1}X^\intercal y &= w \\
\end{align*}
$$

- Therefore, we derive that:

$$
w = (X^\intercal X)^{-1}X^\intercal y
$$

---

## MAP

$$
\begin{align*}
\hat{w}^{MAP} &= \argmax_w P(w \mid x^{(1)}, y^{(1)}, \dots, x^{(N)}, y^{(N)}) \\
 &= \argmax_w \frac{P(x^{(1)}, y^{(1)}, \dots, x^{(N)}, y^{(N)} \mid w)P(w)}{P(x^{(1)}, y^{(1)}, \dots, x^{(N)}, y^{(N)})} \\
 &= \argmax_w P(x^{(1)}, y^{(1)}, \dots, x^{(N)}, y^{(N)} \mid w)P(w) \\
 &= \argmax_w P(y^{(1)}, \dots, y^{(N)} \mid x^{(1)}, \dots, x^{(N)}, w)P(x^{(1)}, \dots, x^{(N)} \mid w)P(w) \\
 &= \argmax_w \prod^N_{i= 1} \left[ P(y^{(i)} \mid x^{(i)}, w) \right]P(w) \\
 &\text{Assume 0-mean Gaussian prior } \frac{1}{\sqrt{2 \pi \tau^2}}e^{-\frac{w^\intercal w}{2 \tau^2}}\\
 &= \argmax_w \sum^N_{i=1} \log P(y^{(i)} \mid x^{(i)}, w) + \log P(w) \\
 &= \argmin_w \frac{1}{2\sigma^2} \sum^N_{i=1} P(w^\intercal x^{(i)} - y^{(i)}) -\frac{w^\intercal w}{2 \tau^2} \\
 &\text{Let }\lambda = \frac{\sigma^2}{N\tau^2} \text{ and remove } \frac{1}{2} \\
 &= \argmin_w \frac{1}{N} \sum^N_{i = 1} (w^\intercal x^{(i)} - y^{(i)})^2 + \lambda ||w||_2^2
\end{align*}
$$

> [!TIP]
>
> Therefore, with Gaussian prior equivalent to ridge regression (L2), we get closed-form solution:
>
> $$
> w = (X^\intercal X + \lambda I)^{-1} X^\intercal y
> $$

### If Laplace Prior is assumed instead

![Screenshot 2025-10-14 at 13.08.16](/blog/4-linear-regression/jemoPhcV-Screenshot_2025-10-14_at_13.08.16.webp)

- Assume Laplace prior for each $w_j$

$$
w_j: \frac{1}{2b} e ^{\frac{|w_j|}{b}}
$$

- So we can redefine our prior as follows:

$$
\begin{align*}
&p(w) = \frac{1}{(2b)^{d + 1}} e^{-\frac{1}{b}\sum^{d}_{i = 1} |w_j|} \\
&\log p(w) \propto \sum^d_{i = 1} | w_j | = ||w||_1
\end{align*}
$$

- Finally, we can derive the $w^{MAP}$ as:

$$
\begin{align*}
w^{MAP} &= \argmax_w \log p(w) + \sum^N_{i = 1} \log p(y^{(i)} \mid x^{(i)}, w) \\
 &= \argmax_w c ||w||_1 + \sum^N_{i=1} (y^{(i)} - w^\intercal x^{(i)})^2

\end{align*}
$$

![Screenshot 2025-10-14 at 19.22.38](/blog/4-linear-regression/3IHZu_Pl-Screenshot_2025-10-14_at_19.22.38.webp)

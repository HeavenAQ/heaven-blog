---
categories:
- Machine Learning
- lectures
createdAt: '2025-10-21'
description: '- $\mathcal{D} = \{(x^{(i)}, y^{(i)})\}_{i = 1}^N$'
tags:
- Machine Learning
- Machine Learning
- lectures
- AI
title: 10. Bias-Variance Tradeoff
---
# 9. Bias Variance

## Training Data

- $\mathcal{D} = \{(x^{(i)}, y^{(i)})\}_{i = 1}^N$
 - drawn i.i.d. from some distribution $(X, Y)$
- Assume a regression setting, $Y \in \R$
- For a given $x$, there may be many $y$
 - Different features may have different labels
 - $x^{(i)}_j$ in $x^{(i)}$ may not have the same $y^{(i)}$

> [!TIP]
>
> Given a certain $x$, which $y$ should you predict?

---

### Expected Label (given $x \in \R^d$)

- For a given $x \in \R^d$, the expected label:

$$
\bar{y}(x) = \mathbb{E}_{y \mid x}[Y] = \int_y yP(y \mid x) dy
$$

---

### Expected Test Error (given $h_D$)

- Now, we have some ML Algorithm ($\mathcal{A}$), which takes the dataset $\mathcal{D}$ as an input to generate the predictor $h_\mathcal{D}$

$$
h_\mathcal{D} = \mathcal{A}(\mathcal{D})
$$

- With the predictor $h_\mathcal{D}$, we can hopefully derive the expected test error as follows:

$$
\begin{align*}
 \bar{h}(x) &= \mathbb{E}_{(x, y) \sim P}\left[(h_\mathcal{D} - y)^2\right] \\
 &= \int_x\int_y (h_\mathcal{D} - y)^2 P(x, y) dydx
\end{align*}
$$

> [!CAUTION]
>
> With this formula, we are still depending on the data distributions

---

### Expected Predictor (given $\mathcal A$)

- Assume that:
 - $\mathcal A:$ Linear regression
 - $\mathcal D:$ Sales data from the previous year
 - $h_\mathcal D:$ A random variable
- Expected Predictor Given A

$$
\bar{h} = \mathbb{E}_{\mathcal D \sim P^N}[h_\mathcal D] = \int_\mathcal{D} h_\mathcal D P(\mathcal D) d\mathcal D
$$

### Expected Test Error (given $\mathcal A$)

$$
\begin{align*}
 &\mathbb{E}_{(x, y) \sim P, \mathcal D \sim P^N} [(h_\mathcal D(x) - y)^2] \\
 &= \int_x \int_y \int_\mathcal D (h_\mathcal D(x) - y)^2 P(x, y) P(\mathcal D) d\mathcal D dydx
\end{align*}
$$

#### Full Derivation

1. Rewrite the formula by plugging $\bar{h}$ in
 $$
 \begin{align*}
 &\mathbb{E}_{x, y, \mathcal D} [(h_\mathcal D(x) - y)^2] \\
 &= \mathbb{E}_{x, y, \mathcal D} [[(h_\mathcal D(x) - \bar{h}(x)) + (\bar{h}(x) - y)]^2] \\
 &= \mathbb{E}_{x, \mathcal D} [(h_\mathcal D(x) - \bar{h}(x))^2]
 + 2\mathbb{E}_{x, y, \mathcal D} [(h_\mathcal D(x) - \bar{h}(x))(\bar{h}(x) - y)]
 + \mathbb{E}_{x, y} [(\bar{h}(x) - y)^2]\\
 \end{align*}
 $$
2. Solve for $\mathbb{E}_{x, y, \mathcal D} [(h_\mathcal D(x) - \bar{h}(x))(\bar{h}(x) - y)]$

 $$
 \begin{align*}
 &\mathbb{E}_{x, y, \mathcal D} [(h_\mathcal D(x) - \bar{h}(x))(\bar{h}(x) - y)] \\
 &= \mathbb{E}_{x, y} [\mathbb{E}_{\mathcal D}[h_\mathcal D(x) - \bar{h}(x)](\bar{h}(x) - y)] \\
 &= \mathbb{E}_{x, y} [
 (
 \mathbb{E}_{\mathcal D}[h_\mathcal D(x)]
 - \bar{h}(x)
 )(
 \bar{h}(x) - y
 )] \\
 &= \mathbb{E}_{x, y} [(\bar{h}(x) - \bar{h}(x))(\bar{h}(x) - y)] \\
 &= \mathbb{E}_{x, y} [0] \\
 &= 0
 \end{align*}
 $$

3. Solve for $\mathbb{E}_{x, y} [(\bar{h}(x) - y)^2]$

 $$
 \begin{align*}
 &\mathbb{E}_{x, y} [(\bar{h}(x) - y)^2] \\
 &= \mathbb{E}_{x, y} [(\bar{h}(x) - \bar{y}(x)) + (\bar{y}(x) - y)^2] \\
 &= \mathbb{E}_{x} [(\bar{h}(x) - \bar{y}(x))^2]
 + 2\mathbb{E}_{x, y}[(\bar{h}(x) - \bar{y}(x))(\bar{y}(x) - y)] +
 + \mathbb{E}_{x, y}[(\bar{y}(x) - y)^2]\\
 \end{align*}
 $$

4. Solve for $\mathbb{E}_{x, y}[(\bar{h}(x) - \bar{y}(x))(\bar{y}(x) - y)]$

 $$
 \begin{align*}
 &\mathbb{E}_{x, y}[(\bar{h}(x) - \bar{y}(x))(\bar{y}(x) - y)] \\
 &=\mathbb{E}_{x}[(\bar{h}(x) - \bar{y}(x))\mathbb E_{y \mid x}[\bar{y}(x) - y]] \\
 &=\mathbb{E}_{x}[(\bar{h}(x) - \bar{y}(x))\mathbb (\bar{y}(x) - E_{y \mid x}[y])] \\
 &=\mathbb{E}_{x}[(\bar{h}(x) - \bar{y}(x))\mathbb (\bar{y}(x) - \bar{y}(x))] \\
 &=\mathbb{E}_{x}[0] \\
 &= 0
 \end{align*}
 $$

5. Plug all the solved equations in:

 $$
 \begin{align*}
 &\mathbb E_{x, y, \mathcal D} \left[[h_\mathcal D(x) - y]^2\right] \\
 &=\mathbb E_{x, \mathcal D} \left[(h_\mathcal D(x) - \bar{h}(x))^2\right]
 + \mathbb E_{x} \left[(\bar{h}(x) - \bar{y}(x))^2\right]
 + \mathbb E_{x, y} \left[(\bar{y}(x) - y)^2\right]\\
 \end{align*}
 $$

---

## Breaking Down the Expected Test Error

$$
 \begin{align*}
 &\mathbb E_{x, y, \mathcal D} \left[[h_\mathcal D(x) - y]^2\right] \\
 &=\mathbb E_{x, \mathcal D} \left[(h_\mathcal D(x) - \bar{h}(x))^2\right]
 + \mathbb E_{x} \left[(\bar{h}(x) - \bar{y}(x))^2\right]
 + \mathbb E_{x, y} \left[(\bar{y}(x) - y)^2\right]\\
 \end{align*}
$$

The expected test error equals

- Variance (due to data randomness)
- Bias (due to model misspecification)
- Irreducible noise (due to inherent randomness in data).

---

### 1. Expected Test Error

$$
\mathbb{E}{x, y, \mathcal{D}}\left[(h{\mathcal{D}}(x) - y)^2\right]
$$

- This is the overall expected test error — how far the model’s predictions $h_{\mathcal{D}}(x)$ are from the true values $y$, averaged over:
 - all possible datasets $\mathcal{D}$ you could have trained on,
 - all possible inputs $x$, and
 - all possible outputs $y$ drawn from the true data distribution.

---

### 2. First term:

$$
\mathbb E_{x, \mathcal D} \left[(h_\mathcal D(x) - \bar{h}(x))^2\right]
$$

- This measures how much the predictions from different datasets fluctuate around their average prediction $\bar{h}(x)$.
- In words:
 - **variance**
 - how sensitive the model is to the particular training data it saw.
 - If this term is large, your model changes a lot depending on the training data (i.e., it’s unstable or overfits).
 - If it’s small, your model is consistent across different datasets.

---

### 3. Second term:

$$
\mathbb{E}_{x}\left[(\bar{h}(x) - \bar{y}(x))^2\right]
$$

- <mark>irreducible</mark>
- we may add some more data to resovle this issue
- This measures how far the model’s average prediction $\bar{h}(x)$ is from the best expected output $\bar{y}(x) = \mathbb{E}_{y \mid x}[Y]$.
- In words:
 - **bias**
 - the systematic error of your model.
 - If your model’s structure can’t capture the true relationship, this term is large (underfitting).
 - If it’s small, your model’s mean prediction is close to the truth.

---

### 4. Third term:

$$
\mathbb{E}_{x, y}\left[(\bar{y}(x) - y)^2\right]
$$

- This measures how much the true data itself varies around its expected value.
- In words:
- **irreducible noise**
 - randomness or natural variability in the data that no model can ever predict perfectly.

> [!WARNING]
>
> Any of the error terms can dominate the entire test error

---

## Illustration of Bias and Variance

![clipboard.png](/blog/9-bias-variance/Dh6RueBP-clipboard.webp)

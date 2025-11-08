---
categories:
- Machine Learning
- reading materials
createdAt: '2025-09-04'
description: '- **Inductive Bias**'
tags:
- reading materials
- Machine Learning
- Machine Learning
- AI
title: 4. Introduction to ML Concepts
---
# 1-2 Intro to ML Concepts

## Linear Regression

- **Inductive Bias**
 - Assumtptions about the nature of the data distribution
 - $p(y \mid x )$ for `supervised problem`
 - $p(x)$ for `unsupervised problem`
- **Parametric Model**
 - A statistical model with a fixed number of parameters

### $\bullet$ Formula for Linear Regression

$$
y(x) = w^\intercal x + \epsilon
$$

- $\epsilon$
 - Residual error between our lienar prediction and the true responses
 - $\sim{N(\mu, \sigma^2)}$

### $\bullet$ Linear Regression and Gaussian

$$
p(u \mid x, \theta) = N(y \mid \mu(x), \sigma^2(x))
$$

- $\mu$ is a linear function of x s.t. $\mu = w^\intercal x$
 - **For 1-D data:**
 - $\mu(x) = w_0 + w_1x = w^\intercal x$
- $\sigma^2(x)$ is the noise fixed: $\sigma^2(x) = \sigma^2$

### $\bullet$ Estimation via Residual Sum of Squares

- **Objective**: minimize the sum of squared residuals

 $$
 RSS(w) = \sum_{i=1}^n (y_i - w^\top x_i)^2
 $$

- **Optimization Problem**

 $$
 w^* = \arg \min_w RSS(w)
 $$

- **2-D Optimization**

![clipboard.png](/blog/1-2-intro-to-ml-concepts/gxq_s1Ig-clipboard.webp)

 - Formula of **RSS**
 $$
 \begin{align*}
 &l: y = ax + b \quad (prediction)\\
 &L = \sum_{i=1}^{n}(y_i - ax_i - b)^2 \quad (RSS)
 \end{align*}
 $$
 - Minimization of **RSS**

 $$
 \frac{\partial L}{\partial a} = 0
 \quad\quad
 \frac{\partial L}{\partial b} = 0
 \quad\quad
 $$

 $$
 \begin{align*}
 \frac{\partial}{\partial a} &= \sum_{i=1}^{n}(y_i - ax_i - b)^2 \\
 &= \sum_{i=1}^{n} 2(y_i -ax_i - b)(-x_i) \\
 &= 2\sum_{i=1}^{n} (-x_iy_i + ax_i^2 + bx_i) \\
 &\because \frac{\partial a}{\partial L} = 0 \\
 &\therefore \sum_{i=1}^{n} (-x_iy_i + ax_i^2 + bx_i) = 0\\
 &\Rightarrow -n(\sigma_{xy} -\hat{y}\hat{x}) + an(\sigma_x^2 + \hat{x}^2) + bn\hat{x} = 0 \\
 &\Rightarrow -(\sigma_{xy} +\hat{y}\hat{x}) + a(\sigma_x^2 + \hat{x}^2) + b\hat{x} = 0
 \end{align*}
 $$

 $$
 \begin{align*}
 \frac{\partial}{\partial b} &= \sum_{i=1}^{n}(y_i - ax_i - b)^2 \\
 &= \sum_{i=1}^{n} -2(y_i -ax_i - b) \\
 &= -2\sum_{i=1}^{n} (y_i -ax_i - b) \\
 &\because \frac{\partial b}{\partial L} = 0 \\
 &\therefore \sum_{i=1}^{n} (y_i -ax_i - b) = 0\\
 &\Rightarrow -n\hat{y} + an\hat{x} + bn = 0 \\
 &\Rightarrow -\hat{y} + a\hat{x} + b = 0 \\
 \end{align*}
 $$

 $$
 \begin{align*}
 &\begin{cases}
 &a(\sigma_x^2 + \hat{x}^2) + b\hat{x} -(\sigma_{xy}+\hat{y}\hat{x}) = 0 \\
 &a\hat{x} + b -\hat{y} = 0 \\
 \end{cases} \\

 &\Rightarrow b = \hat{y} - a\hat{x} \\
 &\Rightarrow a\sigma_x^2 + \cancel{a\hat{x}^2} + \cancel{\hat{y}\hat{x}} - \cancel{a\hat{x}^2} -\sigma_{xy} - \cancel{\hat{y}\hat{x}} = 0 \\
 &\Rightarrow a = \frac{\sigma_{xy}}{\sigma^2_x} \quad \text{(regression coefficient)} \\
 &\Rightarrow b = \hat{y} - \frac{\sigma_{xy}}{\sigma^2_x} \hat{x} \\
 \end{align*}
 $$

 $$
 \begin{align*}
 &\because a = \frac{\sigma_{xy}}{\sigma^2_x} \quad\quad
 b = \hat{y} - \frac{\sigma_{xy}}{\sigma^2_x} \hat{x} \\
 &\therefore y = ax + b \\
 &\Rightarrow y = \frac{\sigma_{xy}}{\sigma^2_x}x + \hat{y} - \frac{\sigma_{xy}}{\sigma^2_x} \hat{x} \\
 &\Rightarrow y - \hat{y} = \frac{\sigma_{xy}}{\sigma^2_x}(x - \hat{x}) \\
 &\Rightarrow y - \hat{y} = \frac{\sigma_{xy}}{\sigma_x\sigma_y} \cdot \frac{\sigma_{y}}{\sigma_x}(x - \hat{x}) \\
 &\Rightarrow y - \hat{y} = \rho_{xy} \cdot \frac{\sigma_{y}}{\sigma_x}(x - \hat{x})

 \end{align*}
 $$

- **Closed-form solution** (Normal Equation):

 $$
 w^* = (X^\top X)^{-1} X^\top y
 $$

 where $X$ is the design matrix.

> [!NOTE]
>
> **DESIGN MATRIX**
>
> $$
> X =
> \begin{bmatrix}
> 1 & x_{11} & x_{12} & \cdots & x_{1d} \\
> 1 & x_{21} & x_{22} & \cdots & x_{2d} \\
> \vdots & \vdots & \vdots & \ddots & \vdots \\
> 1 & x_{n1} & x_{n2} & \cdots & x_{nd}
> \end{bmatrix}
> $$
>
> - Rows correspond to **observations** (data points).
> - Columns correspond to **features** (including the constant 1 for intercept).

### $\bullet$ Linear regression with non-linear relationships

- **Polynomial Regression**
- Replace $x$ with some non-linear functions

$$
p(u \mid x, \theta) = N(y \mid w^\intercal \phi(x), \sigma^2)
$$

- **Basis function expansion**
- e.g. $\phi(x) = [1, x, x^2, \ldots, x^d]$, for $d = 14$ and $d = 20$

![clipboard.png](/blog/1-2-intro-to-ml-concepts/_JAYsuz7-clipboard.webp)

## Logistic Regression

- Generalize Linear Regression to the binary classification

### 1. Replace Gaussian Distribution to Bernoulli Distribution

$$
p(y \mid x, w) = Ber(y\mid \mu(x)) \\
$$

- $y\in \{-1, 1\}$
- $\mu(x) = \mathbb{E}[y \mid x] = p(y = 1 \mid x)$

### 2. Pass $\mu(x)$ through sigmoid function

$$
sigm(\eta) \triangleq \frac{1}{1 + e^{-\eta}} = \frac{e^\eta}{e^\eta + 1}
$$

$$
\mu(x) = sigm(w^\intercal x)
$$

- The **squashing function** sigmoid maps the whole real line to $[0, 1]$

$$
p(x \mid x, w) = Ber(y \mid sigm(w^\intercal x))
$$

### 3. Example: $p(y_i = 1 \mid x_i, w) = sigm(w_0 + w_1 x_i)$

![clipboard.png](/blog/1-2-intro-to-ml-concepts/qfs12red-clipboard.webp)

## Model Selection

- We can decide on which model to select based on the `misclassification rate`

 $$
 \begin{align*}
 &err(f, D) = \frac{1}{N}\sum_{i=1}^N \mathbb{I}(f(x_i) \ne y_i) \\
 &\cdot where\ \mathbb{I}(f(x_i) \ne y_i) =
 \begin{cases}
 &1 \quad(f(x_i) \ne y_i) \\
 &0 \quad(f(x_i) = y_i)
 \end{cases}
 \end{align*}
 $$

- Example of an increased error rate due to the increase in K. (`over-smoothing`)

![clipboard.png](/blog/1-2-intro-to-ml-concepts/KJN_UCz8-clipboard.webp)

- For complex models (small $K$), the method `overfits`
- For simple models (large $K$), the method `underfits`

### Validation

- Create a test set by partitioning data into different parts
 - usually $80\%$ for training and $20\%$ for testing

#### $\bullet$ Cross Validation

- Split data into **$K$ folds**. For each fold $k \in \{1, \ldots, K\}$, we train on all data but the $k^{th}$ fold.
- We test our trained model on the $k^{th}$ fold.
- Leave-one out cross validation **(LOOCV)**
 - set $K = N$, leaving 1 test case for validation

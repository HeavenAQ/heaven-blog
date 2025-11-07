---
categories:
- Machine Learning
- homework
createdAt: '2025-10-17'
description: 'Solutions to ML Homework 3 covering Support Vector Machines (SVM), dual optimization, kernel methods, and linear regression techniques including Ridge and Lasso with ISTA'
tags:
- Machine Learning
- SVM
- Kernel Methods
- Ridge Regression
- Lasso Regression
- Linear Regression
title: Machine Learning Homework 3 Solutions
---

## Problem 1: Support Vector Machines (25 pt)

### 1.1 Soft Margin with Hinge Loss

Given dataset:
- $x^{(1)} = \begin{bmatrix}0\\0\end{bmatrix}, y^{(1)} = +1$
- $x^{(2)} = \begin{bmatrix}2\\0\end{bmatrix}, y^{(2)} = +1$
- $x^{(3)} = \begin{bmatrix}1\\1\end{bmatrix}, y^{(3)} = -1$

Functional margin: $\gamma_i := y^{(i)}(w^\top x^{(i)}+b)$
Hinge loss: $\xi_i := \max\{0, 1-\gamma_i\}$

#### (i) With $w = \begin{bmatrix}1\\0\end{bmatrix}, b = 0, C = 1$

**Computations:**

- $f(x^{(1)}) = w^\intercal x^{(1)} + b = 0$
- $f(x^{(2)}) = 2$
- $f(x^{(3)}) = 1$

**Functional margins:**
- $\gamma_1 = 0$
- $\gamma_2 = 2$
- $\gamma_3 = -1$

**Slack variables:**
- $\xi_1 = \max(0, 1-0) = 1$
- $\xi_2 = \max(0, 1-2) = 0$
- $\xi_3 = \max(0, 1-(-1)) = 2$

**Objective value:**

$$
\frac{1}{2}\|w\|^2_2 + C\sum^N_{i=1}\xi_i = \frac{1}{2}(1) + 1(1 + 0 + 2) = 3.5
$$

#### (ii) With $w = \begin{bmatrix}1\\-1\end{bmatrix}, b = 0, C = 1$

**Computations:**

- $f(x^{(1)}) = 0$
- $f(x^{(2)}) = 2$
- $f(x^{(3)}) = 0$

**Functional margins:**
- $\gamma_1 = 0$
- $\gamma_2 = 2$
- $\gamma_3 = 0$

**Slack variables:**
- $\xi_1 = 1$
- $\xi_2 = 0$
- $\xi_3 = 1$

**Objective value:**

$$
\frac{1}{2}\|w\|^2_2 + C\sum^N_{i=1}\xi_i = \frac{1}{2}(2) + 1(1 + 0 + 1) = 3.0
$$

**Answer:** The second parameter choice ($w = \begin{bmatrix}1\\-1\end{bmatrix}$) has the smaller objective value (3.0 < 3.5).

#### (iii) Effect of C on Regularization Trade-off

**With $C = 0.5$:**
- Case (i): $\frac{1}{2} + 0.5 \times 3 = 2.0$
- Case (ii): $1.0 + 0.5 \times 2 = 2.0$

**With $C = 2$:**
- Case (i): $\frac{1}{2} + 2 \times 3 = 6.5$
- Case (ii): $1.0 + 2 \times 2 = 5.0$

**Analysis:**

Increasing $C$ leads to smaller $\xi_i$ (fewer violations) and a smaller margin, whereas decreasing $C$ tolerates larger $\xi_i$ for misclassifications, giving rise to a larger margin. When $C \to \infty$, the SVM becomes hard-margin.

- **Higher C:** Emphasizes minimizing training violations (forces $\xi_i \to 0$), resulting in smaller margins
- **Lower C:** Allows more violations, prioritizes larger margins
- Trade-off: Margin width vs. training error

### 1.2 Importance Weighted Soft Margin SVMs

#### (a) Primal Optimization

**Answer:**

$$
\begin{aligned}
& \min_{w, b, \xi} \frac{1}{2} \|w\|^2_2 + C\sum^N_{i = 1} p^{(i)}\xi_i \\
& \text{s.t. } y^{(i)}(w^\intercal x^{(i)} + b) \ge 1 - \xi_i, \quad \xi_i \ge 0, \quad i = 1, \dots, N
\end{aligned}
$$

Each example's slack penalty is scaled by its importance weight $p^{(i)}$.

#### (b) Dual Problem

**Answer:** The weight $p^{(i)}$ adds an upper bound for the dual variables: $0 \le \alpha_i \le Cp^{(i)}$

Introduce Lagrangian multipliers $\alpha_i \ge 0$ and $\mu_i \ge 0$:

$$
L(w, b, \xi, \alpha, \mu) = \frac{1}{2} \|w\|^2_2 + C\sum^{N}_{i = 1}p^{(i)} \xi_i + \sum^{N}_{i = 1}\alpha_i (1 - \xi_i - y^{(i)}(w^\intercal x^{(i)} + b)) - \sum^{N}_{i=1} \mu_i \xi_i
$$

Taking partial derivatives and setting to zero:

$$
\begin{aligned}
& \frac{\partial L}{\partial w} = 0 \implies w = \sum^{N}_{i = 1} \alpha_i y^{(i)}x^{(i)} \\
& \frac{\partial L}{\partial b} = 0 \implies \sum^{N}_{i = 1} \alpha_i y^{(i)} = 0 \\
& \frac{\partial L}{\partial \xi} = 0 \implies Cp^{(i)} = \alpha_i + \mu_i
\end{aligned}
$$

Since $\alpha_i \ge 0$ and $\mu_i \ge 0$, we have $0 \le \alpha_i \le Cp^{(i)}$.

The dual problem becomes:

$$
\begin{aligned}
& \max_{\alpha} \sum^N_{i = 1} \alpha_i - \frac{1}{2} \sum^N_{i=1}\sum^N_{j=1} \alpha_i \alpha_j y^{(i)}y^{(j)} x^{(i)\intercal}x^{(j)} \\
& \text{s.t. } \sum^{N}_{i = 1} \alpha_i y^{(i)} = 0, \quad 0 \le \alpha_i \le Cp^{(i)}, \quad i = 1, \dots, N
\end{aligned}
$$

#### (c) Feasible Sets with Given Weights

Given $p^{(1)} = 1, p^{(2)} = \frac{1}{2}, p^{(3)} = 0$ and $C = 2$:

**Answer:**
- $0 \le \alpha_1 \le 2$
- $0 \le \alpha_2 \le 1$
- $\alpha_3 = 0$

#### (d) L2 Soft-Margin SVM Dual

For the objective:

$$
\min_{w, b, \xi}\frac{1}{2}\|w\|^2_2+\frac{C}{2}\sum_{i=1}^{N}\xi_i^2 \quad \text{s.t. } y^{(i)}(w^\intercal x^{(i)} + b) \ge 1-\xi_i, \xi_i \ge 0
$$

**Answer:**

Following similar steps, the Lagrangian is:

$$
L(w, b, \xi, \alpha, \mu) = \frac{1}{2} \|w\|^2_2 + \frac{C}{2}\sum^{N}_{i = 1}\xi_i^2 + \sum^{N}_{i = 1}\alpha_i (1 - \xi_i - y^{(i)}(w^\intercal x^{(i)} + b)) - \sum^{N}_{i=1} \mu_i \xi_i
$$

Taking partial derivatives:

$$
\begin{aligned}
& \frac{\partial L}{\partial w} = 0 \implies w = \sum^{N}_{i = 1} \alpha_i y^{(i)}x^{(i)} \\
& \frac{\partial L}{\partial b} = 0 \implies \sum^{N}_{i = 1} \alpha_i y^{(i)} = 0 \\
& \frac{\partial L}{\partial \xi} = 0 \implies \xi_i = \frac{\alpha_i + \mu_i}{Cp^{(i)}}
\end{aligned}
$$

Substituting back and maximizing over $\mu_i \ge 0$ gives $\mu_i^* = 0$:

$$
\begin{aligned}
\max_{\alpha} \quad & \sum_{i=1}^N \alpha_i - \frac{1}{2} \sum_{i=1}^N \sum_{j=1}^N \alpha_i \alpha_j y^{(i)} y^{(j)} x^{(i)\top} x^{(j)} - \frac{1}{2C}\sum_{i=1}^N \frac{\alpha_i^2}{p^{(i)}} \\
\text{s.t.} \quad & \sum_{i=1}^N \alpha_i y^{(i)} = 0, \quad \alpha_i \ge 0, \quad i = 1, \dots, N
\end{aligned}
$$

## Problem 2: Implementing Support Vector Machine (25 pt)

### 2.1 Projection Operators

#### Prove $(\Pi_{[0,\infty)^N}[\alpha])_i = \max\{\alpha_i, 0\}$

For each coordinate $i$:

$$
\alpha_i' = \argmin_{\alpha_i' \ge 0} (\alpha_i' - \alpha_i)^2
$$

The minimizer is:

$$
\alpha_i' = \begin{cases}
\alpha_i & \text{if } \alpha_i \ge 0 \\
0 & \text{if } \alpha_i < 0
\end{cases} = \max\{\alpha_i, 0\}
$$

#### Prove $(\Pi_{[0,C]^N}[\alpha])_i = \min\{\max\{\alpha_i, 0\}, C\}$

For each coordinate $i$:

$$
\alpha_i' = \argmin_{0 \le \alpha_i' \le C} (\alpha_i' - \alpha_i)^2
$$

The minimizer is:

$$
\alpha_i' = \begin{cases}
C & \text{if } \alpha_i \ge C \\
\alpha_i & \text{if } 0 \le \alpha_i \le C \\
0 & \text{if } \alpha_i < 0
\end{cases} = \min\{\max\{\alpha_i, 0\}, C\}
$$

## Problem 3: Linear Regression and ERM (25 pt)

### 3.1 Robustness of Linear Regression

#### (a) Dataset Without Outlier

Given $\{(x^{(i)}, y^{(i)})\}^{5}_{i=1} = \{(1,2), (2,3), (3,6), (4,7), (5,10)\}$ with $w_0 = 1$.

**Answer:** $w_1 = \frac{89}{55} \approx 1.618$

Minimizing $\ell(w) = \sum^{N}_{i = 1}(y^{(i)} - w_1 x^{(i)} - 1)^2$:

$$
\frac{\partial \ell}{\partial w_1} = -2 \sum^{N}_{i = 1}(y^{(i)} - w_1 x^{(i)} - 1)x^{(i)} = 0
$$

$$
w_1 = \frac{\sum^N_{i = 1} (y^{(i)} - 1) x^{(i)}}{\sum^N_{i = 1} x^{(i)2}} = \frac{89}{55}
$$

#### (b) Dataset With Outlier

Adding outlier $(6, 180)$:

**Answer:** $w_1 = \frac{1,163}{91} \approx 12.78$

The outlier significantly increases the slope, demonstrating that L2 loss is sensitive to outliers.

#### (c) L1 Loss With Outlier

Using $\ell(w) = \sum_{i=1}^N|y^{(i)} - w_1 x^{(i)} - w_0|_1$:

**Answer:** The L1 loss is more robust to outliers as it doesn't square the residuals. The optimal $w_1$ would be closer to the value without the outlier, showing L1's robustness.

### 3.2 Lasso Regression

Given $X^TX = I$, solve:

$$
w^* = \argmin_w \|y - Xw\|_2^2 + \lambda\|w\|_1
$$

#### (a) Show $w^*_i$ Depends Only on $X_{\cdot i}, y, \lambda$

**Answer:** $w_i^* = w_i^2 - 2(X^\intercal_i y)w_i + \lambda |w_i|$

Expanding the objective:

$$
w^* = y^\intercal y - 2y^\intercal Xw + w^\intercal X^\intercal X w + \lambda \|w\|_1
$$

With $X^TX = I$, this becomes:

$$
w^* = \sum^N_{i = 1} w_i^2 - 2(X_i^\intercal y)w_i + \lambda |w_i| + \text{const}
$$

Each $w_i$ can be optimized independently.

#### (b) Case $w^*_i > 0$

**Answer:** $w_i^* = X^\intercal_i y - \frac{\lambda}{2}$ where $X_i^\intercal y > \frac{\lambda}{2}$

For $w_i > 0$:

$$
\frac{\partial}{\partial w_i}(w_i^2 - 2(X^\intercal_i y)w_i + \lambda w_i) = 0
$$

$$
2w_i^* - 2X^\intercal_i y + \lambda = 0 \implies w_i^* = X^\intercal_i y - \frac{\lambda}{2}
$$

#### (c) Case $w^*_i < 0$

**Answer:** $w_i^* = X^\intercal_i y + \frac{\lambda}{2}$ where $X_i^\intercal y < -\frac{\lambda}{2}$

For $w_i < 0$:

$$
2w_i^* - 2X^\intercal_i y - \lambda = 0 \implies w_i^* = X^\intercal_i y + \frac{\lambda}{2}
$$

#### (d) Condition for $w^*_i = 0$

**Answer:** $w_i^* = 0 \iff -\frac{\lambda}{2} \le X_i^\intercal y \le \frac{\lambda}{2}$

From (b) and (c):
- $w_i^* > 0 \implies X_i^\intercal y > \frac{\lambda}{2}$
- $w_i^* < 0 \implies X_i^\intercal y < -\frac{\lambda}{2}$

Therefore: $w_i^* = 0 \iff -\frac{\lambda}{2} \le X_i^\intercal y \le \frac{\lambda}{2}$

**Interpretation:** Features with small correlation to the target (within the threshold $\lambda/2$) are set to zero, performing automatic feature selection.

### 3.3 Ridge Regression

#### (a) Ridge for $d = 1$

**Answer:** $w^* = \frac{\sum_{i=1}^{N}x^{(i)}y^{(i)}}{\sum_{i=1}^{N}(x^{(i)})^2 + N\lambda}$, $w_0^* = 0$

With centered data ($\sum y^{(i)} = 0, \sum x^{(i)} = 0$):

$$
\frac{\partial}{\partial w_0} = -\frac{2}{N} \sum^N_{i = 1} (y^{(i)} - wx^{(i)} - w_0) = 0 \implies w_0^* = 0
$$

$$
\frac{\partial}{\partial w} = -\frac{2}{N} \sum_{i=1}^N x^{(i)}(y^{(i)} - wx^{(i)}) + 2\lambda w = 0
$$

$$
w^* = \frac{\sum_{i=1}^{N}x^{(i)}y^{(i)}}{\sum_{i=1}^{N}(x^{(i)})^2 + N\lambda}
$$

#### (b) Ridge for $d > 1$

**Answer:** $w^* = \left(\frac{1}{N}X^\intercal X + \lambda I\right)^{-1}\frac{1}{N}X^\intercal y$, $w_0^* = 0$

$$
\frac{\partial}{\partial w_0} = -\frac{2}{N}\mathbf{1}^\intercal(y - Xw - w_0\mathbf{1}) = 0 \implies w_0^* = 0
$$

$$
\frac{\partial}{\partial w} = -\frac{2}{N}X^\intercal(y - Xw) + 2\lambda w = 0
$$

$$
w^* = \left(\frac{1}{N}X^\intercal X + \lambda I\right)^{-1}\frac{1}{N}X^\intercal y
$$

## Code Implementation

### SVM Solver (hw3_q2.py)

```python
def svm_solver(x_train, y_train, lr, num_iters, kernel=hw3_utils.poly(degree=1), c=None):
    """Solve SVM using projected gradient descent on the dual problem"""
    N = x_train.shape[0]
    alpha = torch.zeros(N, requires_grad=True)
    Y = torch.diag(y_train)

    # Precompute kernel matrix
    K = create_kernel(x_train, x_train, N, N, kernel)

    for _ in range(num_iters):
        # Dual objective: sum(alpha) - 0.5 * alpha^T(YKY)alpha
        L = alpha.sum() - 0.5 * alpha @ (Y @ K @ Y) @ alpha
        L.backward()

        with torch.no_grad():
            alpha += lr * alpha.grad

            # Project onto feasible set
            if c:
                alpha = torch.clamp_(alpha, min=0, max=c)
            else:
                alpha = torch.clamp_(alpha, min=0)

            alpha.grad.zero_()
        alpha.requires_grad_()

    return alpha.detach()

def svm_predictor(alpha, x_train, y_train, x_test, kernel=hw3_utils.poly(degree=1)):
    """Predict using trained SVM"""
    N = x_train.shape[0]
    M = x_test.shape[0]

    K_train = create_kernel(x_train, x_train, N, N, kernel)
    K_test = create_kernel(x_train, x_test, N, M, kernel)

    # Find support vectors
    support_idx = torch.where(alpha > 1e-5)[0]
    min_alpha_idx = support_idx[torch.argmin(alpha[support_idx])]

    # Calculate bias: b = y_k - sum(alpha_j * y_j * K(x_j, x_k))
    b = y_train[min_alpha_idx] - (alpha * y_train * K_train[:, min_alpha_idx]).sum()

    # Predictions: f(x) = sum(alpha_i * y_i * K(x_i, x)) + b
    return torch.sum((alpha * y_train).unsqueeze(1) * K_test, dim=0) + b
```

### Linear Regression Implementations (hw3_q4.py)

```python
def ols_solve_predict(X_train_b, y_train, X_test_b):
    """OLS using normal equation"""
    w_ols = np.linalg.pinv(X_train_b.T @ X_train_b) @ X_train_b.T @ y_train
    y_pred = X_test_b @ w_ols
    return w_ols, y_pred

def ridge_precompute(X_train_b, y_train):
    """Precompute matrices for Ridge regression"""
    n_features = X_train_b.shape[1]
    I = np.eye(n_features)
    I[0, 0] = 0  # Don't penalize bias

    XtX = X_train_b.T @ X_train_b
    Xty = X_train_b.T @ y_train
    return I, XtX, Xty

def ridge_solve_predict(XtX, Xty, I, lambda_val, X_test_b):
    """Ridge closed-form solution"""
    w_ridge = np.linalg.pinv(XtX + lambda_val * I) @ Xty
    y_pred_ridge = X_test_b @ w_ridge
    return w_ridge, y_pred_ridge

def ista_lasso(X, y, alpha, n_iterations, lambda_val, tol=1e-8):
    """ISTA for Lasso with early stopping"""
    n, d = X.shape
    w = np.zeros(d, dtype=np.float64)
    thr = alpha * lambda_val

    for _ in range(n_iterations):
        w_prev = w.copy()

        # Gradient step
        grad = 2 / n * (X.T @ (X @ w - y))
        w -= alpha * grad

        # Soft-thresholding (skip bias)
        z = w[1:].copy()
        w[1:] = np.sign(z) * np.maximum(np.abs(z) - thr, 0.0)

        # Early stopping
        if np.linalg.norm(w - w_prev, ord=np.inf) < tol:
            break

    return w

def smear_back_transform(y_train_log, train_pred_log, X_test_b, w):
    """Apply Duan's smearing estimator for log transform"""
    residuals = y_train_log - train_pred_log
    smear = np.mean(np.exp(residuals))

    y_pred_log_test = X_test_b @ w
    y_pred_back = np.expm1(y_pred_log_test) * smear

    return smear, y_pred_back
```

---
categories:
- Machine Learning
- lectures
createdAt: '2025-10-14'
description: '> [!CAUTION]'
tags:
- Machine Learning
- Machine Learning
- lectures
- AI
title: 5. SVM
---

# 5. SVM

## Linear Classifiers

> [!CAUTION]
>
> Sometimes, we may have multiple decision boundaries.

![Screenshot 2025-10-14 at 20.54.46](/blog/5-svm/IikI7xS7-Screenshot_2025-10-14_at_20.54.46.webp)

## Maximizing the margin

![clipboard.png](/blog/5-svm/3Bbj2nhB-clipboard.webp)

- $\gamma:$ The distance between a data point to the decision boundary

## Decision Rule

### Hyperplane

$$
H = \{x: w^\intercal x + b = 0\}
$$

### w

- a vector perpendicular to the median line

![Screenshot 2025-10-14 at 21.26.04](/blog/5-svm/886ZymKL-Screenshot_2025-10-14_at_21.26.04.webp)

### u

- an unknown example

![Screenshot 2025-10-14 at 21.26.36](/blog/5-svm/JYOxjc55-Screenshot_2025-10-14_at_21.26.36.webp)

### $w^\intercal u \ge -b$

![Screenshot 2025-10-14 at 21.55.52](/blog/5-svm/gnnqKQQq-Screenshot_2025-10-14_at_21.55.52.webp)

- Project $u$ onto $w$

$$
\begin{cases}
positive \quad (w^\intercal u + b \ge 0) \\
negative \quad (otherwise)
\end{cases}
$$

---

## How to calculate w and b?

### Add more constraints

![Screenshot 2025-10-14 at 23.52.01](/blog/5-svm/qtBzES-N-Screenshot_2025-10-14_at_23.52.01.webp)

$$
\begin{align*}
&w^\intercal x^+ + b \ge a \\
&w^\intercal x^- + b \le -a \\
&\text{Let y be an activation function}\\
&y =
\begin{cases}
+1 \quad \text{(for positive sample)}\\
-1 \quad \text{(for negative sample)}
\end{cases} \\
&y^+(w^\intercal x^+ + b) \ge a \\
&y^-(w^\intercal x^- + b) \ge a \\
\end{align*}
$$

$$
\begin{align*}
\implies &y^{(i)}(w^\intercal x^{(i)} + b) \ge a \\
 &y^{(i)}(w^\intercal x^{(i)} + b) = a \quad (\text{ for } x^{(i)} \text{ in gutter})

\end{align*}
$$

## Width of the Street

![Screenshot 2025-10-15 at 12.29.56](/blog/5-svm/4w5Za_Vb-Screenshot_2025-10-15_at_12.29.56.webp)

- Given that $y^{(i)}(w^\intercal x^{(i)} + b) = a$ for $x$ in gutter

$$
\begin{align*}
w &= \frac{w^\intercal}{||w||_2} (x^+ - x^-) \\
 &\because (x^+ \text{ and } x^- \text{ are both in the gutter}) \\
 &\therefore w^\intercal x^+ = a - b, w^\intercal x^- = -a-b\\
 &= \frac{2a}{||w||_2} \quad \\
\end{align*}
$$

$$
\begin{align*}
&\max_{a, b} \frac{2a}{||w||_2} \\
&\implies \max_{w, b} \frac{2a}{||w||_2} \\
&\implies \max_{w, b} \frac{a}{||w||_2} \\
&\implies \min_{w, b} \frac{||w||_2}{a} \quad s.t.\ y^{(i)}(w^\intercal x^{(i)} + b) \ge a\\
\end{align*}
$$

- Since $a$ is arbitrary, can normalize equations by $a$

$$
\min_{w, b} \frac{1}{2} ||w||^2_2,\ s.t. y^{(i)}(w^\intercal x^{(i)} + b) \ge1
$$

## Support Vectors

![clipboard.png](/blog/5-svm/E7droGoj-clipboard.webp)

- lies in:

 $$
 \begin{cases}
 w^\intercal x + b = 1 \\
 w^\intercal x + b = -1
 \end{cases}
 $$

- <mark> Under the KKT condition, only a few $\alpha_i$ can be non-zero </mark>

 $$
 \alpha_i^* g_i(w^*) = 0, i = 1, \dots, N
 $$

 where

 - $g_i(w^*) = 1 - y^{(i)}(w^\intercal x^{(i)} + b)$

![Screenshot 2025-10-16 at 13.49.50](/blog/5-svm/xrMwx4fH-Screenshot_2025-10-16_at_13.49.50.webp)

- Training data are called support vectors if their **$\alpha_i$ are non-zero**
- $\because$
 - only a few $\alpha_i$ can be non-zero
 - $y^{(i)}(w^\intercal x^{(i)} + b) = 1$ when $\alpha_i$ is non-zero
- $\therefore$
 - $b = y^{(t)} - w^\intercal x^{(t)} \quad (\alpha_t > 0)$

---

## Hard Margin SVM

- <mark> Assume that data are linearly separable </mark>

![Screenshot 2025-10-15 at 13.52.18](/blog/5-svm/QcaGIpVv-Screenshot_2025-10-15_at_13.52.18.webp)

$$
\argmin_{w, b} \frac{1}{2} ||w||^2_2 \\
s.t.\ y^{(i)}(w^\intercal x^{(i)} + b) \ge 1
$$

- This is a convex quadratic programming problem with linear constraints

> [!TIP]
>
> **What is Quadratic Programming?**
>
> - A type of mathematical optimization problem
> - Similar to linear programming but minimizes a quadratic function

## Soft Margin SVM

- In real-world data, there may be:
 - Overlapping classes
 - Noisy points
 - Outliers
- <mark> Assume that data are non-linearly separable </mark>
- Introduce a **trade-off parameter** between error and margin and **slack variables** to measure how much a point violates the margin constraint

![clipboard.png](/blog/5-svm/M9V8x-Cj-clipboard.webp)

$$
\begin{align*}
 &\argmin_{w, b, \xi} \frac{1}{2} ||w||^2_2 + C \sum^N_{i = 1} \xi_i\\
 &s.t.\ y^{(i)}(w^\intercal x^{(i)} + b) \ge 1 - \xi_i \quad (\xi_i \ge 0)
\end{align*}
$$

### **C**

![clipboard.png](/blog/5-svm/FiezulOA-clipboard.webp)

- regularization parameter
- tolerance controller for errors
- controlling the trade-off between large margin (generalization) and few margin violations (accuracy on training data)
- $C \rightarrow \infty$
 - Hard Margin SVM
 - Small C:
 - The optimizer allows larger $\xi_i$ tolerating misclassification to get a smoother margin.
 - Larger C:
 - The optimizer will do everything it can to make $\xi_i = 0$, even if it means a smaller margin

### $\xi_i$

- slack variables for each data point
- pay linear penalty if mistake

 $$
 \begin{align*}
 &\begin{cases}
 1 - y^{(i)}(w^\intercal x^{(i)} + b) \quad (y^{(i)}(w^\intercal x^{(i)}) + b < 1) \\
 0 \quad (y^{(i)}(w^\intercal x^{(i)}) \ge 1)
 \end{cases} \\
 &\implies max(0, 1 - y^{(i)}(w^\intercal x^{(i)} + b))
 \end{align*}
 $$

- Results for correction

 $$
 \begin{cases}
 \xi_i = 0 \quad \text{(correct, outside/on the margin)} \\
 0 < \xi_i < 1 \quad \text{(correct, inside the margin)} \\
 1 > \xi_i \quad \text{(misclassified, wrong side of the decision boundary)} \\
 \end{cases}
 $$

### New Optimization Problem

- Make the margin as large as possible
- Keep the total slack small

### Margin Support Vector

- $\xi_i = 0, y^{(i)} (w^\intercal x + b) = 1$
- don't contribute to objective but enforce constraints on solution
- correctly classified

---

## Digression to Lagrange Duality

### Primal Problem vs. Dual Problem

#### $\bullet$ The Primal Problem

- The SVM formulation expressed directly in terms of **weights ($w$)**, **bias ($b$)**, **slack variables ($\xi_i$)**
- It's <mark>primal</mark> because it directly optimizes the parameters of the model.

> [!CAUTION]
>
> It's difficult to compute when the feature space is large as you're optimizing over $w \in \R^d$

#### $\bullet$ The Dual Problem

- Use Lagrange multipliers $\alpha_i$ to handle the constraints
- Depends only on dot products between data points - allowing the kernel trick.
- $\alpha_i$ correspond to the **importance (weights)** of each training point

---

### From Primal to Dual

#### 1. The original (Soft-Margin) SVM Primal Problem

$$
\min_{\theta} f(\theta) \quad s.t. \ g_i(\theta) \le 0, h_i(\theta) = 0
$$

where

- $\theta = (w, b, \xi)$
- $f(\theta) = \frac{1}{2}||w||^2 + C \sum_i^N \xi_i$
- **Constraints**
 - $g_i(\theta) \le 0 \quad i = 1, \dots, k$
 - $h_i(\theta) = 0 \quad i = 1, \dots, l$

#### 2. Generalized Lagrangian:

$$
L(\theta, \alpha, \beta) = f(\theta) + \sum^k_{i = 1} \alpha_i g_i (\theta) + \sum^{l}_{i = 1} \beta_i h_i(\theta)
$$

#### 3. Derive the Re-written Primal

- Given $\alpha(\alpha_i \ge 0), \beta$: Lagrang multipliers.

$$
\begin{align*}
 &\max_{\alpha, \beta: \alpha_i \ge 0} L(\theta, \alpha, \beta) =
 \begin{cases}
 f(\theta) \quad (\text{if }\theta \text{ satisfies proimal constraints}) \\
 \infty \quad (otherwise)
 \end{cases} \\

 &\implies \min_\theta \max_{\alpha, \beta: \alpha_i \ge 0} L(\theta, \alpha, \beta) \quad \text{(Re-written primal)}
\end{align*}
$$

---

## Lagrange Duality

### $\bullet$ A Re-written Primal:

$$
\min_{\theta} \max_{\alpha, \beta: \alpha > 0} L(\theta, \alpha, \beta)
$$

### $\bullet$ Dual Optimization Problem

- The value of the dual problem is always the lower bound of the value of the primal problem

$$
\max_{\alpha, \beta: \alpha_i \ge 0} \min_{\theta} L(\theta, \alpha, \beta)
$$

### $\bullet$ Connection between Primal and Dual

#### Weak Duality

- Always holds

$$
\min_{\theta} \max_{\alpha, \beta: \alpha \ge 0} L(\theta, \alpha, \beta) \ge \max_{\alpha, \beta: \alpha_i \ge} \min_{\theta} L(\theta, \alpha, \beta)
$$

- When you minimize the parameters first and then find the maximized lagrange multipliers, you can never do worse than the other way round

#### Strong Duality

$$
\min_{\theta} \max_{\alpha, \beta: \alpha \ge 0} L(\theta, \alpha, \beta) = \max_{\alpha, \beta: \alpha_i \ge} \min_{\theta} L(\theta, \alpha, \beta)
$$

- Whenever **strong duality** holds, the **Karush-Kuhn-Tucker (KKT)** conditions are true for $\theta^*, \alpha^*, \beta^*$

## Karush-Kuhn-Tucker (KKT)

### Stationarity

$$
\frac{\partial}{\partial \theta_i} = L(\theta^*, \alpha^*, \beta^*) = 0
$$

- gradient equilibrium
- No more improvement condition

### Primal Feasibility

$$
g_i(\theta^*) \le 0, \quad h_j(\theta^*)
$$

- obey the original constraints

### Dual Feasibility

$$
\alpha_i^* \ge 0
$$

- obey the dual constraints
- No **negative penalties**

### Complementary Slackness

$$
\alpha_i^* g_i(\theta^*) = 0
$$

- If a constraint is active $g_i(\theta^*) = 0$
 - $\alpha_i^*$ may be positive
- If a constraint is inactive $g_i(\theta^*) < 0$
 - $\alpha^*_i$ must be zero

| KKT Condition | Meaning in SVM |
| ----------------------- | --------------------------------------------------------------------------- |
| Stationarity | $\cdot w = \sum_i \alpha_i y_i x_i \\ \cdot \sum_i \alpha_i y_i = 0$ |
| Primal feasibility | $\cdot y_i(w^\top x_i + b) - 1 + \xi_i \ge 0 \\ \cdot \xi_i \ge 0$ |
| Dual feasibility | $\alpha_i \ge 0$ |
| Complementary slackness | $\cdot \alpha_iy_i(w^\top x_i + b) - 1 + \xi_i = 0 \\ \cdot \mu_i\xi_i = 0$ |

---

## How to Minimize without thinking about the constraints?

$$
L(w, b, \alpha) = \frac{1}{2} ||w||^2_2 + \sum^N_{i= 1} \alpha_i (1- y^{(i)}(w^\intercal x^{(i)} + b ))
$$

### 1. Minimize $L(w, b, \alpha)$ w.r.t. $w, b$

$$
\begin{align*}
&\frac{\partial L(w, b, \alpha)}{\partial w} = 0 \\
& w + \sum^N_{i = 1} - \alpha_i y^{(i)}x^{(i)} = 0 \\
& w = \sum^N_{i = 1} \alpha_i y^{(i)}x^{(i)}
\end{align*}
$$

$$
\begin{align*}
&\frac{\partial L(w, b, \alpha)}{\partial b} = 0 \\
& \sum^N_{i = 1} - \alpha_i y^{(i)} = 0 \\
& \sum^N_{i = 1} \alpha_i y^{(i)} = 0
\end{align*}
$$

### 2. Plug them back to derive SVM Lagrangian

$$
\begin{align*}
&L(w, b, \alpha) \\
&= \frac{1}{2} \left(\sum^N_{i = 1} \alpha y^{(i)} x^{(i)} \right)^\intercal \left(\sum^N_{j = 1} \alpha y^{(i)} x^{(i)} \right) + \sum^N_{i = 1} \alpha - \sum^{N}_{i = 1} \alpha_i y^{(i)} \left(\sum^{N}_{j = 1}\alpha_j y^{(j)}x^{(j)}\right) - \sum^N_{i = 1} \alpha_i y^{(i)}b \\
&=-\frac{1}{2} \sum^N_{i=1}\sum^N_{j=1} \alpha_i \alpha_j y^{(i)}y^{(j)} x^{(i)\intercal}x^{(j)} + \sum^N_{i = 1} \alpha_i
\end{align*}
$$

### 3. Derive Hard Margin SVM Dual

$$
\max_{\alpha} \sum^N_{i = 1} \alpha_i - \frac{1}{2} \sum^N_{i = 1} \sum^N_{j = 1} \alpha_i \alpha_j y^{(i)}y^{(j)}x^{(i)\intercal}x^{(j)} \\
s.t.\quad \alpha_i \ge 0 \quad (i = 1, \dots, N), \quad \sum^N_{i = 1} \alpha_j y^{(j)} = 0
$$

- Dual problem is also QP. Its solution gives a global maximum of $\alpha^*$
- $w^*$ can be recovered
 $$
 w^* = \sum^{N}_{i = 1} \alpha_i^* y^{(i)}x^{(i)}
 $$
- Dependence

 $$
 \begin{cases}
 \text{dependent on }(x^{(i)}, y^{(i)}) \quad (\alpha^* > 0) \\
 \text{independent of other samples} \quad (\alpha_i^* = 0)
 \end{cases}
 $$

### 4. Derive Soft Margin SVM Dual

$$
\max_{\alpha \ge 0} \sum^N_{i = 1} \alpha_i - \frac{1}{2} \sum^N_{i = 1} \sum^N_{j = 1} \alpha_i \alpha_j y^{(i)}y^{(j)}x^{(i)\intercal}x^{(j)} \\
s.t.\quad C \ge \alpha_i \ge 0 \quad (i = 1, \dots, N), \quad \sum^N_{i = 1} \alpha_j y^{(j)} = 0
$$

- It's pretty much the same but we introduce an upper bound $C$ for the $\alpha_i$ term

## Results: Primal ↔ Dual (Hard vs. Soft) + Prediction

### Summary Table

| **Variant** | **Objective Function** | **Constraints** | **Solution / Prediction** | **KKT Interpretation** |
| -------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Hard-Margin (Primal)** | $\min_{w,b} \tfrac{1}{2}\|w\|^2$ | $y_i(w^\top x_i + b) \ge 1$ | Margin $= \tfrac{2}{\|w\|}$ | — |
| **Hard-Margin (Dual)** | $\max_{\alpha \ge 0} \sum_i \alpha_i - \tfrac{1}{2}\sum_{i,j}\alpha_i\alpha_j y_i y_j\, x_i^\top x_j$ | $\sum_i \alpha_i y_i = 0$ | $w^* = \sum_i \alpha_i^* y_i x_i$ | $\alpha_i > 0 \Rightarrow y_i(w^\top x_i + b) = 1$ |
| **Soft-Margin (Primal)** | $\min_{w,b,\xi} \tfrac{1}{2}\|w\|^2 + C\sum_i \xi_i$ | $y_i(w^\top x_i + b) \ge 1 - \xi_i,\ \xi_i \ge 0$ | Equivalent to minimizing hinge loss $\tfrac{1}{2}\|w\|^2 + C\sum_i \max(0,1-y_i f(x_i))$ | — |
| **Soft-Margin (Dual)** | $\max_{0 \le \alpha_i \le C} \sum_i \alpha_i - \tfrac{1}{2}\sum_{i,j}\alpha_i\alpha_j y_i y_j\, x_i^\top x_j$ | $\sum_i \alpha_i y_i = 0$ | $w^* = \sum_i \alpha_i^* y_i x_i$ | $\alpha_i = 0 \Rightarrow y_i f(x_i) > 1$ <br> $0<\alpha_i<C \Rightarrow y_i f(x_i) = 1$ <br> $\alpha_i=C \Rightarrow y_i f(x_i) < 1$ |
| **Kernelized Dual (Both)** | Replace $x_i^\top x_j$ with $K(x_i, x_j)$ | Same constraints | $f(x) = \text{sign}\!\big(\sum_i \alpha_i^* y_i\, K(x_i, x) + b^*\big)$ | Only support vectors ($\alpha_i^* > 0$) contribute |

---

### Recovering $w$ and $b$

- **Weight vector (linear case):**

 $$
 w^* = \sum_i \alpha_i^* y_i x_i
 $$

- **Bias term:** 
 For any support vector $x_t$ with $0 < \alpha_t^* < C$:

 $$
 b^* = y_t - \sum_j \alpha_j^* y_j K(x_j, x_t)
 $$

 If multiple margin SVs exist, take the average $b^*$.

---

### KKT Conditions (Soft-Margin)

| **Condition** | **Mathematical Form** | **Meaning in SVM** |
| --------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------- |
| **Stationarity** | $w = \sum_i \alpha_i y_i x_i$, $\sum_i \alpha_i y_i = 0$, $C - \alpha_i - \mu_i = 0$ | Gradient equilibrium |
| **Primal Feasibility** | $y_i(w^\top x_i + b) \ge 1 - \xi_i$, $\xi_i \ge 0$ | Must satisfy primal constraints |
| **Dual Feasibility** | $\alpha_i \ge 0$, $\mu_i \ge 0$ | Non-negative multipliers |
| **Complementary Slackness** | $\alpha_i [1 - \xi_i - y_i(w^\top x_i + b)] = 0$, $\mu_i \xi_i = 0$ | Active constraints ↔ positive multipliers |

### Intepretation

| **Condition** | **$y_i f(x_i)$** | **Classification** | **Margin Status** | **Slack Variable $\xi_i$** | **Interpretation** |
| -------------------------------- | -------------------- | ------------------ | -------------------------- | -------------------------- | --------------------------------------------- |
| **Outside margin** | $> 1$ | ✅ Correct | Outside margin | $\xi_i = 0$ | Confidently correct (no penalty) |
| **On margin** | $= 1$ | ✅ Correct | On boundary | $\xi_i = 0$ | Support vector (defines margin) |
| **Inside margin (correct side)** | $0 < y_i f(x_i) < 1$ | ✅ Correct | Inside margin | $0 < \xi_i < 1$ | Correct but too close to boundary (penalized) |
| **Misclassified (wrong side)** | $y_i f(x_i) < 0$ | ❌ Incorrect | Inside margin (wrong side) | $\xi_i > 1$ | Misclassified (heavily penalized) |
---

### Final Decision Function

- **Linear Case:**

 $$
 f(x) = \text{sign}\!\left(\sum_i \alpha_i^* y_i\, x_i^\top x + b^*\right)
 $$

- **Kernelized Case:**
 $$
 f(x) = \text{sign}\!\left(\sum_i \alpha_i^* y_i\, K(x_i, x) + b^*\right)
 $$

---

### Margin and Limit Behavior

- **Margin width:** $\frac{2}{\|w^*\|}$
- **As $C \to \infty$:** Soft-margin SVM → Hard-margin SVM (if data are separable)
- **As $C \to 0$:** Margin dominates, high tolerance for error (underfitting)

---

### Intuitive Summary

- **Hard-Margin:** No misclassification; all points must be correctly separated.
- **Soft-Margin:** Allows some violations; balances accuracy and generalization via $C$.
- **Support Vectors:** Points with $\alpha_i > 0$ define the decision boundary.
- **Dual Form:** Enables kernel trick; optimization depends only on dot products or $K(x_i, x_j)$.

---

## Implementation

### Helper

```python
def poly_implementation(x, y, degree):
 assert x.size() == y.size(), 'The dimensions of inputs do not match!'
 with torch.no_grad():
 return (1 + (x * y).sum()).pow(degree)

def poly(degree):
 return lambda x, y: poly_implementation(x, y, degree)

def rbf_implementation(x, y, sigma):
 assert x.size() == y.size(), 'The dimensions of inputs do not match!'
 with torch.no_grad():
 return (-(x - y).norm().pow(2) / 2 / sigma / sigma).exp()

def rbf(sigma):
 return lambda x, y: rbf_implementation(x, y, sigma)

def xor_data():
 x = torch.tensor([[1, 1], [-1, 1], [-1, -1], [1, -1]], dtype=torch.float)
 y = torch.tensor([1, -1, 1, -1], dtype=torch.float)
 return x, y
```

### SVM

```python
def svm_solver(
 x_train, y_train, lr, num_iters, kernel=hw3_utils.poly(degree=1), c=None
):
 """
 Computes an SVM given a training set, training labels, the number of
 iterations to perform projected gradient descent, a kernel, and a trade-off
 parameter for soft-margin SVM.

 Arguments:
 x_train: 2d tensor with shape (N, d).
 y_train: 1d tensor with shape (N,), whose elememnts are +1 or -1.
 lr: The learning rate.
 num_iters: The number of gradient descent steps.
 kernel: The kernel function.
 The default kernel function is 1 + <x, y>.
 c: The trade-off parameter in soft-margin SVM.
 The default value is None, referring to the basic, hard-margin SVM.

 Returns:
 alpha: a 1d tensor with shape (N,), denoting an optimal dual solution.
 Initialize alpha to be 0.
 Return alpha.detach() could possibly help you save some time
 when you try to use alpha in other places.
 """
 # TODO
 N = x_train.shape[0]
 alpha = torch.zeros(N, requires_grad=True)
 Y = torch.diag(y_train)

 # Build the kernel beforehand
 K = create_kernel(x_train, x_train, N, N, kernel)
 for _ in range(num_iters):
 # The matrix form of the original dual problem: sum(alpha) - alpha^T(YKY)alpha
 L = alpha.sum() - 0.5 * alpha @ (Y @ K @ Y) @ alpha
 L.backward()

 # update alpha
 with torch.no_grad():
 alpha += lr * alpha.grad

 # clamp the range
 if c:
 alpha = torch.clamp_(
 alpha,
 min=0,
 max=c,
 )
 else:
 alpha = torch.clamp_(
 alpha,
 min=0,
 )
 alpha.grad.zero_()
 alpha.requires_grad_()

 return alpha.detach()


def svm_predictor(alpha, x_train, y_train, x_test, kernel=hw3_utils.poly(degree=1)):
 """
 Returns the kernel SVM's predictions for x_test using the SVM trained on
 x_train, y_train with computed dual variables alpha.

 Arguments:
 alpha: 1d tensor with shape (N,), denoting an optimal dual solution.
 x_train: 2d tensor with shape (N, d), denoting the training set.
 y_train: 1d tensor with shape (N,), whose elements are +1 or -1.
 x_test: 2d tensor with shape (M, d), denoting the test set.
 kernel: The kernel function.
 The default kernel function is 1 + <x, y>.

 Return:
 A 1d tensor with shape (M,), the outputs of SVM on the test set.
 """
 N = x_train.shape[0]
 M = x_test.shape[0]

 K_train = create_kernel(x_train, x_train, N, N, kernel)
 K_test = create_kernel(x_train, x_test, N, M, kernel)

 support_idx = torch.where(alpha > _EPS)[0]
 if len(support_idx) == 0:
 return torch.zeros(M)

 min_alpha_idx = support_idx[torch.argmin(alpha[support_idx])]

 # y_support - \sum^{N}_{j = 1} \alpha_j * y_j * K(x_j, x_k)
 b = y_train[min_alpha_idx] - (alpha * y_train * K_train[:, min_alpha_idx]).sum()

 # Compute predictions: f(x) = \sum_{i=1}^{N} \alpha_i * y_i * K(x_i, x) + b
 f = torch.sum((alpha * y_train).unsqueeze(1) * K_test, dim=0) + b
 return torch.sign(f)
```

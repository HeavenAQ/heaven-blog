---
title: 'Perceptron'
description: "Detailed explanations on the perceptron algorithm"
pubDate: '2025-11-05'
heroImage: '/placeholder-hero.jpg'
categories: ['Machine Learning', 'Algorithm']
tags: ['ML', 'AI' ]
---

## Linear Separability

- A set of examples is `linearly separable` if there exists a linear decision boundary that can separate the points

## Perceptron

![clipboard.png](inkdrop://file:MNGuE-0f)

- `Perceptron` is a **linear classifier** that only converges when data is **linearly separable**.
- **Dataset:**
  - $D = \{{x^{(i)}, y^{(i)}}\}^{i}_{N}$
- **Assumptions:**
  - Binary classification: $y \in \{-1, +1\}$
  - Data is linearly separable

> [!NOTE]
>
> The only `hyperparameter` in the perceptron is the max number of iterations
>
> - Too many iterations may lead to `overfit`
> - Too few iterations may lead to `underfit`

## Hyperplane

$$
\begin{align*}
H &= \{x: w^\intercal x + w_0 = 0\} \\
  &\Rightarrow w \cdot x = 0
\end{align*}
$$

- The `bias` term $w_0$ is needed to have a non-zero `threshold` that allows the activation value to be increased by some fixed value b.

## Positive Example

$$
w^\intercal x + w_0 > 0
$$

## Negative Example

$$
w^\intercal x + w_0 < 0
$$

## Classifier

$$
h(x) = sign(w^\intercal x + w_0)
$$

## Updating w

- What the perceptron does.

$$
w \leftarrow w + y^{(i)}x^{(i)}
$$

> [!IMPORTANT]
>
> **Why is $w$ perpendicular to the hyperplane**
>
> - $w \cdot x = 0$ means that all points of $x$ lies on the hyperplane
> - As $w \cdot x = 0$ implies perpendicularity, $w$ and the hyperplane are perpendicular

- Example
  ![clipboard.png](inkdrop://file:cRSPXnoK)

## Notational Hack

$$
w^\intercal x + w_0 \Rightarrow w^\intercal x
$$

- As we rewrite the notations as follows:

  1. $$
     x =
     \begin{bmatrix}
     x_1 \\
     \vdots \\
     x_d
     \end{bmatrix}
     \Rightarrow
     \begin{bmatrix}
     \uparrow \\
     x \\
     \downarrow \\
     1
     \end{bmatrix}
     $$
  2. $$
     w =
     \begin{bmatrix}
     w_1 \\
     \vdots \\
     w_d
     \end{bmatrix}
     \Rightarrow
     \begin{bmatrix}
     \uparrow \\
     w \\
     \downarrow \\
     w_0
     \end{bmatrix}
     $$

- The result of this rewrite (increment dimensionality by 1)

  ![clipboard.png](inkdrop://file:7fwg8okn)

## Perceptron Algorithm

### Algorithm

$$
\begin{array}{l}
\hline
{\text{PerceptronTrain}}(D, MaxIter) \\
\hline
\begin{array}{ll}
1: & w_d \leftarrow 0, \text{ for all } d = 1 \ldots D & \text{// initialize weights} \\
2: & b \leftarrow 0 & \text{// initialize bias} \\
3: & \textbf{for } iter = 1 \ldots MaxIter \textbf{ do} \\
4: & \quad \textbf{for all } (x,y) \in D \textbf{ do} \\
5: & \quad \quad a \leftarrow \sum_{d=1}^D w_d x_d + b & \text{// compute activation for this example} \\
6: & \quad \quad \textbf{if } ya \leq 0 \textbf{ then} \\
7: & \quad \quad \quad w_d \leftarrow w_d + y x_d, \text{ for all } d = 1 \ldots D & \text{// update weights} \\
8: & \quad \quad \quad b \leftarrow b + y & \text{// update bias} \\
9: & \quad \quad \textbf{end if} \\
10: & \quad \textbf{end for} \\
11: & \textbf{end for} \\
12: & \textbf{return } w_0, w_1, \ldots, w_D, b \\
\end{array} \\
\hline
\end{array}
$$

### Python

```python
def perceptron(D: DataSet, w: WeightVector):
  # init
  w = [0, 0 ... 0].T
  while True:
    # indicate whether w is changed
    changed = False
    for i in range(N):
      # at init step or misclassified
      if y[i] * (w @ x[i]) <= 0:
        w = w + y[i] * x[i] # update the weight vector
        changed = True
    if not changed:
      break
```

### Why $y^{(i)}(w^\intercal x^{(i)}) \le 0$?

![clipboard.png](inkdrop://file:MEEQViOp)

> [!NOTE]
>
> $y \in \{1, -1\}$, which is a scalar not a vector

- `Error-driven Updating`: Only update the weights if a prediction is wrong
- If the updated w $w_{new}$ leads to the correct classification of the input

  $$
  \begin{align*}
  &y(w_{new}^\intercal x ) \\
  &= y((w + yx)^\intercal x) \\
  &= y(w^\intercal x + yx^\intercal x) \\
  &= y(w^\intercal x) + yyx^\intercal x \\
  &= y(w^\intercal x) + ||x||^2 \\
  &> y(w^\intercal x)
  \end{align*}
  $$

- $(w^\intercal x^{(i)})$
  - $w\cdot x^{(i)}> 0$
    - The input vector points to the same general direction as the weight vector
  - $w \cdot x^{(i)} < 0$
    - The input vector points to the opposite direction to the weight vector
  - $w \cdot x = 0$
    - The input vector is perpendicular to the weight vectorx
- $y^{(i)}$
  - The true label
  - $y^{(i)} \times w \cdot x > 0 \iff sign(y) = sign(w \cdot x)$
  - $y^{(i)} \times w \cdot x \le 0 \iff sign(y) \ne sign(w \cdot x)$

## What does a perceptron update do?

- Given $y \in \{1, -1\}$

$$
\begin{align*}
w &\leftarrow w + y^{(i)}x^{(i)} \\
  &\leftarrow w \pm x^{(i)}
\end{align*}
$$

> [!NOTE]
>
> - Update of $w$: is increased by $y^{(i)}x^{(i)}$
> - Bias is updated by $y^{(i)}$

### Mistake on positive sample ($y = 1$ and $w^\intercal x \le 0$)

- Increase the new weight $w_{new}$, so that it's greater than the original one

$$
\begin{align*}
w^\intercal_{new} x &= (w + x)^\intercal x \\
                    &= w^\intercal x + x^\intercal x \\
                    &> w^\intercal x
\end{align*}
$$

### Mistake on negative sample ($y = -1$ and $w^\intercal x \ge 0$)

- Decrease the new weight $w_{new}$, so that it's greater than the original one

$$
\begin{align*}
w_{new}^\intercal x &= (w - x)^\intercal x \\
                    &= w^\intercal x - x^\intercal x \\
                    &< w^\intercal x
\end{align*}
$$

## How often can a perceptron misclassify a point x repeatedly

- Assume $K$ updates have been done

$$
\begin{align*}
&y(w + kyx)^\intercal x \le 0 \\
&\Rightarrow y(w^\intercal x) + k ||x||^2 \le 0 \\
&\Rightarrow k ||x||^2 \le -y(w^\intercal x) \\
&\Rightarrow k \le -y(w^\intercal x) / ||x||^2
\end{align*}
$$

## Perceptron Performance

- $\exist w^*$ such that
  $$
  y^{(i)}(w^{*\intercal})x^{(i)} > 0, \forall (x^{(i)}), y{(i)} \in D
  $$
- Rescale $w^*$ and each data point such that
  $$
  \begin{align*}
  &\bullet ||w^*|| = 1 \\
  &\bullet ||x^{(i)}|| \le 1, \forall x^{(i)} \in D
  \end{align*}
  $$
- Margin of a hyperplane $\gamma$ is defined as:
  $$
  \min|w^{*T}x^{(i)}|, \forall x^{(i)} \in D
  $$
  - **Formal Definition:**
    - Margin
      $$
      \gamma = margin(\mathbf{D}, w) = \begin{cases}
      \min_{(x,y) \in \mathbf{D}} y(w \cdot x) & \text{if } w \text{ separates } \mathbf{D} \\
      -\infty & \text{otherwise}
      \end{cases}
      $$
    - Margin of a data set
      - The margin of dataset **D** is the supremum (maximum) over all possible weight vectors **w** of the margin function."
      - In this case `maximum` and `supremum` only differ when $margin(\mathbf{D}, w)$ produces $-\infty$
        ![clipboard.png](inkdrop://file:qIC2jhuO)
        $$
        \gamma_D = \sup_{w, b}\{margin(\mathbf{D, w)}\}
        $$

> [!IMPORTANT]
> If all the conditions above hold, the perceptron algorithm makes at most
>
> $$
> \frac{1}{\gamma^2}
> $$
>
> updates.

## Proof

- Given that:
  - $yw^\intercal x \le 0$ holds if $x$ is misclassified by $w$
  - $yw^{*\intercal} x > 0$ holds as $w^*$ leads to a separating hyperplane for the correct classification.

#### $\bullet$ Effect of an update on $w^\intercal w^*:$

- For each update, $w^\intercal w^*$ grows at least by $\gamma$
  $$
  \begin{align*}
  w_{new}^\intercal w^* &= (w + yx)^\intercal w^* \\
                        &= w^{\intercal}w^* + yw^{*\intercal}x \\
                        &\because sign(y) = sign(w^{*\intercal} x) \\
                        &\because  yw^{*T}x = |w^{*\intercal}x| \ge \gamma \\
                        &\ge w^\intercal w^* + \gamma \quad (\because yw^{*\intercal}x \ge \gamma)
  \end{align*}
  $$

#### $\bullet$ Effect of an update on $w^{\intercal}w:$

- For each update, $w^\intercal w$ grows at most $1$
  $$
  \begin{align*}
  w_{new}^\intercal w_{new} &= (w + yx)^\intercal (w + yx)\\
                            &= w^\intercal w + 2yw^\intercal x + y^2x^\intercal x \\
                            &\le w^\intercal w + 1 \quad (\because yw^Tx \le 0,\ x^\intercal x \le 1)
  \end{align*}
  $$

#### $\bullet$ Suppose we have M updates

$$
\begin{align*}
M\gamma &\leq w^T w^* \\
       &= |w^T w^*| \\
       &\leq ||w|| \cdot ||w^*|| \quad \text{(Cauchy-Schwarz Inequality)} \\
       &= ||w|| \cdot 1 \quad \text{(since } ||w^*|| = 1\text{)} \\
       &= ||w|| \\
       &= \sqrt{w^\intercal w} \\
       &\le \sqrt{M} \quad \text{(by the effect of an update on } w^\intercal w) \\
       &\Rightarrow M\gamma \le \sqrt{M} \\
       &\Rightarrow M^2\gamma^2 \le M \\
       &\Rightarrow M \le \frac{1}{\gamma^2}
\end{align*}
$$

![clipboard.png](inkdrop://file:4YmN9Coa)

## Improved Generalization: Voting and Averaging

> [!CAUTION]
> The key issue of the initial perceptron is that it counts later points more than it counts earlier points.

> [!TIP]
> Give more say to **weight vectors** that survive **long enough**

### Voted Perceptron

- Each **weight vector** has its own **counter for survival times**
- $w^{(1)},\ \dots,\ w^{(k)}$: $K + 1$ weight vectors with bias $w_0$ included
- $c^{(1)},\ \dots,\ c^{(k)}$: survival times for each vector

$$
\hat{y} = sign(\sum_{k=1}^{K} c^{(k)} \times sign(w^{(k)} \cdot \hat{x}))
$$

### Averaged Perceptron

- At test time, you predict according to the `average weight vector` rather than the voting.

$$
\begin{align*}

\hat{y} &= sign(\sum_{k=1}^{K} c^{(k)} \times (w^{(k)} \cdot \hat{x})) \\
        &= sign(\sum_{k=1}^{K} c^{(k)} \times (w^{(k)}) \cdot \hat{x}) \\

\end{align*}
$$

#### Algorithm

$$
\begin{array}{l}
\hline
{\text{AveragedPerceptronTrain}}(D, MaxIter) \\
\hline
\begin{array}{ll}
1: & w_d \leftarrow \langle\vec{\scriptstyle 0},\ \dots,\ \vec{\scriptstyle 0}\rangle& \text{// initialize weights} \\
2: & u \langle \vec{\scriptstyle 0},\ \dots,\ \vec{\scriptstyle 0}\rangle& \text{// initialize cached weights} \\
3: & \textbf{for } iter = 1 \ldots MaxIter \textbf{ do} \\
4: & \quad \textbf{for all } (x,y) \in D \textbf{ do} \\
5: & \quad \textbf{if } y(w \cdot x) \le  \vec{\scriptstyle 0}\ then\\
6: & \quad \quad w \leftarrow w + yx \\
5: & \quad \quad u \leftarrow u + ycx \\
9: & \quad \quad \textbf{end if} \\
9: & \quad c \leftarrow c + 1 \\
10: & \quad \textbf{end for} \\
11: & \textbf{end for} \\
12: & \textbf{return } w - \frac{1}{c} u \\ \\
\end{array} \\
\hline
\end{array}
$$

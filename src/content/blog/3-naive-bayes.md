---
categories:
- Machine Learning
- lectures
createdAt: '2025-09-21'
description: '- **Dataset $\mathcal{D}$**: i.i.d (independent and identically distributed)
 drawn from some unknonw distribution'
tags:
- Machine Learning
- Machine Learning
- lectures
- AI
title: 3. Naive Bayes
---

# 3. Naive Bayes

## MLE and MAP

### Components

- **Dataset $\mathcal{D}$**: i.i.d (independent and identically distributed) drawn from some unknonw distribution
- **$P_\theta(X, Y)$** approximates this known distribution

### MLE (Maximum Likelihood Estimate)

- Choose $\theta$ that maximizes probability of observed data $\mathcal{D}$

$$
\hat{\theta}_{MLE} = \argmax_{\theta}P( \mathcal{D} | \theta)
$$

### MAP (Maximum A Priori)

- Choose $\theta$ that is most probable **given prior proability** and **observed data**.

$$
\begin{align*}
\hat{\theta}_{MAP} &= \argmax_{\theta} P(\theta | \mathcal{D}) \\
 &= \argmax_{\theta} \frac{P(\theta)P(\mathcal{D} | \theta)}{P(\mathcal{D})} \\
 &\propto \argmax_{\theta} P(\mathcal{D} | \theta) P(\theta) \quad (P(\mathcal{D})\text{ does not depend on }\theta)
\end{align*}
$$

### Example

- A dataset $\mathcal{D}$ of i.i.d. flips produces $\alpha_H$ heads and $\alpha_T$ tails.
- **MLE** (Exactly the frequency of head):

 $$
 \begin{align*}
 \hat{\theta}_{MLE} &= \argmax_{\theta}P( \mathcal{D}|\theta) \\
 &= \frac{\alpha_H}{\alpha_H + \alpha_T}
 \end{align*}
 $$

- **MAP**

 $$
 \begin{align*}
 \hat{\theta}_{MAP} &= \argmax_{\theta}P(\theta | \mathcal{D}) \\
 &= \frac{\alpha_H + \beta_H - 1}{(\alpha_H + \beta_H - 1)(\alpha_T + \beta_T - 1)}
 \end{align*}
 $$

> [!NOTE]
>
> $\beta_H - 1$ and $\beta_T - 1$ are for the halluciated heads and tails.

### Example 2

- **$\mathcal{D}$:** Dataset of i.i.d. rolls of an M-sided die.
- **$P(\mathcal{D}|\theta)$:** Likelihood of Mutinomial $\theta$ ~ $\{\theta_1, \theta_2, \dots, \theta_M\}$

 $$
 P(\mathcal{D} | \theta) \propto \theta^{\alpha_1}_1 \cdot \theta^{\alpha_2}_2 \cdots \theta^{\alpha_M}_M
 $$

- **$\theta_m$:** Probability of rolling side m

#### $\bullet$ The Prior

_Dirichlet Distribution is used in this case_

$$
P(\theta) = \frac{\theta^{\beta_1 - 1}_1\theta^{\beta_2 - 1}_2 \cdots \theta^{\beta_M - 1}_M}{B(\beta_1, \dots, B_M)} \sim Dirichlet(\beta_1, \dots, \beta_M)
$$

where $B(\beta_1, \dots, B_M)$ is the multivariate Beta function

#### $\bullet$ The Posterior

$$
P(\theta | \mathcal{D}) \propto P(\mathcal{D} | \theta) P(\theta) \sim Dirichlet(\alpha_1 + \beta_1, \dots, \alpha_M + \beta_M)
$$

#### $\bullet$ MLE

$$
\hat{\theta}^{MLE}_{m} = \frac{\alpha}{\sum^M_{v = 1}\alpha_v}
$$

#### $\bullet$ MAP

$$
\hat{\theta}^{MAP}_{m} = \frac{\alpha_m + \beta_m - 1}{\sum^M_{v = 1}(\alpha_v + \beta_v - 1)}
$$

> [!TIP]
> You can find the full derivations of MLE and MAP in [MLE and MAP Proofs](inkdrop://note/NtAnFF5a)

## How to Choose Prior Distribution $P(\theta)$

- This requires prior knowledge about domain (i.e. unbiased coin)
- A mathematically convenient form (e.g. conjugate ):
 - If $P(\theta)$ is conjugate prior for $P(\mathcal{D} \mid \theta)$, then posterior has the same form as prior

$$
P(\theta \mid \mathcal{D}) \;\; \propto \;\; P(\mathcal{D} \mid \theta) \times P(\theta)
$$

| Posterior | Likelihood | Prior |
| ------------- | ----------- | --------- |
| **Beta** | Bernoulli | Beta |
| **Beta** | Binomial | Beta |
| **Dirichlet** | Multinomial | Dirichlet |
| **Gaussian** | Gaussian | Gaussian |

## MLE Visualization

> [!NOTE]
>
> **INDICATOR FUNCTION**
>
> $$
> \mathbb{I} (e) = \begin{cases}1 \quad (\text{e is true}) \\ 0 \quad (\text{e is false})\end{cases}
> $$

### MLE

$$
\hat P^{MLE} (X = x) = \frac{\sum^N_{i = 1} \mathbb{I}(x^{(i)} = x)}{N}
$$

![Screenshot 2025-09-21 at 16.01.28](/blog/3-naive-bayes/jxlcdrCK-Screenshot_2025-09-21_at_16.01.28.webp)

### Given $\mathcal{D} \sim P(Y, X)$, Get the MLE of $P(Y | X)$

$$
\begin{align*}
 &\hat P^{MLE}(Y = y | X = x) \\
 &= \frac{P^{MLE}(Y = y, X = x)}{P^{MLE}(X = x)} \\
 &= \frac{\sum^N_{i = 1} \mathbb{I}(x^{(i)} = x, y^{(i)} = y)}{\sum^N_{i = 1} \mathbb{I}(x^{(i)} = x)} \\
\end{align*}
$$

![Screenshot 2025-09-21 at 16.05.04](/blog/3-naive-bayes/G2vV2Tm5-Screenshot_2025-09-21_at_16.05.04.webp)

### D-dimensional Space

$$
\frac{\sum^N_{i = 1} \mathbb{I}(x^{(i)}_1 = x_1, x^{(i)}_2 = x_2, \dots, x^{(i)}_d = x_d y^{(i)} = y)}{\sum^N_{i = 1} \mathbb{I}(x^{(i)}_1 = x_1, x^{(i)}_2 = x_2, \dots, x^{(i)}_d = x_d)} \\
$$

> [!CAUTION]
>
> It is only good if there are many training examples with the same identical features as x for high dimensional space

> [!IMPORTANT]
>
> Suppose $X_1, \dots, X_d$ and $Y$ are boolean random variables. How many parameters must we estimate? 
> $$Ans: 2^d$$ cuz each variable has 2 possible values

---

## Bayes Rule

$$
\begin{align*}
&(\forall k, j)\quad \\
&P(Y = y_k | X = x_j)\\
&= \frac{P(X = x_j | Y = y_k) P(Y = y_k)}{P(X = x_j)} \\
&= \frac{P(Y = y_k | X = x_j) P(X = x_j)}{P(X = x_j)}
\end{align*}
$$

### Unfortunately Bayes' Rule Alone Does not Reduce the Parameters Needed

#### $\bullet$ Rewrite $P(Y \mid X_1, \dots, X_d)$ with Bayes' Rule

$$
\begin{align*}
 P(Y \mid X_1, \dots, X_d) = \frac{P(X_1, \dots, X_d \mid Y)P(Y)}{P(X_1, \dots, X_d)}
\end{align*}
$$

#### $\bullet$ Parameter Counts

- $P(X_1, \dots, X_d \mid Y = 1): 2^d - 1$
- $P(X_1, \dots, X_d \mid Y = 0): 2^d - 1$
- $P(Y): 1$

> [!CAUTION]
>
> Therefore, the total of the parameters needed for $P(X\mid Y)$ with Bayes' Rule is $2(2^d - 1) + 1$, which is more than the original $2^d$

## Naive Bayes

### Assumption

$$
P(X_1, \dots, X_d \mid Y) = \prod^d_{j = 1} P(X_j \mid Y)
$$

where

- $X_1, \dots, X_d$ are **conditionally independent** given $Y$

### What Is Conditional Independence?

$$
\forall (j, k, t), P(X = x_j \mid Y = Y_k, Z = Z_t) = P(X = x_j \mid Z = Z_t)
$$

- $X$ and $Y$ are **conditionally independent** given $Z$

### Naive Bayes Successfully Reduces the Number of Parameters Needed

#### $\bullet$ Rewrite with Naive Bayes $P(Y \mid X_1, \dots, X_d)$

$$
P(Y \mid X_1, \dots, X_d) = \frac{\prod^{d}_{j = 1} P(X_j \mid Y)P(Y)}{P(X_1, \dots, X_d)}
$$

#### $\bullet$ Parameter Counts

- $\prod^d_{j = 1} P(X_j \mid Y = 1): d$
- $\prod^d_{j = 1} P(X_j \mid Y = 0): d$
- $P(Y) = 1$

> [!TIP]
>
> The total number of parameters is brought down to $2d + 1$

### For Optimization

$$
\begin{align*}
&P(Y = y_k \mid X_1, \dots, X_d) \\
&= \frac{\prod^d_{j = 1} P(X_j \mid Y = y_k)P(Y = y_k)}{P(X_1, \dots, X_d)} \\
 &\propto P(Y) \prod^d_{j = 1} P(X_j \mid Y = y_k) \\
 &\Rightarrow Y_{new} \leftarrow \argmax_{y_k} (Y = y_k) \prod^d_{j = 1} P(X^{new}_j \mid Y = y_k) \quad \text{(Given a new instance)}
\end{align*}
$$

## Naive Bayes - Discrete Features

$$
\begin{align*}
X_j &\in \{1, 2, \dots, K_j\}, \forall j \in \{1, 2, \dots, d\} \\
Y &\in \{1, 2, \dots, C\} \\
P(X_j = k \mid Y = c) &= \theta_{jkc}
\end{align*}
$$

where

- $\sum^{K_j}_{k = 1} \theta_{jkc} = 1$

 $$
 \text{The sum of the probability of feature j equal to k given the label c is 1}
 $$

## Maximum Likelihood Estimates (MLE)

### Prior

$$
\begin{align*}
 \hat{\pi}^{MLE}_c &= \hat{P}^{MLE} (Y = c) \\
 &= \frac{\# \text{ of samples in class c}}{\# \text{ of samples}} \\
 &= \frac{\sum^{N}_{i = 1} \mathbb{I}\{y^{(i)} = c\}}{N}

\end{align*}
$$

#### hallucinated Prior

$$
\hat{\pi}^{MLE}_c = \frac{\sum^{N}_{i = 1} \mathbb{I}\{y^{(i)} = c\} + l}{N + lc}
$$

### Likelihood

$$
\begin{align*}
\hat{\theta}^{MLE}_{jkc} &= \hat{P}^{MLE}(X_j = k \mid Y = c) \\
 &= \frac{\# \text{ of samples with the label c and have feature }X_j = k}{\# \text{ of samples with the label c}} \\
 &= \frac{\sum^{N}_{i = 1} \mathbb{I}\{y^{(i)} = c \cap x^{(i)}_j = k\}}{\sum^{N}_{i = 1} \mathbb{I}\{y^{(i)} = c\}}
\end{align*}
$$

#### Hallucinated Likelihood

$$
\hat{\theta}^{MLE}_{jkc} = \frac{\sum^{N}_{i = 1} \mathbb{I}\{y^{(i)} = c \cap x^{(i)}_j = k\} + l}{\sum^{N}_{i = 1} \mathbb{I}\{y^{(i)} = c\} + lK_j}
$$

## Learning to Classify Documents: $P(Y \mid X)$

### Question

- Given a document of length $M$
- $Y$ discrete values
- $X = <X_1, \dots, X_d>$
- $\forall j \in \{1, 2, \dots, d\}$
- $X_j$ is a random variable describing:

 ```
 I am pleased to announce that Bob Frederking of the Language
 Technologies Institute is our new Associate Dean for Graduate
 Programs. In this role, he oversees the many issues that arise
 with our multiple masters and PhD programs. Bob brings to this
 positions considerable expereince with the masters and PhD
 programs in the LTI.

 I would like to thank Frank Pfenning, who has served ably in this
 role for the past two years.
 ```

### Answer

- $d:$ size of the vocab (assume that the word positions are independent)
- $X_j:$ the count of word $j$ in an email
- $M = \sum^d_{j = 1} X_j$

#### $\bullet$ Likelihood:

$$
P(X \mid M, Y = c) = \frac{M!}{X_1!X_2! \cdots X_d!} \prod_{j = 1}^{d} (\theta_{jc})^{X_j}
$$

where

- $\theta_{jc}$ is the probability of selecting word $j$
- $\sum^d_{j = 1} \theta_{jc} = 1$
- $\prod_{j = 1}^{d} (\theta_{jc})^{X_j}$:
 - The product of the probabilities $(\theta_{jc})$ of the number of times words $(X_j)$ occur in the document
 - The probability of a pattern occurs under label $Y = c$
- $\frac{M!}{X_1!X_2! \cdots X_d!}$:
 - $\frac{1}{X_1!X_2!\cdots X_d!}$: Cancel out the permutation of the same words
 - the permutation of the pattern

#### $\bullet$ MLE:

$$
\begin{align*}
\hat{\theta}_{jc}^{MLE} &= \frac{\# \text{of times word j appears in emails with label c}}{\# \text{of words in all emails with lable c}} \\
 &= \frac{\sum^N_{i = 1}\mathbb{I}\{y^{(i) } = c\}x_j^{(i)}}{\sum^{N}_{i = 1} \mathbb{I}\{y^{(i)} = c\}\sum^d_{v = 1} x_v^{(i)}} \\
\end{align*}
$$

#### $\bullet$ MAP:

$$
\hat{\theta}^{MAP}_{jc} = \frac{\sum^N_{i = 1}\mathbb{I}\{y^{(i) } = c\}x_j^{(i)} + \beta_{jc}}{\sum^{N}_{i = 1} \mathbb{I}\{y^{(i)} = c\}\sum^N_{v = 1}x^{(i)}_v + \sum^d_{v = 1}\beta_{vc}}
$$

> [!NOTE]
>
> - Here $\beta$ is for hallucination
> - $\beta = 1$ for Laplace smoothing

---

## Continuous Data

- For continuous data, we assume that the **Likelihood** follows the **Gaussian Distribution**

$$
P(Y = c \mid X_1, \dots, X_d) = \frac{P(Y = c)\prod^d_{j = 1} P(X_j\mid Y = c)}{\sum^C_{k = 1} P(Y = k)\sum^d_{j = 1} P(X_j \mid Y = k)}
$$

where

- $P(X_j \mid Y = c) \sim N(\mu, \sigma^2)$

### Normal Distribution

$$
p(x) \sim N(\mu, \sigma^2) = \frac{1}{\sqrt{2\pi\sigma^2}} e^{-\frac{1}{2}(\frac{x - \mu}{\sigma})^2}
$$

where

- $\int^b_a p(x) dx = 1$

### Gaussian Naive Bayes (GNB)

$$
P(X_j = x\mid Y = c) = \frac{1}{\sqrt{2\pi\sigma^2_{jc}}} e^{-\frac{1}{2}(\frac{x - \mu_{jc}}{\sigma_{jc}})^2}
$$

> [!NOTE]
>
> Sometimes, we assume $X_j$ and/or $Y$ is independent of $\sigma^2_{jc}$

### Estimating Parameters: Discrete Y, Continuous X

- Given dataset: $\{x^{(i)}, y^{(i)}\}_{i =1}^N$
- $x^{(i)} \in \R^d$
- $y^{(i)} \in \R$
- $j$: feature serial
- $i$: sample serial
- $c$: class serial

#### $\bullet$ $\hat{\mu}_{jc}$

$$
\hat{\mu}_{jc} = \frac{1}{\sum^N_{i = 1} \mathbb{I}\{y^{(i)} = c\}} \sum^{N}_{i = 1} x_j^{(i)} \mathbb{I}\{y^{(i)} = c\}
$$

#### $\bullet$ $\hat{\sigma}_{jc}^2$

$$
\hat{\sigma}_{jc}^2 = \frac{1}{\sum^N_{i = 1} \mathbb{I}\{y^{(i)} = c\}} \sum^N_{i =1} (x_j^{(i)} - \hat{\mu}_{jc})^2 \mathbb{I}\{y^{(i)} = c\}
$$

## If variance of each feature is independent of classes

$$
Y_{new} \leftarrow \argmax_{y \in \{0, 1\}} P(Y =y)\prod^d_{j = 1} P(X^{new}_j\mid Y = y)
$$

![clipboard.png](/blog/3-naive-bayes/dr7sBk58-clipboard.webp)

## Decision Boundary

- The decision boundary occurs where $P(Y = 0) \prod^d_{j = 1}P(X_j \mid Y = 0) = P(Y =1) \prod^d_{j =1} P(X_j \mid Y= 1)$

![clipboard.png](/blog/3-naive-bayes/mFDMg0Sd-clipboard.webp)

## Multinomial Naive Bayes

> [!TIP]
>
> When is an input data classified with label 1?

$$
\begin{align*}
&P(Y = 1 \mid X) > P(Y = 0 \mid X) \\
&\iff P(Y = 1 \mid X) > P(Y = 0 \mid X) \\
&\iff P(X\mid Y = 1) P(Y = 1) > P(X \mid Y = 0 ) P(Y = 0) \\
&\iff \frac{M!}{X_1!X_2!\cdots X_d!} \prod^d_{j = 1} (\theta_{j1})^{X_j} P(Y = 1) > \frac{M!}{X_1!X_2!\cdots X_d!} \prod^d_{j = 1} (\theta_{j0})^{X_j} P(Y = 0) \\
&\iff \prod^d_{j = 1} (\theta_{j1})^{X_j} P(Y = 1) > \prod^d_{j = 1} (\theta_{j0})^{X_j} P(Y = 0) \\
&\iff \sum^d_{j = 1} {X_j}\ln(\theta_{j1}) + \ln P(Y = 1) > \sum^d_{j = 1} {X_j}\ln(\theta_{j0}) + \ln P(Y = 0) \\
&\iff \sum^d_{j = 1} {X_j}(\ln(\theta_{j1}) - \ln(\theta_{j0})) + \ln P(Y = 1) - \ln P(Y = 0) > 0 \\
&let\ w_0 = \ln P(Y = 1) - \ln P(Y = 0),\ w_j = (\ln(\theta_{j1}) - \ln(\theta_{j0})) \\
&\iff w_0 + \sum^d_{j = 1} X_jw_j > 0 \quad (\text{A linear classifier})
\end{align*}
$$

## Multinomial Gaussian Bayes

- Consider $f: X \rightarrow Y$
 - $X$: a vector of real-value features $<X_1, \dots, X_d>$
 - $Y$: a boolean variable
 - Assume all $X_j$ are conditionally independent given $Y$
 - Model $P(X_j \mid Y = c) \sim \mathcal{N}(\mu_{jc}, \sigma^2_{j})$
 - Model $P(Y) \sim Bernoulli(\pi)$

$$
\begin{align*}
 &\begin{align*}
 P(Y = 0 \mid X) &= \frac{P(Y = 0)P(X \mid Y = 0)}{P(Y = 0)P(X \mid Y = 0) + P(Y = 1) P(X \mid Y = 1)} \\
 &= \frac{1}{1 + \frac{P(Y = 1) P(X \mid Y = 1)}{P(Y = 0)P(X \mid Y = 0)}} \\
 &= \frac{1}{1 + \frac{\pi P(X \mid Y = 1)}{(1 - \pi)P(X \mid Y = 0)}} \\
 &= \frac{1}{1 + \exp (\ln \frac{\pi}{(1 - \pi)} + \ln\frac{P(X \mid Y = 1)}{P(X \mid Y = 0)})} \\
 &= \frac{1}{1 + \exp (\ln \frac{\pi}{(1 - \pi)} + \sum^{d}_{j = 1} (\ln \frac{\exp(\frac{- (X_j - \mu_{j1})^2}{2\sigma^2_j})}{\exp(\frac{- (X_j - \mu_{j0})^2}{2\sigma^2_j})}))} \quad\quad (\frac{1}{\sqrt{2\pi\sigma_j^2}} \exp(- (\frac{X_j - \mu_{jc}}{\sqrt{2}\sigma_{j}})^2) \\
 &= \frac{1}{1 + \exp (\ln \frac{\pi}{(1 - \pi)} + \sum^{d}_{j = 1} (\frac{-X_j^2 + 2X_j\mu_{j1} - \mu^2_{j1}}{\sigma^2_j})+ (\frac{X_j^2 - 2X_j\mu_{j1} \mu^2_{j1}}{\sigma^2_j}))} \\
 &= \frac{1}{1 + \exp (\ln \frac{\pi}{(1 - \pi)} + \sum^{d}_{j = 1} (\frac{\cancel{-X_j^2} + 2X_j\mu_{j1} - \mu^2_{j1}}{\sigma^2_j})+ (\frac{\cancel{X_j^2} - 2X_j\mu_{j1} \mu^2_{j1}}{\sigma^2_j}))} \\
 &= \frac{1}{1 + \exp (\ln \frac{\pi}{(1 - \pi)} + \sum^{d}_{j = 1} (X_j\frac{(\mu_{j1} - \mu_{j0})}{\sigma^2_j})+ (\frac{\mu_{j0}^2 - \mu_{j1}^2}{\sigma^2_j}))} \\
 &= \frac{1}{1 + \exp (\ln \frac{\pi}{(1 - \pi)} + \sum^{d}_{j = 1} \frac{\mu_{j0}^2 - \mu_{j1}^2}{\sigma^2_j}+ \sum^{d}_{j = 1} X_j\frac{(\mu_{j1} - \mu_{j0})}{\sigma^2_j})} \\
 \text{let } &w_0 = \ln \frac{\pi}{(1 - \pi)} + \sum^{d}_{j = 1} \frac{\mu_{j0}^2 - \mu_{j1}^2}{\sigma^2_j} \\
 &w_j = \sum^{d}_{j = 1} X_j\frac{(\mu_{j1} - \mu_{j0})}{\sigma^2_j} \\
 &= \frac{1}{1 + e^{w_0 + \sum^d_{j = 1} w_j X_j}}
 \end{align*} \\
 &\begin{align*}
 P(Y = 1 \mid X) &= 1 - \frac{1}{1 + e^{w_0 + \sum^d_{j = 1} w_j X_j}} \\
 &= \frac{e^{w_0 + \sum^d_{j = 1} w_j X_j}}{1 + e^{w_0 + \sum^d_{j = 1} w_j X_j}} \\
 \end{align*} \\
&\Rightarrow \frac{P(Y = 1 \mid X)}{P(Y = 0 \mid X)} = e^{w_0 + \sum^d_{j = 1} w_j X_j} \gtrless 1 \\
&\Rightarrow \ln \frac{P(Y = 1 \mid X)}{P(Y = 0 \mid X)} = w_0 + \sum^d_{j = 1} w_j X_j \gtrless 0 \quad\quad \text{(Linear Classification Rule)}
\end{align*}
$$

> [!IMPORTANT]
>
> This is the **Logistic Function**:
>
> $$
> \frac{1}{1 + e^{w_0 + \sum^d_{j = 1} w_jX_j}}
> $$
>
>![clipboard.png](/blog/3-naive-bayes/zukFxVET-clipboard.webp)

| **Aspect** | **Logistic Regression** | **Naive Bayes** |
| -------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| **Type of model** | Discriminative — models $$P(Y \mid X)$$ directly | Generative — models $$P(X \mid Y)$$ and $$P(Y)$$, then applies Bayes’ rule to get $$P(Y \mid X)$$ |
| **Key assumption** | No independence assumption between features | Conditional independence of features given the class |
| **Decision boundary** | Linear in feature space (unless nonlinear terms added) | Linear if equal variances (e.g., Gaussian NB), otherwise nonlinear |
| **Output** | Direct estimate of $$P(Y=1 \mid X)$$ | Computed from $$P(X \mid Y) P(Y)$$ |
| **Interpretability** | Coefficients show log-odds effect of features | Parameters correspond to class-conditional feature distributions |
| **Data requirement** | Needs more data for stable estimates | Performs well even with small datasets |
| **Handling correlated features** | Can handle correlations and interactions | Breaks down if features are correlated |
| **Training speed** | Slower — requires iterative optimization | Very fast — closed-form parameter estimation |
| **Probability calibration** | Usually well-calibrated probabilities | Often overconfident, may need calibration |
| **Regularization** | Supports L1/L2 regularization | Usually no regularization (can add smoothing) |
| **Common variants** | L1/L2 Logistic Regression, Multinomial LR | Gaussian NB, Multinomial NB, Bernoulli NB |
| **Typical use cases** | Continuous or mixed data, interpretability needed | Text classification, spam detection, sentiment analysis |


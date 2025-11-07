---
categories:
- Computational Photography
- reading materials
createdAt: '2025-09-14'
description: $$
tags:
- reading materials
- Computational Photography
title: Image Filtering
---

# Image Filtering

## Goal

### Signal

![clipboard.png](/blog/image-filtering/hrpDhcWb-clipboard.webp)

### Image

![clipboard.png](/blog/image-filtering/b7blMufa-clipboard.webp)

## $\delta$ Function (1-D)

![clipboard.png](/blog/image-filtering/nBi4i-s2-clipboard.webp)

$$
\delta[x] =
\begin{cases}
 1, \quad (x =0) \\
 0, \quad (x \ne 0)
\end{cases}
$$

### Shifting to other places

![clipboard.png](/blog/image-filtering/4awpREFn-clipboard.webp)

$$
\begin{align*}
 f[x] &= \{f[1]\ f[2] \cdots f[12]\} \\
 &= \{0\ 1\ 2\ 4\ 8\ 7\ 6\ 5\ 4\ 3\ 2\ 1\} \\
 &= \sum_{k = -\infty}^{\infty} f[k]\delta[x - k]
\end{align*}
$$

---

## Discrete-time System

$$
f[x] \rightarrow T(\cdot) \rightarrow g[x] = T\{f[x]\}
$$

![clipboard.png](/blog/image-filtering/efv0qy-p-clipboard.webp)

### Running Average of the signal

$$
g[x] = \frac{1}{2N + 1}\sum_{k = - N}^{N} f[x + k]
$$

- e.g. $N = 6$

![clipboard.png](/blog/image-filtering/JMYQKyu--clipboard.webp)

## $\delta$ Function (2-D)

$$
\delta[x, y] =
\begin{cases}
 1, \quad (x = \frac{m}{2}, y = \frac{n}{2}) \\
 0, \quad (otherwise)
\end{cases}
$$

## Image Gradient

$$
\sqrt{f^2_x + f^2_y}
$$

```python
from scipy import ndimage
im = 1.0 * plt.imread("al.jpg") # convert to double
filt = np.array([
 [-0.1250, -0.2500, -0.1250],
 [0, 0, 0],
 [0.1250, 0.2500, 0.1250],
])

im_y = ndimage.convolve(im, filt, mode="reflect")
im_x = ndimage.convolve(im, filt, mode="reflect")
im_g = np.sqrt(im_x**2 + im_y**2)

```

## Space and Frequency (Canonical Basis)

$$
\begin{align*}
f[x] &= (1\ 2\ 3\ 4\ \cdots\ 7) \\
 &= 1(1\ 0\ 0\ 0\ \cdots\ 0) \\
 &+ 2(0\ 1\ 0\ 0\ \cdots\ 0) \\
 &+ 3(0\ 0\ 1\ 0\ \cdots\ 0) \\
 &+ \cdots \\
 &+ 7(0\ 0\ 0\ 0\ \cdots\ 1) \\
\end{align*}
$$

$$
\begin{align*}
f[x] &= \sum_{k = 0}^{m-1} a_kb_k(x)
\end{align*}
$$

### Matrix Form

$$
\begin{pmatrix}
f[0] \\
\vdots\\
f[m - 1]
\end{pmatrix}

=
\underbrace{
 \begin{pmatrix}
 \begin{align*}
 &\vert \\
 &\vec{b}_0 \\
 &\vert \\
 \end{align*}
 \quad\cdots
 \quad
 \begin{align*}
 &\vert \\
 &\vec{b}_{m- 1} \\
 &\vert \\
 \end{align*}
 \end{pmatrix}
}_{\text{orthonormal }(B^{-1} = B^T)}
\begin{pmatrix}
 a_0 \\
 \vdots \\
 a_{m-1}
\end{pmatrix}
$$

### we can then derive $a_k$

$$
\begin{align*}
\because & \\
 &B \text{ is orthonormal} (B^{-1} = B^T) \\
\therefore & \\
 & B^{-1} \cdot f = A \\
 & A = B^T \cdot f \\
 & a_k = \sum^{m - 1}_{l = 0} f(l)b_k(l)
\end{align*}
$$

## Space and Frequency (Fourier, 1-D)

> [!IMPORTANT]
>
> **Assumption**: Singals are periodic

![clipboard.png](/blog/image-filtering/F6S5R-kK-clipboard.webp)

### $f[x]$ represented with $cos$

$$
\begin{align*}
f[x]
&= \frac{1}{m} \sum^{m - 1}_{k = 0} \underbrace{c_k}_{amplitude} cos(\underbrace{\frac{2\pi k}{m}}_{frequency}x + \underbrace{\phi_k}_{phase\ (non-fixed)}) \\
\end{align*}
$$

### $f[x]$ represented with $cos$ and $sin$

$$
\begin{align*}
f[x]
&= \frac{1}{m} \sum^{m - 1}_{k = 0} c_k cos(\omega_kx + \phi_k) \\

&= \frac{1}{m} \sum^{m - 1}_{k = 0} \underbrace{c_k cos(\phi_k)}_{\text{scale factor }\rightarrow a_k} cos(\omega_kx) - \underbrace{c_ksin(\phi_k)}_{\text{scale factor }\rightarrow b_k}sin(\omega_kx)\\

&= \frac{1}{m} \sum^{m - 1}_{k = 0} a_k \underbrace{cos(\omega_kx)}_{\text{fixed basis}} + b_k \underbrace{sin(\omega_kx)}_{\text{fixed basis}} \\

\end{align*}
$$

## $a_k$ and $b_k$

- Given the canonical and matrix forms of a space and frequency
- and the fact that $cos$ and $sin$ matrices are orthonormal

$$
\begin{align}
a_k = \sum^{m - 1}_{l = 0} f[l]cos(\omega_kl) \\
b_k = \sum^{m - 1}_{l = 0} f[l]sin(\omega_kl)
\end{align}
$$

> [!NOTE]
>
> **About Frequency $\frac{2\pi k}{m}$**
>
> - $2\pi$: a complete cycle of a sinusoid
> - $k$: frequency bin (harmonic number)
> - $m$: the length of a discrete signal
> - $\frac{k}{m}$: Normalize the frequency

## Space and Frequency (Complex Exponential)

### $\bullet$ Fourier Series

$$
\frac{1}{m} \sum^{m - 1}_{k = 0} a_k \cos(\omega_kx) + b_k sin(\omega_kx)
$$

### $\bullet$ Fourier Transform

$$
\begin{align*}
a_k = \sum^{m - 1}_{l = 0} f[l]cos(\omega_kl) \\
b_k = \sum^{m - 1}_{l = 0} f[l]sin(\omega_kl)
\end{align*}
$$

> [!IMPORTANT]
> Having two bases $a_k$ and $b_k$ is too cumbersome to compute. We need to combine them as one.

### $\bullet$ Complex Exponential

#### Euler's formula

$$
e^{i\omega x} = cos(\omega x) + isin(\omega x)
$$

> [!NOTE]
>
> Full proof can be found in [Euler's Formula](/blog/math/fourier-analysis/eulers-formula)

### $\bullet$ Rewrite of the Fourier Series

$$
f[x] = \frac{1}{m} \sum^{m - 1}_{k = 0} c_k e^{i\omega_k x}
$$

### $\bullet$ Rewrite of the Fourier Transform

$$
\begin{align*}
&c_k = \sum^{m - 1}_{k = 0} f(l) e^{-i\omega _kl} \\
&c_k = a_k - ib_k
\end{align*}
$$

#### magnitude

$$
|c_k| = \sqrt{a_k^2 + b_k^2}
$$

#### Phase

$$
\angle c_k = tan^{-1}(\frac{b_k}{a_k})
$$

## Space and Frequency (Fourier, 2-D)

> [!IMPORTANT]
>
> **Assumption**: Signals are periodic in both $x$ and $y$ directions.

### $f[x,y]$ represented with $\cos$ and $\sin$

![clipboard.png](/blog/image-filtering/zJBU9y-K-clipboard.webp)

$$
f[x,y]
= \frac{1}{m^2} \sum_{k=0}^{m-1} \sum_{l=0}^{m-1}
\Big( a_{kl}\cos(\omega_k x + \omega_l y) + b_{kl}\sin(\omega_k x + \omega_l y) \Big)
$$

where

- $\omega_k = \tfrac{2\pi k}{m}$: horizontal frequency bin
- $\omega_l = \tfrac{2\pi l}{m}$: vertical frequency bin

---

### Coefficients $a_{kl}, b_{kl}$

$$
a_{kl} = \sum_{x=0}^{m-1}\sum_{y=0}^{m-1} f[x,y]\cos(\omega_k x + \omega_l y)
$$

$$
b_{kl} = \sum_{x=0}^{m-1}\sum_{y=0}^{m-1} f[x,y]\sin(\omega_k x + \omega_l y)
$$

## Complex Exponential Form (2-D)

### Euler’s Formula

$$
e^{i(\omega_k x + \omega_l y)} = \cos(\omega_k x + \omega_l y) + i\sin(\omega_k x + \omega_l y)
$$

### 2-D Fourier Series

$$
f[x,y] = \frac{1}{m^2} \sum_{k=0}^{m-1} \sum_{l=0}^{m-1} c_{kl} \, e^{\,i(\omega_k x + \omega_l y)}
$$

with

$$
c_{kl} = a_{kl} - i b_{kl}
$$

## 2-D Discrete Fourier Transform (DFT)

### Forward Transform

$$
F[u,v] = \sum_{x=0}^{m-1} \sum_{y=0}^{m-1} f[x,y] \, e^{-i2\pi\left(\frac{ux}{m} + \frac{vy}{m}\right)}
$$

### Inverse Transform

$$
f[x,y] = \frac{1}{m^2} \sum_{u=0}^{m-1} \sum_{v=0}^{m-1} F[u,v] \, e^{+i2\pi\left(\frac{ux}{m} + \frac{vy}{m}\right)}
$$

## Magnitude and Phase (2-D)

### Magnitude Spectrum

$$
|F[u,v]| = \sqrt{\Re(F[u,v])^2 + \Im(F[u,v])^2}
$$

### Phase Spectrum

$$
\angle F[u,v] = \tan^{-1}\!\left(\frac{\Im(F[u,v])}{\Re(F[u,v])}\right)
$$

## Magnitude and Its Log-form of the Fourier Transform

```python
import numpy as np
import matplotlib.pyplot as plt
from numpy import fft

f = plt.imread("al.jpg")

F = fft.fftshift(
 fft.fft2(f)
)
Fmag = np.abs(F)

# Plotting
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(20, 10))

ax1.set_title("Fourier Magnitude")
ax1.imshow(Fmag, cmap="gray")

ax2.set_title("Log Fourier Magnitude")
ax2.imshow(np.log(Fmag), cmap="gray")
```

- `fft.fftshift`: shift the origin of the coordinate system from the top-left corner to the center
- `fft.fft2(f)`: calculate the fourier transform of the image

![clipboard.png](/blog/image-filtering/UhT24-3a-clipboard.webp)

- In the center of the image, there is a $DC\ Term$ representing the average pixel intensity of the entire image.
- The $DC Term$ is so strong that the other values are comparatively small and nearly invisible
- The `np.log(Fmag)` resolves this problem

## Creating a window smoothly tapers to zero at all four edges

```python
f = plt.imread(al.jpg)
[ydim, xdim] = f.shape
win = np.outer(
 np.hanning(ydim),
 np.hanning(xdim),
)
win = win / np.mean(win) # make unit-mean
F = fft.fftshift(fft.fft2(f * win))
```

![clipboard.png](/blog/image-filtering/QTFKT7M2-clipboard.webp)

## Continuous to Discrete Sampling

1. $f(x)$

![clipboard.png](/blog/image-filtering/mx6wAzsx-clipboard.webp)

2. $s(x) = \sum^{\infty}_{k = -\infty} \delta(x - kT)$

![clipboard.png](/blog/image-filtering/tmqsEgCc-clipboard.webp)

- **Sampling**
- $T$: How fine we want to sample

> [!TIP]
>
> $$
> \delta(x) =
> \begin{cases}
> 1 \quad (x = 0) \\
> 0 \quad (x \ne 0)
> \end{cases}
> $$

3. $f_s(x) = f(x)s(x)$

![clipboard.png](/blog/image-filtering/wooj7nPm-clipboard.webp)

- grabbing the values that we want but having 0 everywhere else

4. $f[x] = f_s(xT)$

![Screenshot 2025-09-15 at 14.42.10](/blog/image-filtering/jKe70ZFN-Screenshot_2025-09-15_at_14.42.10.webp)

- Take each integer multiples of $T$

---

## Convolution and Fourier Transform

### Formulas

$$
\begin{align*}
&f_s(x) = f(x)s(x) \\
&\Rightarrow F_s(x) = F(\omega) * S(\omega)
\end{align*}
$$

> [!IMPORTANT]
>
> The convolution in the frequency domain is the same as the multiplication in the spatial domain, and vice versa.

### What do we lose when we samples

#### $\bullet$ Aliasing

- Aliasing causes artifacts and the loss of information in the image

![clipboard.png](/blog/image-filtering/GPGGf8tX-clipboard.webp)

#### $\bullet$ Nyquist Limit

$$
\omega_s > 2\omega_n
$$

- A solution to determining aliasing
- Perfect representation of a signal without information loss

### Prevent Replicates

![clipboard.png](/blog/image-filtering/r9sy-7a9-clipboard.webp)

- Sampling induces replicate signals
- Apply ideal sinc to resolve this problem

$$
h(x) = \frac{sin(\frac{\pi x}{T})}{\frac{\pi x}{T}}
$$

![clipboard.png](/blog/image-filtering/TECEpEMH-clipboard.webp)

---

## Discrete to Discrete Sampling

- Discard high frequency part of the image and down-sample it
- Given Gaussian Function $h(x) = e^{-x^2/\sigma^2}$

### Spatial Domain

$$
g[x] = (h(x) * f[x])s[x]
$$

### Frequency Domain

$$
G[\omega] = (H(\omega)F[\omega]) * S[\omega]
$$

![clipboard.png](/blog/image-filtering/-v_uhYEg-clipboard.webp)

- The signal becomes narrower, which means the higher frequencies are filtered successfully
 - Aliasing would not happen

---

## Gaussian Pyramid

- Repeated process of `blurring` + `down-sampling`
- `blurring` is typically done with Gaussian Filter

![Screenshot 2025-09-15 at 16.24.50](/blog/image-filtering/6VgcZpFr-Screenshot_2025-09-15_at_16.24.50.webp)

### In Fourier Domain

![Screenshot 2025-09-15 at 16.25.43](/blog/image-filtering/O5WCDnjH-Screenshot_2025-09-15_at_16.25.43.webp)
![Screenshot 2025-09-15 at 16.26.44](/blog/image-filtering/wPuPld-I-Screenshot_2025-09-15_at_16.26.44.webp)

### Code

```python
im = plt.imread("mandrill.png") # load image
h = [1/16, 4/16, 6/16, 4/16, 1/16] # unit-sum blur filter (a Gaussian filter)
N = 3 # pyramid level

P = [im]
for k in range(1, N):
 im2 = np.zeros(im.shape)
 for z in range(3):
 im2[:,:, z] = sepfir2d(im[:,:, z], h, h) # blur each color channel
 im2 = im2[0:-1:2, 0:-1:2,:] # down-sample by 2 x 2
 im = im2
 P.append(im2)
```

## Laplacian Pyramid

- Starting from a Gaussian Pyramid
- Repeated of `up-sampling` and `subtraction`

![clipboard.png](/blog/image-filtering/F3XWk_Ju-clipboard.webp)

### In Fourier Domain

![clipboard.png](/blog/image-filtering/xmuKa7Nu-clipboard.webp)

### Code

```python
L = []
for k in range(0, N - 1):
 l1 = G[k]
 l2 = G[k + 1]
 l2 = cv2.resize(l2, (0, 0), fx=2, fy=2) # up-sample
 D = l1 - l2
 D = D - np.min(D) # scale in [0, 1]
 D = D / np.max(D) # for display purpose
 L.append(D)
L.append(G[N - 1])
```

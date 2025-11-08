---
categories:
- Computational Photography
- lectures
createdAt: '2025-08-20'
description: 1. Light comes out from the sources
tags:
- lectures
- Computational Photography
title: 1. Pixels and Linear Filters
---
# 1. Pixels and Linear Filters

## Image Formation Process

![clipboard.png](/blog/1-pixels-and-linear-filters/xiUUB2RO-clipboard.webp)

1. Light comes out from the sources
2. Light bounces off the elements in the scene
3. Some of that light is reflected through the lens into the camera onto the imaging plane

> [!NOTE]
>
> **Films and Analog Camera**:
>
> - Light is recorded as a continuous signal on that film
>
> **Digital Camera**
>
> - Light is recorded onto a CCD
> - Cells in CCD are photo-recepters converting the photrons of light into electrons

## Sensor Array

- Continuous signals recorded are discretized based on `space` and `intensity`

![clipboard.png](/blog/1-pixels-and-linear-filters/48Rs9otD-clipboard.webp)

## The raster image (pixel matrix)

![clipboard.png](/blog/1-pixels-and-linear-filters/VWJuS1Dq-clipboard.webp)

- **Raster Image:** the matrix representation of an image
- Difficult Part for image analysis:
 - We perceive the contrast of a `black` character with a `white` background
 - In reality, it's a `mid-range` character with a `noisy` background

## Perception of Intensity

![clipboard.png](/blog/1-pixels-and-linear-filters/EX0pnp0W-clipboard.webp)

- **Intensity:** Overall, how much light is coming over the sensor.
- The `darkness` of A and B is actually the same.

## Digital Color Images

![clipboard.png](/blog/1-pixels-and-linear-filters/9ZAWJfPI-clipboard.webp)

- Color images are all generated with 3 different colors with different intensity

## Images in Python

```python
# read image (order: BGR)
im = cv2.imread(filename)

# order channels as RGB
im = cv2.cvtColor(im, cv2.COLOR_BGR2RGB)
im = im / 255
```

- RGB image `im` is `H x W x 3` matrix (`np.ndarray`)
 - `H`: height
 - `W`: width
 - `3`: # of channels (RGB)
- `im[0, 0, 0]`:
 - top-left pixel value in the R-channel
- `im[y, x, c]`:
 - `y + 1` pixels down
 - `x + 1` pixels right
 - `c`th channel

## Image Filtering

### What is it?

- compute function of local neighborhood at each position

#### Example: Box Filter

- Blurring image
- Calculating moving average

##### Formula

$$
h[m, n] = \sum_{k,j} g[k, l] \times f[m + k, n + l]
$$

##### How it works

- Let's say you have a `3 x 3` box filter

![clipboard.png](/blog/1-pixels-and-linear-filters/foteqmee-clipboard.webp)

- For every `3 x 3` window in the image,

 1. multiply the corresponding elements of that patch of the image with the elements in the filters
 2. sum up all of products

![clipboard.png](/blog/1-pixels-and-linear-filters/Fk55y-c_-clipboard.webp)

![clipboard.png](/blog/1-pixels-and-linear-filters/weNinr2t-clipboard.webp)

## Types of Filters

### Box Filter

![clipboard.png](/blog/1-pixels-and-linear-filters/Y1tEI-xg-clipboard.webp)

- smooth the image
- create some edges (will be explained later in the course)

#### Calculate by hand

> **Note:** convolution

$$
\begin{bmatrix}
0&1&1&0 \\
1&2&2&0 \\
0&0&0&1 \\
0&1&1&2 \\
\end{bmatrix}
*
\begin{bmatrix}
1&0&0 \\
0&1&0 \\
0&0&1 \\
\end{bmatrix}
=
\begin{bmatrix}
0&1&1&0 \\
1&2&4&0 \\
0&2&4&1 \\
0&1&1&2 \\
\end{bmatrix}
$$

![clipboard.png](/blog/1-pixels-and-linear-filters/9jIg3-kM-clipboard.webp)

## Practice with Linear Filters

### Identity Filter

- no change
 $$
 \begin{bmatrix}
 0&0&0 \\
 0&1&0 \\
 0&0&0 \\
 \end{bmatrix}
 $$

![clipboard.png](/blog/1-pixels-and-linear-filters/hYwwOC1P-clipboard.webp)

### Shifted Left

- every pixel would be replaced by its right neighbor

 $$
 \begin{bmatrix}
 0&0&0 \\
 0&0&1 \\
 0&0&0 \\
 \end{bmatrix}
 $$

![Screenshot 2025-08-27 at 08.51.46](/blog/1-pixels-and-linear-filters/eUCsFOdr-Screenshot_2025-08-27_at_08.51.46.webp)

### Sharpening

- accentuates differences with local average

$$
\begin{bmatrix}
0&0&0 \\
0&2&0 \\
0&0&0 \\
\end{bmatrix}
-
\underset{\text{Box Filter}}{
\frac{1}{9}
\begin{bmatrix}
1&1&1 \\
1&1&1 \\
1&1&1 \\
\end{bmatrix}}
$$

![clipboard.png](/blog/1-pixels-and-linear-filters/_O_qTwmY-clipboard.webp)

> [!TIP]
> You are calculating the `original matrix` + `the difference of the center pixel from the average of the neighbors`, which makes the differences stronger.

## Edge Filter

- Subtracting sum of pixels to the left to sum of the pixels to the right
- Stronger left pixels -> positive result
- Stronger right pixels -> negative result

 $$
 \underset{\text{Sobel}}{
 \frac{1}{9}
 \begin{bmatrix}
 1&0&-1 \\
 2&0&-2 \\
 1&0&-1 \\
 \end{bmatrix}}
 $$

![Screenshot 2025-08-27 at 09.17.14](/blog/1-pixels-and-linear-filters/E0Bef897-Screenshot_2025-08-27_at_09.17.14.webp)

- `white pixels`: high magnitude
- `black pixels`: low magnitude

## How to synthesize motion blur?

- Shift the picture by multiple positions and then average those out

```python
im = cv2.imread(im_fn)

# invert to gray scale
im = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY) / 255

# degree motion blur
theta = 45
# theta = 0 # vertical filter
# theta = 90 # horizontal filter
len = 15
mid = (len - 1) / 2

fil = np.zeros((len, len))
fil[:, int(mid)] = 1 / len # sum of the values is 1
R = cv2.getRotationMatrix2D((mid, mid), theta, 1)
fil = cv2.wrapAffine(fil, R, (len, len))

im_fil = cv2.filter2D(im, -1, fil)
fig, axes = plt.subplot(3, 1, figsize=(50, 50))
axes[0].imshow(im, cmap='gray')
axes[1].imshow(fil, cmap='gray)
```

![Screenshot 2025-08-27 at 09.30.55](/blog/1-pixels-and-linear-filters/eP0dt6kg-Screenshot_2025-08-27_at_09.30.55.webp)

> [!WARNING]
> This cannot be used to anti-blur the image as there are several ways tThat may lead to the same blurred image.

### If we change the len

- The amount of blur would be less

```python
len = 7
```

![clipboard.png](/blog/1-pixels-and-linear-filters/s2B3r-10-clipboard.webp)

### If we do not include the all rows

```python
alpha = 45
len = 25
fil[12:, int(mid)] = 1 / len # synthesizing blur on the right half only
R = cv2.getRotationMatrix2D((mid, mid), theta, 1)
fil = cv2.wrapAffine(fil, R, (len, len))
```

- The pixels on the upper-left will be replaced by the pixels on the lower-right
- The image would be shifted to the upper-left and blurred
![clipboard.png](/blog/1-pixels-and-linear-filters/SxD0QeWp-clipboard.webp)
![clipboard.png](/blog/1-pixels-and-linear-filters/V5ADVqbt-clipboard.webp)

## Correlation vs. Convolution

### 2d correlation

- `im_fil = cv2.filter2d(im, -1, fil)`
- When you takes a window over the image, you multiply corresponding elements of that window with the elements of the `kernel` (filter matrix) or the filter.

$$
im\_fil[m, n] = \sum_{k, l} fil[k, l] \cdot im[m + k, n + l]
$$

### 2d convolution

- `im_fil = scipy.signal.convolve2d(im, fil, [opts])`
- Convolution flip the kernel by 180 degrees first and then apply correlation

$$
im\_fil[m, n] = \sum_{k, l} fil[k, l] \cdot im[m - k, n - l]
$$

> [!IMPORTANT]
> "convolve" mirrors the kernel, while "filter" doesn't. The following two expressions are the same
>
> - `cv2.filter2D(im, -1, cv2.flip(fil, -1))`
> - `siginal.convolve2d(im, fil, mode='same', boundary='symm')`

## Properties of Linear Filters

### Linearity

$$
filter(f_1 + f_2) = filter(f_1) + filter(f_2)
$$

### Shift Invariance:

- Same behavior regardless of pixel location

$$
filter(shift(f)) = shift(filter(f))
$$

> [!NOTE]
> Any linear, shift-invariant filter's operations can be represented as convolutions

### Commutative

$$
a * b = b * a
$$

### Associative

$$
a * (b * c) = (a * b) * c
$$

### Distributes over addition

$$
a * (b + c) = (a * b) + (a * c)
$$

### Scalars factor out:

$$
ka * b = a * kb = k(a * b)
$$

### Identity

$$
\begin{align*}
&e = [0, 0, 1, 0, 0] \\
&a * e = a
\end{align*}
$$

## Gaussian Filter

- Weight contributions of neighboring pixels by nearness
- The value in the center is the highest

![clipboard.png](/blog/1-pixels-and-linear-filters/ppwaYHB2-clipboard.webp)

- It is a very effective smoother

![clipboard.png](/blog/1-pixels-and-linear-filters/h2njFgYW-clipboard.webp)

- Remove the `high-frequency` components from the image (`low-pass filter`)

### Convolution with self is another Gaussian

- convolving two times with Gaussian kernel of width $\sigma$ is the same as convolving once with kernel of width $\sigma\sqrt{2}$
- The Gaussian kernel is defined as:

 $$
 G_\sigma(x) = \frac{1}{\sqrt{2\pi\sigma^2}} e^{-\frac{x^2}{2\sigma^2}}
 $$

- Convolving two Gaussian functions = Multiplying their Fourier transforms.
- The Fourier transform of a Gaussian is also a Gaussian:

 $$
 \mathcal{F}[G_\sigma(x)] = e^{-\frac{\omega^2\sigma^2}{2}}
 $$

#### Convolve two Gaussians with widths $\sigma_1$ and $\sigma_2$:

- In frequency domain:

 $$
 e^{-\frac{\omega^2\sigma_1^2}{2}} \cdot e^{-\frac{\omega^2\sigma_2^2}{2}} = e^{-\frac{\omega^2(\sigma_1^2 + \sigma_2^2)}{2}}
 $$

- This corresponds to a Gaussian with variance

 $$
 \sigma_{result}^2 = \sigma_1^2 + \sigma_2^2
 $$

- For two identical Gaussians with width σ:
 $$
 \sigma_{result} = \sqrt{\sigma^2 + \sigma^2} = \sqrt{2\sigma^2} = \sigma\sqrt{2}
 $$

### Separability of the Gaussian Filter

$$
\begin{align*}
G_\sigma &= \frac{1}{2\pi\sigma^2} exp ^{-\frac{x^2 + y^2}{2\sigma^2}}\\
 &= \frac{1}{2\pi\sigma^2} exp ^{-\frac{x^2}{2\sigma^2}} + \frac{1}{2\pi\sigma^2} exp ^{-\frac{y^2}{2\sigma^2}}
\end{align*}
$$

## Separability Example

- Faster to computer
- `method 1` takes $k^2$ times of caluculation
- `method 2` takes $2k$ times of calculation

$$
\begin{align*}
% 2D filtering (center location only)
1. &\begin{bmatrix}
1 & 2 & 1 \\
2 & 4 & 2 \\
1 & 2 & 1
\end{bmatrix}
*
\begin{bmatrix}
2 & 3 & 3 \\
3 & 5 & 5 \\
4 & 4 & 6
\end{bmatrix} \\
&= 2 + 6 + 3 + 6 + 20 + 10 + 4 + 8 + 6 = 65 \\

% The filter factors into a product of 1D filters:
2. &\begin{bmatrix}
1 & 2 & 1 \\
2 & 4 & 2 \\
1 & 2 & 1
\end{bmatrix}
=
\begin{bmatrix}
1 \\
2 \\
1
\end{bmatrix}
\cdot
\begin{bmatrix}
1 & 2 & 1
\end{bmatrix} \\

% Perform filtering along rows:
&\begin{bmatrix}
1 & 2 & 1
\end{bmatrix}
*
\begin{bmatrix}
2 & 3 & 3 \\
3 & 5 & 5 \\
4 & 4 & 6
\end{bmatrix}
=
\begin{bmatrix}
11 \\
18 \\
18
\end{bmatrix}\\

% Followed by filtering along columns:
&\begin{bmatrix}
1 \\
2 \\
1
\end{bmatrix}
*
\begin{bmatrix}
11 \\
18 \\
18
\end{bmatrix}
= 65
\end{align*}
$$

## Practical Matters

### Proper size for kernel

- For kenel, with a proper size, the values at edges should be near zero
- For Gaussian:
 $$
 kernel\ half\_width >= 3\sigma
 $$

### Near the edges

- the filter window falls off the edge of the image

#### Extrapolation

##### clip filter

![clipboard.png](/blog/1-pixels-and-linear-filters/J-6xXRZj-clipboard.webp)

- apply smoothing filter

![clipboard.png](/blog/1-pixels-and-linear-filters/HHWrQnFt-clipboard.webp)

- Crop the image back to the original size

![clipboard.png](/blog/1-pixels-and-linear-filters/olGtuuSB-clipboard.webp)

##### wrap around

![clipboard.png](/blog/1-pixels-and-linear-filters/kY-v7RtK-clipboard.webp)

##### copy edge

![clipboard.png](/blog/1-pixels-and-linear-filters/Ku7cY4Wy-clipboard.webp)

> [!CAUTION]
> For templating matching, the copied edges may cause some extra problems

##### reflect across edge

![clipboard.png](/blog/1-pixels-and-linear-filters/8h47jm-z-clipboard.webp)

### In Python

#### Methods

```python
convolve2d(g, f, boundary='fill', 0) # clip filter
convolve2d(g, f, boundary='wrap') # wrap around
convolve2d(g, f, boundary='symm') # reflect across edge
```

#### Size of output

- `convolve2d(g, f, mode)`
- `mode='full'`:

 - output size is `sum` of sizes of `f` and `g`

![clipboard.png](/blog/1-pixels-and-linear-filters/6jXFv1Nl-clipboard.webp)

- `mode='same'`:

 - output size is the same as `f`
 - **What we usually wanna do**

![clipboard.png](/blog/1-pixels-and-linear-filters/vSNQARyp-clipboard.webp)

- `mode='valid'`

 - output size is the `difference` of sizes of `f` and `g`

![clipboard.png](/blog/1-pixels-and-linear-filters/iaGdo_gq-clipboard.webp)

## What is texture?

- Regular or stochastic patterns caused by bumps, grooves, and markings
- We can represent textures by computing responses of different filters

![clipboard.png](/blog/1-pixels-and-linear-filters/dsNMBlIw-clipboard.webp)

### Filter Bank

1. Process image with each filter and keep resposnes
 - for example, sum of the responses may be stored to tell how strongly the image responds the filter
2. Measure responses of blobs and edges at various orientations and scales
3. Record simple stats of absolute filter responses

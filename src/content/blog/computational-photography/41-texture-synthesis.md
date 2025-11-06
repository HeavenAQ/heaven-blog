---
categories:
- Computational Photography
- lectures
createdAt: '2025-09-29'
description: '- Create new samples of a given texture'
tags:
- lectures
- Computational Photography
title: 4.1 Texture Synthesis
---

# 4.1 Texture Synthesis

## Goal

- Create new samples of a given texture
- Simplest: tiling

![clipboard.png](/blog/41-texture-synthesis/BbYo1dWf-clipboard.webp)

## The Challenge

![clipboard.png](/blog/41-texture-synthesis/Wran7SOv-clipboard.webp)

- Need to model the whole spectrum from repeated to stochastic texture

## One idea: Build Probability Distributions

- Compute the stats of the input texture and generate a new texture that keeps the same stats

![clipboard.png](/blog/41-texture-synthesis/veSSkdnm-clipboard.webp)

## Another Idea: Sample from the Image

- Assume Markov property
 - A given pixel `p` is independent of the entire picture given the neighboring pixels around it.

![clipboard.png](/blog/41-texture-synthesis/9JJcSdid-clipboard.webp)

- What are we doing?
 - Find patches on the input image that are similar to the neighboring pixels around `p`
 - Sample intensities around these patches $P(p \mid Neighbor(p))$

> [!NOTE]
>
> **Idea from Shannon**
>
> - Generate English-sounding sentences by modeling the probability of each word given the previous words (n-grams)
> - Large "n" will give more structured sentences

## How to match patches?

- Gaussian-weighted SSD

![clipboard.png](/blog/41-texture-synthesis/LlXDr6YO-clipboard.webp)

$$
\begin{align*}
&SSD(src, template, mask) \\
&= \sum_{i, j} \sum_{x, y} |template(x, y) \odot mask(x, y) - src(i+x, j+y) \odot mask(x, y)|^2 \\
&= \sum_{i, j} \sum_{x, y} [template(x, y) \odot mask(x, y)]^2 - 2\sum_{i, j}\sum_{x, y} [template(x, y) \odot mask(x, y) \odot src(i+x, j+y)] + \sum_{i, j}\sum_{x, y} [src(i+x, j+y) \odot mask(x, y)]^2 \\
&= \sum_{i, j} \left[\sum_{x, y} [template(x, y) \odot mask(x, y)]^2\right] - 2\sum_{i, j}\sum_{x, y} [template(x, y) \odot mask(x, y) \odot src(i+x, j+y)] + \sum_{i, j}\sum_{x, y} [src(i+x, j+y)]^2 \odot mask(x, y) \\
&= |template \odot mask|^2 \odot N_{ij} - 2[(template \odot mask) \star src] + [src^2 \star mask]
\end{align*}
$$

- The pixels with most neighbors are synthesized first (propagate outwards from the center of an image)
- To synthesize from scratch, start with a randomly selected small patch from the source texture

## Size of Neighborhood Window

![clipboard.png](/blog/41-texture-synthesis/6FVef8oe-clipboard.webp)
![clipboard.png](/blog/41-texture-synthesis/MvQd33HR-clipboard.webp)

## Algorithm

- While image not filled
 1. Get unfilled pixels with filled neighbors, sorted by the number of filled neighbors
 2. For each pixel, get top N matches based on visible neighbors
 - SSD can be used for patch match
 3. Randomly select one of the matches and copy pixel from it

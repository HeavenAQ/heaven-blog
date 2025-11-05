---
categories:
- Computational Photography
- homework
createdAt: '2025-10-01'
description: '```python'
tags:
- homework
- Computational Photography
title: Error Path - Quilting
---

# Error Path - Quilting

```python
def calc_error_path(block_1: MatLike, bVlock_2: MatLike, direction: Literal["vertical", "horizontal"]="vertical"):
 # init
 e = np.sum((block_1 - block_2) ** 2, axis=2).astype(np.float32)
 h, w = e.shape

 if direction == "vertical":
 # using dp to solve this problem
 E = np.full((h, w + 2), np.inf, dtype=np.float32)
 E[0, 1:w+1] = e[0,:]
 for i in range(h):
 for j in range(1, w + 1):
 E[i, j] = e[i, j - 1] + E[i - 1, min([j - 1, j, j + 1], key=lambda x: E[i - 1, x])]

 # trace back (the final result lies in the last row)
 j = np.argmin(E[h - 1, 1:w+1]) + 1
 path = [(h - 1, j - 1)]
 for i in range(h - 1, 0, -1):
 j = min([j - 1, j, j + 1], key=lambda x: E[i - 1, x])
 path.append((i - 1, j - 1)) # i - 1 cuz padding is used
 return path[::-1]

 elif direction == "horizontal":
 E = np.full((h + 2, w), np.inf, dtype=np.float32)
 E[1:h+1, 0] = e[:, 0]

 for i in range(1, h + 1):
 for j in range(w):
 E[i, j] = e[i - 1, j] + E[min([i - 1, i, i + 1], key=lambda x: E[x, j - 1]), j - 1]

 i = np.argmin(E[1:h+1, w - 1]) + 1
 path = [(i - 1, w - 1)]
 for j in range(w - 1, 0, -1):
 i = min([i - 1, i, i + 1], key=lambda x: E[x, j - 1])
 path.append((i - 1, j - 1)) # j - 1 cuz padding is used
 return path[::-1]
```

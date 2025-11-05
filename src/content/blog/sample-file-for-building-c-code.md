---
categories:
- CI-CD
- Git
createdAt: '2025-08-06'
description: '```yaml'
tags:
- Git
- CI-CD
title: Sample file for building C-code
---

# Sample file for building C-code

```yaml
name: A1 Intro to Pytorch and KNN

on:
 push:
 branches: ["**"] # Trigger on push to any branch
 paths:
 - "A1/**"
 pull_request:
 branches: ["**"] # Trigger on pull requests from any branch
 paths:
 - "A1/**"

jobs:
 build-and-test:
 runs-on: ubuntu-latest
 defaults:
 run:
 working-directory: data-lab

 steps:
 - name: Checkout repository
 uses: actions/checkout@v4

 - name: Install build tools
 run: sudo apt-get update && sudo apt-get install -y build-essential

 - name: Make clean
 run: make clean || true

 - name: Build btest, ishow, and fshow
 run: make

 - name: Run dlc check (style and rules)
 run:./dlc bits.c

 - name: Run all btest checks
 run:./btest

 - name: Show success message
 if: success()
 run: echo "All tests passed ✅"
```

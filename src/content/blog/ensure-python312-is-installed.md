---
categories:
- CI-CD
- Git
createdAt: '2025-08-06'
description: '```yaml'
tags:
- Git
- CI-CD
title: Ensure python3.12 is installed
---

# Ensure python3.12 is installed

```yaml
- name: Install build tools and Python 3.12
 run: |
 sudo apt-get update
 sudo apt-get install -y build-essential software-properties-common
 sudo add-apt-repository -y ppa:deadsnakes/ppa
 sudo apt-get update
 sudo apt-get install -y python3.12 python3.12-venv python3.12-dev
```

- `build-essential`: compilers and libraries for building `C/C++` code
- `software-properties-common`: needed to add PPAs like deadsnakes.
- `ppa:deadsnakes/ppa`: provides newer Python versions for Ubuntu.
- `python3.12`, `python3.12-venv`, `python3.12-dev`: installs Python 3.12 interpreter, virtual environment module, and development headers.

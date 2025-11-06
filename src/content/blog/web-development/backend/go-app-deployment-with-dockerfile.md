---
categories:
- Backend
createdAt: '2024-08-28'
description: '```dockerfile'
tags:
- Development
- Backend
- Server
title: Go app deployment with Dockerfile
---

# Go app deployment with Dockerfile


```dockerfile
# Builder
FROM golang:latest AS builder
WORKDIR /app

# download the dependencies dependencies first so that they can be cached.
COPY go.mod go.sum./
RUN go mod download

# copy the source code and build the go app
COPY..
RUN go build -o main.

# Runner
FROM alpine:latest
WORKDIR /root
COPY --from=builder /app/main.

# download the tool needed to run the app
RUN apk update
RUN apk add libc6-compat

EXPOSE $PORT
CMD ["/root/main"]
```

> [!CAUTION]
> Remember to install `libc6-compat` other wise your container may not issue `CMD` successfully
>
> **In your `Dockerfile`:**
>
> ```docker
> RUN apk update
> RUN apk add libc6-compat
> ```


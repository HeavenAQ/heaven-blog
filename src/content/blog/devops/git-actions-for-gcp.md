---
categories:
- CI-CD
- Git
createdAt: '2025-11-04'
description: '```yaml'
tags:
- Git
- CI-CD
title: Git Actions for GCP
---

# Git Actions for GCP 

```yaml
name: Deploy backend to Cloud Run

on:
 push:
 branches:
 - main

jobs:
 deploy:
 runs-on: ubuntu-latest
 environment: backend
 permissions:
 contents: read
 id-token: write

 env:
 SERVICE_NAME: cs445-final-backend
 REGION: us-central1
 TIMEZONE: America/Chicago

 steps:
 - name: Checkout repository
 uses: actions/checkout@v4

 - name: Authorize Google Cloud SDK
 uses: google-github-actions/auth@v2
 with:
 workload_identity_provider: ${{ secrets.WIF_PROVIDER }}
 service_account: ${{ secrets.GCP_SA_EMAIL }}

 - name: Set up Google Cloud SDK
 uses: google-github-actions/setup-gcloud@v2
 with:
 project_id: ${{ secrets.GCP_PROJECT_ID }}

 - name: Build and push Docker image
 run: |
 gcloud builds submit backend/ \
 --tag gcr.io/${{ secrets.GCP_PROJECT_ID }}/${{ env.SERVICE_NAME }}

 - name: Deploy to Cloud Run
 run: |
 gcloud run deploy ${{ env.SERVICE_NAME }} \
 --image gcr.io/${{ secrets.GCP_PROJECT_ID }}/${{ env.SERVICE_NAME }} \
 --platform managed \
 --region ${{ env.REGION }} \
 --allow-unauthenticated \
 --service-account ${{ secrets.GCP_SA_EMAIL }} \
 --memory 4Gi \
 --set-env-vars TZ=${{ env.TIMEZONE }}
```

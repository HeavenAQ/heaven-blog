---
categories:
- Backend
createdAt: '2025-11-02'
description: '```bash'
tags:
- Development
- Backend
- Server
title: Service Account
---

# Service Account

## Permissions

```bash
# Cloud Run deployment
gcloud projects add-iam-policy-binding $PROJECT_ID \
 --member="serviceAccount:${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
 --role="roles/run.admin"

# Act as other service accounts (runtime)
gcloud projects add-iam-policy-binding $PROJECT_ID \
 --member="serviceAccount:${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
 --role="roles/iam.serviceAccountUser"

# Build containers
gcloud projects add-iam-policy-binding $PROJECT_ID \
 --member="serviceAccount:${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
 --role="roles/cloudbuild.builds.editor"

# Push to Artifact Registry
gcloud projects add-iam-policy-binding $PROJECT_ID \
 --member="serviceAccount:${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
 --role="roles/artifactregistry.writer"

# General read-only (viewer)
gcloud projects add-iam-policy-binding $PROJECT_ID \
 --member="serviceAccount:${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
 --role="roles/viewer"

# View logs
gcloud projects add-iam-policy-binding $PROJECT_ID \
 --member="serviceAccount:${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
 --role="roles/logging.viewer"
 
# Grant Cloud Build Editor role (includes storage.objects.create, builds.submit, etc.)
gcloud projects add-iam-policy-binding $PROJECT_ID \
 --member="serviceAccount:${SA_EMAIL}" \
 --role="roles/cloudbuild.builds.editor"

# Also grant Storage Object Admin for writing to the bucket
gcloud projects add-iam-policy-binding $PROJECT_ID \
 --member="serviceAccount:${SA_EMAIL}" \
 --role="roles/storage.objectAdmin"
```

## Workload Identity Federation

```bash
# create the identity pool
gcloud iam workload-identity-pools create git-actions-pool \
--project="$(gcloud config get-value project)" \
--location="global" \
--display-name="Git Actions Pool"

# create the provider for the github repo
gcloud iam workload-identity-pools providers create-oidc "git-actions-provider" \
 --project="$(gcloud config get-value project)" \
 --location="global" \
 --workload-identity-pool="git-actions-pool" \
 --display-name="CS445 Final GitHub Provider" \
 --issuer-uri="https://token.actions.githubusercontent.com" \
 --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.ref=assertion.ref" \
 --attribute-condition="assertion.repository=='HeavenAQ/UIUC-CS445-Final'"

# bind service account to the provider
 gcloud iam service-accounts add-iam-policy-binding \
 "cs445-final@$(gcloud config get-value project).iam.gserviceaccount.com" \
 --role="roles/iam.workloadIdentityUser" \
 --member="principalSet://iam.googleapis.com/projects/$(gcloud projects describe $(gcloud config get-value project) --format='value(projectNumber)')/locations/global/workloadIdentityPools/git-actions-pool/attribute.repository/HeavenAQ/UIUC-CS445-Final"
```

---
categories:
- CI-CD
- Git
createdAt: '2025-11-05'
description: '**OIDC (OpenID Connect)** is an authentication protocol built on top
 of OAuth 2.0. Think of it as a standardized way to prove "who you are" across dif...'
tags:
- Git
- CI-CD
title: OIDC and GCP
---

# OIDC and GCP

## What is OIDC?

**OIDC (OpenID Connect)** is an authentication protocol built on top of OAuth 2.0. Think of it as a standardized way to prove "who you are" across different services.

**Key concepts:**

- **Identity Provider (IdP)**: The service that verifies who you are (e.g., GitHub, Google, Microsoft)
- **Relying Party**: The service that trusts the IdP's verification (e.g., GCP trusting GitHub)
- **ID Token**: A cryptographically signed JWT (JSON Web Token) that contains claims about the authenticated identity

**Simple analogy:** OIDC is like a passport. GitHub (the issuing country) gives you a passport (ID token) that GCP (the foreign country) can verify and trust without needing to call GitHub directly.

## Traditional Problem (Before Workload Identity)

Previously, to let GitHub Actions access GCP, you had to:

1. Create a GCP service account
2. Generate a long-lived JSON key
3. Store that key as a GitHub secret
4. Rotate it manually for security

**Problems:**

- Long-lived credentials are security risks
- Keys can leak in logs or be stolen
- Manual rotation is error-prone
- Hard to audit who used what

## How Workload Identity Federation Works

Workload Identity Federation eliminates static keys by using **short-lived tokens** based on OIDC trust.

### The Flow:

```

 GitHub Actions 
 (Your Workflow) 

 1. Request OIDC token
 ↓

 GitHub 
 (Identity 
 Provider) 

 2. Issues signed JWT token
 Claims: repo, branch, actor, etc.
 ↓

 GitHub Actions 

 3. Send token to GCP
 ↓

 GCP Workload 
 Identity Pool 

 4. Verify token signature
 Check token claims match policy
 ↓

 GCP evaluates 
 attribute 
 conditions 

 5. Map to service account
 ↓

 GCP Service 
 Account 

 6. Generate short-lived
 GCP access token (1 hour)
 ↓

 GitHub Actions 
 can now access 
 GCP resources 

```

### Step-by-Step Explanation:

**1. GitHub Actions requests an OIDC token** When your workflow runs, GitHub automatically provides an OIDC token upon request. This token contains claims like:

```json
{
 "iss": "https://token.actions.githubusercontent.com",
 "sub": "repo:myorg/myrepo:ref:refs/heads/main",
 "aud": "https://iam.googleapis.com/projects/PROJECT_ID/locations/global/workloadIdentityPools/POOL_ID/providers/PROVIDER_ID",
 "repository": "myorg/myrepo",
 "repository_owner": "myorg",
 "ref": "refs/heads/main",
 "sha": "abc123...",
 "workflow": "Deploy to GCP",
 "actor": "username"
}
```

**2. GitHub signs the token** GitHub cryptographically signs this token with its private key. Anyone can verify it using GitHub's public keys (available at `https://token.actions.githubusercontent.com/.well-known/jwks`).

**3. GitHub Actions sends token to GCP** Your workflow sends this token to GCP's Security Token Service (STS).

**4. GCP verifies the token**

- Checks the signature using GitHub's public key
- Validates the token hasn't expired
- Verifies the issuer is GitHub
- Checks that claims match your configured attribute conditions

**5. Attribute mapping and conditions** GCP maps the token claims to attributes and evaluates conditions you've set:

```
Condition: assertion.repository == 'myorg/myrepo'
 AND assertion.ref == 'refs/heads/main'
```

**6. GCP generates a short-lived token** If everything checks out, GCP impersonates your service account and gives GitHub Actions a short-lived access token (typically 1 hour).

**7. Access GCP resources** Your workflow can now use this token to access GCP services with the permissions of that service account.

## Setting It Up

### 1. Enable Required APIs

```bash
gcloud services enable iamcredentials.googleapis.com
gcloud services enable sts.googleapis.com
```

### 2. Create Workload Identity Pool

```bash
gcloud iam workload-identity-pools create "github-pool" \
 --project="your-project-id" \
 --location="global" \
 --display-name="GitHub Actions Pool"
```

### 3. Create Workload Identity Provider

```bash
gcloud iam workload-identity-pools providers create-oidc "github-provider" \
 --project="your-project-id" \
 --location="global" \
 --workload-identity-pool="github-pool" \
 --display-name="GitHub Provider" \
 --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository" \
 --issuer-uri="https://token.actions.githubusercontent.com"
```

### 4. Grant Service Account Access

```bash
gcloud iam service-accounts add-iam-policy-binding "my-service-account@project.iam.gserviceaccount.com" \
 --project="your-project-id" \
 --role="roles/iam.workloadIdentityUser" \
 --member="principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/attribute.repository/myorg/myrepo"
```

### 5. Use in GitHub Actions

```yaml
name: Deploy to GCP

on:
 push:
 branches: [main]

permissions:
 contents: read
 id-token: write # Required for OIDC

jobs:
 deploy:
 runs-on: ubuntu-latest
 steps:
 - uses: actions/checkout@v3

 - id: auth
 uses: google-github-actions/auth@v1
 with:
 workload_identity_provider: "projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/providers/github-provider"
 service_account: "my-service-account@project.iam.gserviceaccount.com"

 - name: Use GCP
 run: |
 gcloud storage ls
 # Your GCP commands here
```

## Security Benefits

✅ **No static credentials** - Tokens expire automatically ✅ **Fine-grained control** - Restrict by repo, branch, environment ✅ **Audit trail** - See exactly which workflow accessed what ✅ **Automatic rotation** - New token for each workflow run ✅ **Reduced attack surface** - No keys to steal or leak

## Key Concepts Summary

- **OIDC**: Authentication protocol that lets services trust each other's identity verification
- **Workload Identity Federation**: GCP's way of trusting external identity providers (like GitHub)
- **ID Token**: Short-lived, signed proof of identity
- **Attribute Mapping**: How GCP translates GitHub token claims into permissions
- **Service Account Impersonation**: GCP gives your workflow temporary access as a service account

This is much more secure than storing service account keys in GitHub secrets! The tokens are short-lived and tied to specific workflows, making it much harder for attackers to abuse them.

---
categories:
- Backend
createdAt: '2024-08-07'
description: '- [Read this first](https://stackoverflow.com/questions/23555040/access-google-drive-without-oauth2)'
tags:
- Development
- Backend
- Server
title: GCP service account with google drive
---

# GCP service account with google drive


- [Read this first](https://stackoverflow.com/questions/23555040/access-google-drive-without-oauth2)
- The steps are simple. Just enable the google drive api, create the service account, and download and create the credential key in JSON format. 

> [!IMPORTANT]
> Go to Google Drive to ensure that you share the folder with your service account
> This must be done even if the folder's permission is "anyone with the link can access"

## The URL formats for Google Drive videos and their thumbnails

- **Video**: `https://drive.google.com/uc?id=" + id + "&export=download`
- **Thumbnail**: `https://lh3.googleusercontent.com/d/" + id + "=w1080?authuser=0`
---
categories:
- Backend
createdAt: '2024-05-27'
description: When I was authenticating a user, the backend returned a `200` status
 code,
tags:
- Development
- Backend
- Server
title: CORS - Errors encountered when trying to access my go backend from my react
 frontend
---

# CORS - Errors encountered when trying to access my go backend from my react frontend


## CORS Issues

### Error: No 'Access-Control-Allow-Origin' header is present on the requested resource

#### Problem

When I was authenticating a user, the backend returned a `200` status code,
but the frontend was not receiving the response. The error message was:
`No 'Access-Control-Allow-Origin' header is present on the requested resource.`

#### Solution

Need to add the `Authorization` to the allowed header list in the cors middleware.
This way the incoming request with the `Authorization` header will be allowed and read.

```go
func setupServer(store *db.Store, config utils.Config) (*Server, error) {
 // setup token maker
 tokenMaker, err:= token.NewPasetoMaker(config.TokenSyemmetricKey)
 if err!= nil {
 log.Println("cannot create token maker")
 log.Println(err)
 return nil, err
 }

 // config server
 server:= &Server{store: store, config: config, tokenMaker: tokenMaker}
 server.router = gin.Default()
 server.router.Use(cors.New(cors.Config{
 AllowOrigins: []string{"*"},
 AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
 AllowHeaders: []string{"Origin", "Content-Length", "Content-Type", "Authorization"}, // add Authorization to the allowed headers
 AllowCredentials: true,
 }))
 server.setupRouter()
 return server, nil
}
```
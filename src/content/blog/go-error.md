---
categories:
- Backend
createdAt: '2024-08-28'
description: '> [!CAUTION]'
tags:
- Development
- Backend
- Server
title: Go - Error
---

# Go - Error


> [!CAUTION]
> 2024/07/27 14:42:42 /Users/heavenchen/Desktop/projects/stj-official/backend/api/users.go:157: ERROR: invalid input value for enum language_code: "" (SQLSTATE 22P02)

### I used the following codes to do request validation and user retrieval from the authorization header

- In the `handler.go` file

```go
func VerifyJSONAndGetUser(ctx *gin.Context, req any, store *db.Store, authKey string) (*db.User, error) {
 // ensure the request body is a valid JSON
 if err:= ctx.ShouldBindJSON(&req); err!= nil {
 ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
 return nil, err
 }

 // get user
 userID:= ctx.MustGet(authKey).(*token.Payload).QueryID
 user, err:= store.GetUserByID(ctx, userID)
 if err!= nil {
 ctx.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
 return nil, err
 }
 return &user, nil
}
```

- In the `/api/users.go` file

```go
type UpdateUserRequest struct {
 Email string `json:"email" binding:"required"`
 Gender db.Gender `json:"gender"`
 Password string `json:"password"`
 FirstName string `json:"first_name"`
 LastName string `json:"last_name"`
 Language db.LanguageCode `json:"language" binding:"required"`
 Address string `json:"address"`
 LineID pgtype.Text `json:"line_id"`
 Phone pgtype.Text `json:"phone"`
 Latitude pgtype.Float8 `json:"latitude"`
 Longitude pgtype.Float8 `json:"longitude"`
 BirthYear pgtype.Int4 `json:"birth_year"`
}

func (server *Server) UpdateUser(ctx *gin.Context) {
 // get old user information
 oldUser, err:= helpers.VerifyJSONAndGetUser(ctx, req, server.store, authorizationPayloadKey)
 if err!= nil {
 server.ErrorLogger.Println(err)
 }

 // update user in database
 arg:= db.UpdateUserByIdParams{
 ID: oldUser.ID,
 Email: req.Email,
 Phone: req.Phone,
 Password: oldUser.Password,
 FirstName: req.FirstName,
 LastName: req.LastName,
 Language: req.Language,
 Address: req.Address,
 LineID: req.LineID,
 Gender: req.Gender,
 BirthYear: req.BirthYear,
 Latitude: req.Latitude,
 Longitude: req.Longitude,
 }
 user, err:= server.store.UpdateUserById(ctx, arg)
 if err!= nil {
 ctx.JSON(http.StatusConflict, apierrors.UserRegistrationError(err))
 server.ErrorLogger.Println(err)
 return
 }

 // return updated user
 ctx.JSON(http.StatusOK, server.userResponse(user))
}
```

### This did not work because:

- the data type of the parameter `req` was set to `any`. This prevents go from type-casting the `string` value of the Language field to `db.LanguageCode` type.
- The Updated code should be:

 - In the `handler.go` file

 ```go
 func AuthAndGetUser(ctx *gin.Context, req any, store *db.Store, authKey string) (*db.User, error) {
 // get user
 userID:= ctx.MustGet(authKey).(*token.Payload).QueryID
 user, err:= store.GetUserByID(ctx, userID)
 if err!= nil {
 ctx.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
 return nil, err
 }
 return &user, nil
 }
 ```

 - In the `/api/users.go` file

 ```go
 func (server *Server) UpdateUser(ctx *gin.Context) {
 // ensure the request body is a valid JSON
 var req UpdateUserRequest
 if err:= ctx.ShouldBindJSON(&req); err!= nil {
 ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
 return
 }

 // get old user information
 oldUser, err:= helpers.AuthAndGetUser(ctx, req, server.store, authorizationPayloadKey)
 if err!= nil {
 server.ErrorLogger.Println(err)
 }

 // update user in database
 arg:= db.UpdateUserByIdParams{
 ID: oldUser.ID,
 Email: req.Email,
 Phone: req.Phone,
 Password: oldUser.Password,
 FirstName: req.FirstName,
 LastName: req.LastName,
 Language: req.Language,
 Address: req.Address,
 LineID: req.LineID,
 Gender: req.Gender,
 BirthYear: req.BirthYear,
 Latitude: req.Latitude,
 Longitude: req.Longitude,
 }
 user, err:= server.store.UpdateUserById(ctx, arg)
 if err!= nil {
 ctx.JSON(http.StatusConflict, apierrors.UserRegistrationError(err))
 server.ErrorLogger.Println(err)
 return
 }

 // return updated user
 ctx.JSON(http.StatusOK, server.userResponse(user))
 }
 ```


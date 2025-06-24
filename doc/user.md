# User API Spec

## Register User

Endpoint : POST /api/users/register

Request Body :

```json
{
  "username": "diiin",
  "password": "diiin123",
  "name": "Dean Faturrahman"
}
```

Response Body (Success):

```json
{
  "status_code": 200,
  "message": "Registration successful",
  "data": {
    "username": "diiin",
    "name": "Dean Faturrahman"
  }
}
```

Response Body (Failed):

```json
{
  "status_code" : 4xx,
  "errors": "Username already registered"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "diiin",
  "password": "diiin123"
}
```

Response Body (Success):

```json
{
  "status_code": 200,
  "message": "Login successful",
  "data": {
    "username": "diiin",
    "name": "Dean Faturrahman",
    "token": "session_id_generated"
  }
}
```

Response Body (Failed):

```json
{
  "status_code" : 4xx,
  "errors": "Username or password is wrong"
}
```

## Get User

Endpoint : GET /api/users

Headers :

- Authorization: token

Response Body (Success):

```json
{
  "status_code": 200,
  "message": "Successfully get user",
  "data": {
    "username": "diiin",
    "name": "Dean Faturrahman"
  }
}
```

Response Body (Failed):

```json
{ "status_code" : 4xx,
  "errors": "Unauthorized"
}
```

## Update User

Endpoint : PATCH /api/users

Headers :

- Authorization: token

Request Body :

```json
{
  "password": "diiin123", // optional
  "name": "Dean Faturrahman" // optional
}
```

Response Body (Success):

```json
{
  "status_code": 200,
  "message": "Update successful",
  "data": {
    "username": "diiin",
    "name": "Dean Faturrahman"
  }
}
```

Response Body (Failed):

```json
{
  "status_code" : 4xx,
  "errors": "Cannot update same value"
}
```

## Logout User

Endpoint : DELETE /api/users

Headers :

- Authorization: token

Response Body (Success):

```json
{
  "status_code": 200,
  "message": "Logout successful",
  "data": true
}
```

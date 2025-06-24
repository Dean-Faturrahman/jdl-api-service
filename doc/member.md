# Member API Spec

## Create Member

Endpoint : POST /api/members

Request Body :

```json
{
    "name": "Amanda Sukma",
    "call_name": "Amanda",
    "birth_date": "17 Desember 2004",
    "blood_type": "O",
    "horoscope": "Sagitarius",
    "height": "160cm",
    "twitter": "@PS_AmandaJKT48", // optional
    "instagram": "@jkt48.amanda.s", // optional
    "tiktok": "@jkt48.amanda.s", // optional
    "profile_image": "https://jkt48.com/profile/amanda_sukma.jpg?v=20230530"
},
```

Response Body (Success):

```json
{
  "status_code": 200,
  "message": "Member successfully added",
  "data": {
    "name": "Amanda Sukma",
    "call_name": "Amanda",
    "birth_date": "17 Desember 2004",
    "blood_type": "O",
    "horoscope": "Sagitarius",
    "height": "160cm",
    "twitter": "@PS_AmandaJKT48",
    "instagram": "@jkt48.amanda.s",
    "tiktok": "@jkt48.amanda.s",
    "profile_image": "https://jkt48.com/profile/amanda_sukma.jpg?v=20230530"
  }
}
```

Response Body (Failed):

```json
{
  "status_code" : 4xx,
  "errors": "Call name already exist"
}
```

## Get All Member

Endpoint : GET /api/members

Headers :

- Authorization: token

Response Body (Success):

```json
{
  "status_code": 200,
  "message": "Successfully get all members",
  "data": [
    {
      "name": "Amanda Sukma",
      "call_name": "Amanda",
      "birth_date": "17 Desember 2004",
      "blood_type": "O",
      "horoscope": "Sagitarius",
      "height": "160cm",
      "twitter": "@PS_AmandaJKT48",
      "instagram": "@jkt48.amanda.s",
      "tiktok": "@jkt48.amanda.s",
      "profile_image": "https://jkt48.com/profile/amanda_sukma.jpg?v=20230530"
    },
    {
      "name": "Angelina Christy",
      "callName": "Christy",
      "birthDate": "5 Desember 2005",
      "bloodType": "O",
      "horoscope": "Sagitarius",
      "height": "163cm",
      "twitter": "@A_ChristyJKT48",
      "instagram": "@jkt48.christy",
      "tiktok": "@christyjkt48",
      "profileImage": "https://jkt48.com/profile/angelina_christy.jpg?v=20230116"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```

## Get Member By Id

Endpoint : GET /api/member/:contactId

Headers :

- Authorization: token

Response Body (Success):

```json
{
  "status_code": 200,
  "message": "Successfully get member",
  "data": [
    {
      "name": "Amanda Sukma",
      "call_name": "Amanda",
      "birth_date": "17 Desember 2004",
      "blood_type": "O",
      "horoscope": "Sagitarius",
      "height": "160cm",
      "twitter": "@PS_AmandaJKT48",
      "instagram": "@jkt48.amanda.s",
      "tiktok": "@jkt48.amanda.s",
      "profile_image": "https://jkt48.com/profile/amanda_sukma.jpg?v=20230530"
    }
  ]
}
```

## Search Member

Endpoint : GET /api/member

Headers :

- Authorization: token

Query Params :

- name: string

Response Body (Success):

```json
{
  "status_code": 200,
  "message": "Successfully get member",
  "data": [
    {
      "name": "Amanda Sukma",
      "call_name": "Amanda",
      "birth_date": "17 Desember 2004",
      "blood_type": "O",
      "horoscope": "Sagitarius",
      "height": "160cm",
      "twitter": "@PS_AmandaJKT48",
      "instagram": "@jkt48.amanda.s",
      "tiktok": "@jkt48.amanda.s",
      "profile_image": "https://jkt48.com/profile/amanda_sukma.jpg?v=20230530"
    }
  ]
}
```

## Update Member

Endpoint : PATCH /api/members

Headers :

- Authorization: token

Request Body :

```json
{
    "name": "Amanda Sukma", // optional
    "call_name": "Amanda", // optional
    "birth_date": "17 Desember 2004", // optional
    "blood_type": "O", // optional
    "horoscope": "Sagitarius", // optional
    "height": "160cm", // optional
    "twitter": "@PS_AmandaJKT48", // optional
    "instagram": "@jkt48.amanda.s", // optional
    "tiktok": "@jkt48.amanda.s", // optional
    "profile_image": "https://jkt48.com/profile/amanda_sukma.jpg?v=20230530" // optional
},
```

Response Body (Success):

```json
{
  "status_code": 200,
  "message": "Member successfully updated",
  "data": {
    "name": "Amanda Sukma",
    "call_name": "Amanda",
    "birth_date": "17 Desember 2004",
    "blood_type": "O",
    "horoscope": "Sagitarius",
    "height": "160cm",
    "twitter": "@PS_AmandaJKT48",
    "instagram": "@jkt48.amanda.s",
    "tiktok": "@jkt48.amanda.s",
    "profile_image": "https://jkt48.com/profile/amanda_sukma.jpg?v=20230530"
  }
}
```

Response Body (Failed):

```json
{
  "status_code": 4xx,
  "errors": "Call name already exist"
}
```

## Remove Member

Endpoint : DELETE /api/members

Headers :

- Authorization: token

Response Body (Success):

```json
{
  "status_code": 200,
  "data": true
}
```

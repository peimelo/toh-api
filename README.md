# API Server

To install and start the API server, run the following commands in this directory:

- `npm install`
- `node server`

Open `http://localhost:3000`

## Using The Server

### Include An Authorization Header

`POST /sessions`: returns a `token` in the body and also in the header. You can use this `token` in the following endpoints.

All requests, except `POST /sessions`, should use an **Authorization header** to work with your own data:

```js
fetch(url, {
  headers: { Authorization: 'whatever-you-want' },
});
```

### API Endpoint

The following endpoints are available:

| Endpoints               | Usage                                 | Params                                           |
| ----------------------- | ------------------------------------- | ------------------------------------------------ |
| `POST /sessions`        | Authenticates the user.               | **email** - [String] <br> **password** - String] |
| `GET /heroes`           | Get all of the heroes.                |                                                  |
| `GET /heroes?name=term` | Get all heroes with name like a term. | **term** - [String]                              |
| `GET /heroes/:id`       | Get the details of a single hero.     |                                                  |
| `POST /heroes`          | Add a new hero.                       | **name** - [String]                              |
| `PUT /heroes/:id`       | Edit the details of an existing hero. | **name** - [String]                              |
| `DELETE /heroes/:id`    | Remove the hero.                      |                                                  |

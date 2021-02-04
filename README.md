# API Server

To install and start the API server, run the following commands in this directory:

- `npm install`
- `node server`

Open `http://localhost:3000`

## Using The Server

### Include An Authorization Header

`POST /api/sessions`: returns a `token` in the body and also in the header. You can use this `token` in the following endpoints.

All requests, except `POST /api/sessions`, should use an **Authorization header** to work with your own data:

```js
fetch(url, {
  headers: { Authorization: 'whatever-you-want' },
});
```

### API Endpoint

The following endpoints are available:

| Endpoints                   | Usage                                 | Params                                           |
| --------------------------- | ------------------------------------- | ------------------------------------------------ |
| `POST /api/sessions`        | Authenticates the user.               | **email** - [String] <br> **password** - String] |
| `GET /api/heroes`           | Get all of the heroes.                |                                                  |
| `GET /api/heroes?term=name` | Get all heroes with name like a term. | **name** - [String]                              |
| `GET /api/heroes/:id`       | Get the details of a single hero.     |                                                  |
| `POST /api/heroes`          | Add a new hero.                       | **name** - [String]                              |
| `PUT /api/heroes/:id`       | Edit the details of an existing hero. | **name** - [String]                              |
| `DELETE /api/heroes/:id`    | Remove the hero.                      |                                                  |

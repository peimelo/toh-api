# API Server

To install and start the API server, run the following commands in this directory:

- `npm install`
- `node server`

Open `http://localhost:3000`

## Using The Server

### Include An Authorization Header

All requests should use an **Authorization header** to work with your own data:

```js
fetch(url, {
  headers: { Authorization: 'whatever-you-want' },
});
```

### API Endpoint

The following endpoints are available:

| Endpoints            | Usage                                 | Params              |
| -------------------- | ------------------------------------- | ------------------- |
| `GET /heroes`        | Get all of the heroes.                |                     |
| `POST /heroes`       | Add a new hero.                       | **name** - [String] |
| `GET /heroes/:id`    | Get the details of a single hero.     |                     |
| `PUT /heroes/:id`    | Edit the details of an existing hero. | **name** - [String] |
| `DELETE /heroes/:id` | Remove the hero.                      |                     |

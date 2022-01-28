const clone = require('clone');

let db = {};

const defaultData = {
  11: { id: 11, name: 'Homem-Aranha' },
  12: { id: 12, name: 'Wolverine' },
  13: { id: 13, name: 'Mulher-Maravilha' },
  14: { id: 14, name: 'Viúva Negra' },
  15: { id: 15, name: 'Hulk' },
  16: { id: 16, name: 'Pantera Negra' },
  17: { id: 17, name: 'Homem de Ferro' },
  18: { id: 18, name: 'Capitão América' },
  19: { id: 19, name: 'Capitã Marvel' },
  20: { id: 20, name: 'Thor' },
};

function getData(token) {
  let data = db[token];
  if (data == null) {
    data = db[token] = clone(defaultData);
  }
  return data;
}

function getAll(token, name) {
  return new Promise((resolve) => {
    const heroes = getData(token);
    const heroesArray = Object.values(heroes);

    const nameFilter = name && name.trim().toLowerCase();
    const results = nameFilter
      ? heroesArray.filter((hero) =>
          hero.name.toLowerCase().includes(nameFilter)
        )
      : heroesArray;

    resolve(results);
  });
}

function get(token, id) {
  return new Promise((resolve, reject) => {
    const heroes = getData(token);

    if (heroes[id]) {
      resolve(heroes[id]);
    } else {
      reject(raiseNotFoundError());
    }
  });
}

function add(token, hero) {
  return new Promise((resolve, reject) => {
    const error = raiseParamError(hero);
    if (error) {
      return reject(error);
    }

    const { name } = hero;

    let heroes = getData(token);

    const id = generateNextId(heroes);
    heroes[id] = {
      id,
      name,
    };

    resolve(heroes[id]);
  });
}

function edit(token, id, hero) {
  return new Promise((resolve, reject) => {
    const error = raiseParamError(hero);
    if (error) {
      return reject(error);
    }

    const { name } = hero;

    let heroes = getData(token);

    if (heroes[id]) {
      heroes[id]['name'] = name;
      resolve(heroes[id]);
    } else {
      reject(raiseNotFoundError());
    }
  });
}

function remove(token, id) {
  return new Promise((resolve, reject) => {
    let heroes = getData(token);

    if (heroes[id]) {
      delete heroes[id];
      resolve();
    } else {
      reject(raiseNotFoundError());
    }
  });
}

function generateNextId(list) {
  const ids = Object.keys(list).map((id) => +id);
  return ids && ids.length > 0 ? Math.max(...ids) + 1 : 1;
}

function raiseParamError(hero) {
  if (hero['name'] === undefined || hero['name'] === '') {
    return new Error("Name can't be blank");
  }
}

function raiseNotFoundError() {
  return new Error('Record not found');
}

module.exports = {
  getAll,
  get,
  add,
  edit,
  remove,
};

const clone = require('clone');

let db = {};

const defaultData = {
  '11': { id: 11, name: 'Dr Nice' },
  '12': { id: 12, name: 'Narco' },
  '13': { id: 13, name: 'Bombasto' },
  '14': { id: 14, name: 'Celeritas' },
  '15': { id: 15, name: 'Magneta' },
  '16': { id: 16, name: 'RubberMan' },
  '17': { id: 17, name: 'Dynama' },
  '18': { id: 18, name: 'Dr IQ' },
  '19': { id: 19, name: 'Magma' },
  '20': { id: 20, name: 'Tornado' },
};

function getData(token) {
  let data = db[token];
  if (data == null) {
    data = db[token] = clone(defaultData);
  }
  return data;
}

function getAll(token, name) {
  return new Promise((res) => {
    const heroes = getData(token);
    console.log(heroes);
    const heroesArray = Object.values(heroes);
    console.log(heroesArray);

    const nameFilter = name && name.trim().toLowerCase();
    const results = nameFilter
      ? heroesArray.filter((hero) =>
          hero.name.toLowerCase().includes(nameFilter)
        )
      : heroesArray;

    res(results);
  });
}

function get(token, id) {
  return new Promise((res) => {
    const heroes = getData(token);
    res(heroes[id]);
  });
}

function add(token, hero) {
  return new Promise((res) => {
    let heroes = getData(token);

    const ids = Object.keys(heroes).map((id) => +id);
    const nextId = ids && ids.length > 0 ? Math.max(...ids) + 1 : 1;

    heroes[nextId] = {
      id: nextId,
      name: hero.name,
    };

    res(heroes[nextId]);
  });
}

function edit(token, id, hero) {
  return new Promise((res) => {
    let heroes = getData(token);
    for (prop in hero) {
      heroes[id][prop] = hero[prop];
    }
    res(heroes[id]);
  });
}

function remove(token, id) {
  return new Promise((res) => {
    let heroes = getData(token);
    delete heroes[id];
    res();
  });
}

module.exports = {
  getAll,
  get,
  add,
  edit,
  remove,
};

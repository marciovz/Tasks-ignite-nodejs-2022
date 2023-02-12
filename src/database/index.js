import fs from 'node:fs/promises';

const databasePath = new URL('db.json', import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
    })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  #existTable(table) {
    return Array.isArray(this.#database[table]);
  }

  select(table, search) {
    if (!this.#existTable(table)) return;

    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].includes(value);
        })
      })
    }

    return data;
  }

  selectById(table, id) {
    if (!this.#existTable(table)) return;

    let data = this.#database[table] ?? [];

    if (id) {
      data = data.find(row => row.id === id);
    }

    return data;
  }

  insert(table, data) {
    if (this.#existTable(table)) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data];
    }

    this.#persist();
    return data;
  }

  update(table, id, data) {
    if (!this.#existTable(table)) return;

    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    if (rowIndex < 0) return;

    this.#database[table][rowIndex] = { id, ...data };
    this.#persist();
    return this.#database[table][rowIndex];
  }

  delete(table, id) {
    if (!this.#existTable(table)) return;

    const rowIndex = this.#database[table].findIndex(row => row.id === id);
    if (rowIndex < 0) return;

    this.#database[table].splice(rowIndex, 1);
    this.#persist();
    return id;
  }

}

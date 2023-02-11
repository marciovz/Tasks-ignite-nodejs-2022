import http from 'node:http';
import { randomUUID } from 'node:crypto'

import { Database } from './database/index.js';

const database = new Database();

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/tasks') {
    const tasks = database.select('tasks');
    return res.end(JSON.stringify(tasks));
  }  


  if (method === 'POST' && url === '/tasks') {

    const task = database.insert('tasks', {
      id: randomUUID(),
      title: 'módulo 1 de nodejs',
      descrition: 'Terminar o módulo 1 de nodejs',
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return res.end(JSON.stringify(task));
  }  

  res.writeHead(404).end('Route not found!');
});

server.listen(3333, () => {
  console.log('Running at port 3333');
});

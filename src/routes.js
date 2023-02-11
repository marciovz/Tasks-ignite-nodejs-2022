import { randomUUID } from 'node:crypto';

import { Database } from './database/index.js';
import { buildRoutePath } from './utils/buildRoutePath.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const tasks = database.select('tasks');
      return res.end(JSON.stringify(tasks));
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      console.log(req.body);
      if (!req.body) return res.writeHead(400).end();
      
      const { title, description } = req.body;

      if (!title  || title === '') return res.writeHead(400).end();
      if (!description || description === '') return res.writeHead(400).end();

      const task = database.insert('tasks', {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      });
  
      return res.end(JSON.stringify(task));
    }
  }
]
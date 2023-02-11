import { randomUUID } from 'node:crypto';
import { Database } from './database/index.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      const tasks = database.select('tasks');
      return res.end(JSON.stringify(tasks));
    }
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
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
  }
]
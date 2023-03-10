import { randomUUID } from 'node:crypto';

import { Database } from '../database/index.js';

const database = new Database();

export const TasksController = {

  getTasks: (req, res) => {
    const { search } = req.query;

    const searchOptions = search ? { title: search, description: search } : null

    const tasksFound = database.select('tasks', searchOptions) || [];

    return res.end(JSON.stringify(tasksFound));
  },

  getTaskById: (req, res) => {
    const { id } = req.params;

    const taskFound = database.selectById('tasks', id) || [];

    return res.end(JSON.stringify(taskFound));
  },

  createTask: (req, res) => {
    if (!req.body) return res.writeHead(400).end();
    
    const { title, description } = req.body;

    if (!title  || title === '') return res.writeHead(400).end();
    if (!description || description === '') return res.writeHead(400).end();

    const newTask = {
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    }

    const createdTask = database.insert('tasks', newTask);

    return res.end(JSON.stringify(createdTask));
  },

  editTask: (req, res) => {
    const { id } = req.params;
    
    if (!req.body) return res.writeHead(400).end('params not found!');
    const { title, description } = req.body;
    if( title === '') return res.writeHead(400).end(JSON.stringify('title cannot be empty!'));
    
    const taskFound = database.selectById('tasks', id);
    if (taskFound.length <= 0) return res.writeHead(400).end('task not found!');
    
    const newTask = {
      title: title ?? taskFound.title,
      description: description ?? taskFound.description,
      completed_at: taskFound.completed_at,
      updated_at: new Date(),
      created_at: taskFound.created_at
    }

    const modifiedTask = database.update('tasks', id, newTask);

    return res.end(JSON.stringify(modifiedTask));
  },

  modifyCompletedTask: (req, res) => {
    const { id } = req.params;

    const taskFound = database.selectById('tasks', id);
    if (taskFound.length <= 0) return res.writeHead(400).end('task not found!');

    const newTask = {
      ...taskFound,  
      completed_at: taskFound.completed_at ? null : new Date(),
      updated_at: new Date(),
    }

    const modifiedTask = database.update('tasks', id, newTask);

    return res.end(JSON.stringify(modifiedTask));
  },

  removeTask: (req, res) => {
    const { id } = req.params;

    const taskFound = database.selectById('tasks', id);
    if (!taskFound) return res.writeHead(400).end(JSON.stringify('task not found!'));
    
    const idDeleted = database.delete('tasks', id);
    return res.end(JSON.stringify(idDeleted));
  }

}
import { buildRoutePath } from './buildRoutePath.js';

export const routes = [];

export const router = {

  get: (param, handler) => {
    routes.push({
      method: 'GET',
      path: buildRoutePath(param),
      handler
    })
  },

  post: (param, handler) => {
    routes.push({
      method: 'POST',
      path: buildRoutePath(param),
      handler
    })
  },

  put: (param, handler) => {
    routes.push({
      method: 'PUT',
      path: buildRoutePath(param),
      handler
    })
  },

  patch: (param, handler) => {
    routes.push({
      method: 'PATCH',
      path: buildRoutePath(param),
      handler
    })
  },

  delete: (param, handler) => {
    routes.push({
      method: 'DELETE',
      path: buildRoutePath(param),
      handler
    })
  }

}

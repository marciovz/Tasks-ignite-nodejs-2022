import { router, routes } from './utils/router.js';
import { TasksController } from './controllers/TasksController.js';

router.get('/tasks', TasksController.getTasks);
router.get('/tasks/:id', TasksController.getTaskById);
router.post('/tasks', TasksController.createTask);
router.put('/tasks/:id', TasksController.editTask);
router.patch('/tasks/:id', TasksController.modifyCompletedTask);
router.delete('/tasks/:id', TasksController.removeTask);

export { routes };


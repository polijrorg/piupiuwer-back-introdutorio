import { application, Router } from 'express';
import piusRouter from './piu.routes';
import usersRouter from './user.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/pius', piusRouter);

export default routes;

import { parseISO } from 'date-fns';
import { NextFunction, Request, Response, Router } from 'express';
import { isUuid } from 'uuidv4';

import UserRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/UserServices/CreateUserService';
import DeleteUserService from '../services/UserServices/DeleteUserService';
import GetUserService from '../services/UserServices/GetUserService';
import UpdateUserService from '../services/UserServices/UpdateUserService';

const usersRouter = Router();
export const usersRepository = new UserRepository();

const validateData = (request: any, response: any, next: any) => {
    const { name, birth_date, cpf, phone } = request.body;

    if (!name || !birth_date || !cpf || !phone)
        return response.status(400).json({ error: 'Parâmetros inválidos.' });

    return next();
};

const validateId = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const { id } = request.params;

    if (!isUuid(id))
        return response.status(400).json({ error: 'ID inválido.' });

    return next();
};

usersRouter.get('/', (_request, response) => {
    const users = usersRepository.all();

    return response.json(users);
});

usersRouter.get('/:id', validateId, (request, response) => {
    try {
        const { id } = request.params;

        const getUser = new GetUserService(usersRepository);

        const user = getUser.execute({ id });

        return response.json(user);
    } catch (e: any) {
        return response.status(400).json({ error: e.message });
    }
});

usersRouter.post('/', validateData, (request, response) => {
    try {
        const data = request.body;

        const createUser = new CreateUserService(usersRepository);

        const user = createUser.execute({
            ...data,
            birth_date: parseISO(data.birth_date),
        });

        return response.json(user);
    } catch (e: any) {
        return response.status(400).json({ error: e.message });
    }
});

usersRouter.put('/:id', validateId, validateData, (request, response) => {
    try {
        const data = request.body;
        const { id } = request.params;

        const updateUser = new UpdateUserService(usersRepository);

        const user = updateUser.execute({
            id,
            data: {
                ...data,
                birth_date: parseISO(data.birth_date),
            },
        });

        return response.json(user);
    } catch (e: any) {
        return response.status(400).json({ error: e.message });
    }
});

usersRouter.delete('/:id', validateId, (request, response) => {
    try {
        const { id } = request.params;

        const deleteUser = new DeleteUserService(usersRepository);

        deleteUser.execute({ id });

        return response.status(204).send();
    } catch (e: any) {
        return response.status(400).json({ error: e.message });
    }
});

export default usersRouter;

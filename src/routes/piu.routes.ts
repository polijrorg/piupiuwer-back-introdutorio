import { NextFunction, Request, Response, Router } from 'express';
import { isUuid } from 'uuidv4';
import PiuRepository from '../repositories/PiusRepository';
import CreatePiuService from '../services/PiuServices/CreatePiuService';
import DeletePiuService from '../services/PiuServices/DeletePiuService';
import GetPiuService from '../services/PiuServices/GetPiuService';
import UpdatePiuService from '../services/PiuServices/UpdatePiuService';
import { usersRepository } from './user.routes';

const piusRouter = Router();
export const piusRepository = new PiuRepository();

const validateData = (request: any, response: any, next: any) => {
    const { user_id, text } = request.body;

    if (!user_id || !text)
        return response.status(400).json({ error: 'Parâmetros inválidos.' });

    return next();
};

const validateText = (request: any, response: any, next: any) => {
    const { text } = request.body;

    if (!text)
        return response.status(400).json({ error: 'Parâmetros inválidos.' });

    return next();
}

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

piusRouter.get('/', (_request, response) => {
    const users = piusRepository.all();

    return response.json(users);
});

piusRouter.get('/:id', validateId, (request, response) => {
    try {
        const { id } = request.params;

        const getPiu = new GetPiuService(piusRepository);

        const piu = getPiu.execute({ id });

        return response.json(piu);
    } catch (e: any) {
        return response.status(400).json({ error: e.message });
    }
});

piusRouter.post('/', validateData, (request, response) => {
    try {
        const { user_id, text } = request.body;

        const createPiu = new CreatePiuService({
            piusRepository,
            usersRepository,
        });

        const piu = createPiu.execute({ user_id, text });

        return response.json(piu);
    } catch (e: any) {
        return response.status(400).json({ error: e.message });
    }
});

piusRouter.put('/:id', validateId, validateText, (request, response) => {
    try {
        const { text } = request.body;
        const { id } = request.params;

        const updateUser = new UpdatePiuService(piusRepository);

        const user = updateUser.execute({
            id,
            data: { text },
        });

        return response.json(user);
    } catch (e: any) {
        return response.status(400).json({ error: e.message });
    }
});

piusRouter.delete('/:id', validateId, (request, response) => {
    try {
        const { id } = request.params;

        const deletePiu = new DeletePiuService(piusRepository);

        deletePiu.execute({ id });

        return response.status(204).send();
    } catch (e: any) {
        return response.status(400).json({ error: e.message });
    }
});

export default piusRouter;

import Piu from '../../models/Pius';
import PiuRepository from '../../repositories/PiusRepository';
import UserRepository from '../../repositories/UsersRepository';

interface CreatePiuServiceRepositories {
    piusRepository: PiuRepository;
    usersRepository: UserRepository;
}

interface Request {
    user_id: string;
    text: string;
}

class CreatePiuService {
    private piusRepository: PiuRepository;
    private usersRepository: UserRepository;

    constructor({
        piusRepository,
        usersRepository,
    }: CreatePiuServiceRepositories) {
        this.piusRepository = piusRepository;
        this.usersRepository = usersRepository;
    }

    public execute(data: Request): Piu {
        const piuChars = data.text.length;

        if (piuChars === 0) throw Error('Não é possível enviar pius vazios.');

        if (piuChars > 140)
            throw Error(
                'Não é possível enviar pius com mais de 140 caracteres.'
            );

        const userIndex = this.usersRepository.findIndexById(data.user_id);
        
        if (userIndex < 0)
            throw Error('Nenhum usuário com esse id foi encontrado.');

        const piu = this.piusRepository.create(data);

        return piu;
    }
}

export default CreatePiuService;

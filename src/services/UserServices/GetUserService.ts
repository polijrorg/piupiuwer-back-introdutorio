import User from '../../models/Users';
import UserRepository from '../../repositories/UsersRepository';

interface Request {
    id: string;
}

class GetUserService {
    private usersRepository: UserRepository;

    constructor(usersRepository: UserRepository) {
        this.usersRepository = usersRepository;
    }

    public execute({ id }: Request): User {
        const userIndex = this.usersRepository.findIndexById(id);

        if (userIndex < 0)
            throw Error('Nenhum usuário com esse id foi encontrado.');
            
        return this.usersRepository.get({ index: userIndex });
    }
}

export default GetUserService;

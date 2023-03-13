import UserRepository from '../../repositories/UsersRepository';

interface Request {
    id: string;
}

class DeleteUserService {
    private usersRepository: UserRepository;

    constructor(usersRepository: UserRepository) {
        this.usersRepository = usersRepository;
    }

    public execute({ id }: Request) {
        const userIndex = this.usersRepository.findIndexById(id);

        if (userIndex < 0)
            throw Error('Nenhum usuário com esse id foi encontrado.');

        this.usersRepository.delete({ index: userIndex });
    }
}

export default DeleteUserService;

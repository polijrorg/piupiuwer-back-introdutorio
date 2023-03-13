import User from '../../models/Users';
import UserRepository from '../../repositories/UsersRepository';

interface Request {
    id: string;
    data: {
        name: string;
        birth_date: Date;
        cpf: string;
        phone: string;
    };
}

class UpdateUserService {
    private usersRepository: UserRepository;

    constructor(usersRepository: UserRepository) {
        this.usersRepository = usersRepository;
    }

    public execute({ id, data }: Request): User {
        const userIndex = this.usersRepository.findIndexById(id);

        if (userIndex < 0)
            throw Error('Nenhum usuário com esse id foi encontrado.');

        const userWithCpfIndex = this.usersRepository.findIndexByCpf(data.cpf)

        if (userWithCpfIndex >=0 && userWithCpfIndex !== userIndex)
            throw Error('Um usuário com esse CPF já foi cadastrado.');

        const user = this.usersRepository.update({
            index: userIndex,
            data,
        });
        return user;
    }
}

export default UpdateUserService;

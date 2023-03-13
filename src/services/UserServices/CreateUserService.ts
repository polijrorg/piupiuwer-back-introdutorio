import User from '../../models/Users';
import UserRepository from '../../repositories/UsersRepository';

interface Request {
    name: string;
    birth_date: Date;
    cpf: string;
    phone: string;
    created_at: Date;
    updated_at: Date;
}

class CreateUserService {
    private usersRepository: UserRepository;

    constructor(usersRepository: UserRepository) {
        this.usersRepository = usersRepository;
    }

    public execute(data: Request): User {
        if (this.usersRepository.findIndexByCpf(data.cpf) >= 0)
            throw Error('Um usuário com esse CPF já foi cadastrado.');

        const user = this.usersRepository.create(data);
        
        return user;
    }
}

export default CreateUserService;

import User from '../models/Users';
import usersRouter from '../routes/user.routes';

interface GetUserDTO {
    index: number;
}

interface CreateUserDTO {
    name: string;
    birth_date: Date;
    cpf: string;
    phone: string;
}

interface UpdateUserDTO {
    index: number;
    data: CreateUserDTO;
}

interface DeleteUserDTO {
    index: number;
}

class UserRepository {
    private users: User[];

    constructor() {
        this.users = [];
    }

    public all(): User[] {
        return this.users;
    }

    public get({ index }: GetUserDTO): User {
        return this.users[index];
    }

    public create(data: CreateUserDTO): User {
        const user = new User(data);

        this.users.push(user);

        return user;
    }

    public update({ index, data }: UpdateUserDTO): User {
        return (this.users[index] = {
            ...this.users[index],
            ...data,
            updated_at: new Date(),
        });
    }

    public delete({ index }: DeleteUserDTO) {
        this.users.splice(index, 1);
    }

    public findIndexById(id: String): number {
        return this.users.findIndex((user: User) => user.id === id);
    }

    public findIndexByCpf(cpf: String): number {
        return this.users.findIndex((user: User) => user.cpf === cpf);
    }
}

export default UserRepository;

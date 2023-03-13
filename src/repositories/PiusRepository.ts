import Piu from '../models/Pius';

interface GetPiuDTO {
    index: number;
}

interface CreatePiuDTO {
    user_id: string;
    text: string;
}

interface UpdatePiuDTO {
    index: number;
    data: {
        text: string;
    };
}

interface DeletePiuDTO {
    index: number;
}

class PiuRepository {
    private pius: Piu[];

    constructor() {
        this.pius = [];
    }

    public all(): Piu[] {
        return this.pius;
    }

    public get({ index }: GetPiuDTO): Piu {
        return this.pius[index];
    }

    public create(data: CreatePiuDTO): Piu {
        const piu = new Piu(data);

        this.pius.push(piu);

        return piu;
    }

    public update({ index, data }: UpdatePiuDTO): Piu {
        return (this.pius[index] = {
            ...this.pius[index],
            ...data,
            updated_at: new Date(),
        });
    }

    public delete({ index }: DeletePiuDTO) {
        this.pius.splice(index, 1);
    }

    public findIndexById(id: String): number {
        return this.pius.findIndex((piu: Piu) => piu.id === id);
    }
}

export default PiuRepository;

import PiuRepository from '../../repositories/PiusRepository';

interface Request {
    id: string;
}

class DeletePiuService {
    private piusRepository: PiuRepository;

    constructor(piusRepository: PiuRepository) {
        this.piusRepository = piusRepository;
    }

    public execute({ id }: Request) {
        const piuIndex = this.piusRepository.findIndexById(id);

        if (piuIndex < 0)
            throw Error('Nenhum piu com esse id foi encontrado.');
            
        this.piusRepository.delete({ index: piuIndex });
    }
}

export default DeletePiuService;
